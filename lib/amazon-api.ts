import crypto from 'crypto'

// Amazon PA-API request parameters
interface AmazonRequestParams {
  Keywords?: string
  Author?: string
  Resources?: string[]
  SearchIndex?: string
  Marketplace?: string
  PartnerTag: string
  ItemIds?: string[]
  Operation?: string
}

// Format the date for request headers
function getFormattedDate() {
  const date = new Date()
  return date.toISOString().replace(/[:-]|\.\d{3}/g, '')
}

// Create canonical request for signing
function createCanonicalRequest(
  method: string,
  uri: string,
  query: string,
  headers: Record<string, string>,
  payload: string
) {
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((key) => `${key.toLowerCase()}:${headers[key]}`)
    .join('\n')

  const signedHeaders = Object.keys(headers)
    .sort()
    .map((key) => key.toLowerCase())
    .join(';')

  return [
    method,
    uri,
    query,
    canonicalHeaders + '\n',
    signedHeaders,
    crypto.createHash('sha256').update(payload).digest('hex'),
  ].join('\n')
}

// Generate signature for AWS request
function getSignature(
  stringToSign: string,
  secretKey: string,
  date: string,
  region: string,
  service: string
) {
  const kDate = crypto
    .createHmac('sha256', 'AWS4' + secretKey)
    .update(date)
    .digest()
  const kRegion = crypto.createHmac('sha256', kDate).update(region).digest()
  const kService = crypto.createHmac('sha256', kRegion).update(service).digest()
  const kSigning = crypto.createHmac('sha256', kService).update('aws4_request').digest()
  return crypto.createHmac('sha256', kSigning).update(stringToSign).digest('hex')
}

// Main function to fetch books from Amazon PA-API
export async function fetchBooksFromAmazon(params: AmazonRequestParams) {
  const accessKey = process.env.AWS_ACCESS_KEY
  const secretKey = process.env.AWS_SECRET_KEY
  const associateTag = process.env.AWS_ASSOCIATE_TAG

  if (!accessKey || !secretKey || !associateTag) {
    throw new Error('Amazon API credentials missing')
  }

  // Set up request parameters
  const region = 'us-east-1'
  const service = 'ProductAdvertisingAPI'
  const host = 'webservices.amazon.com'
  const uriPath = '/paapi5/searchitems'
  const method = 'POST'

  // Create timestamp and datestamp for signing
  const amzDate = getFormattedDate()
  const dateStamp = amzDate.substring(0, 8)

  // Create request payload
  const requestParams = {
    ...params,
    PartnerTag: associateTag,
    PartnerType: 'Associates',
    Marketplace: params.Marketplace || 'www.amazon.com',
  }

  const payload = JSON.stringify(requestParams)

  // Create headers
  const headers: Record<string, string> = {
    'content-encoding': 'amz-1.0',
    'content-type': 'application/json; charset=utf-8',
    host: host,
    'x-amz-date': amzDate,
    'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
  }

  // Create canonical request
  const canonicalRequest = createCanonicalRequest(method, uriPath, '', headers, payload)
  const canonicalRequestHash = crypto.createHash('sha256').update(canonicalRequest).digest('hex')

  // Create string to sign
  const algorithm = 'AWS4-HMAC-SHA256'
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${canonicalRequestHash}`

  // Calculate signature
  const signature = getSignature(stringToSign, secretKey, dateStamp, region, service)

  // Add authorization header
  const authorizationHeader = `${algorithm} Credential=${accessKey}/${credentialScope}, SignedHeaders=${Object.keys(
    headers
  )
    .sort()
    .join(';')
    .toLowerCase()}, Signature=${signature}`
  headers['Authorization'] = authorizationHeader

  try {
    const response = await fetch(`https://${host}${uriPath}`, {
      method,
      headers,
      body: payload,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Amazon API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error calling Amazon API:', error)
    throw error
  }
}

// Helper function to search for books by author
export async function getBooksByAuthor(authorId: string) {
  const params: AmazonRequestParams = {
    Author: authorId,
    SearchIndex: 'Books',
    Resources: [
      'ItemInfo.Title',
      'ItemInfo.ByLineInfo',
      'ItemInfo.ContentInfo',
      'ItemInfo.ProductInfo',
      'ItemInfo.ExternalIds',
      'Images.Primary.Large',
      'Images.Primary.Medium',
      'Offers.Listings.Price',
      'Offers.Listings.DeliveryInfo.IsPrimeEligible',
      'Offers.Summaries.LowestPrice',
    ],
    PartnerTag: process.env.AWS_ASSOCIATE_TAG || '',
  }

  return fetchBooksFromAmazon(params)
}

// Function to process and format the API response
export function processAmazonResponse(apiResponse: any) {
  if (!apiResponse.SearchResult || !apiResponse.SearchResult.Items) {
    return []
  }

  return apiResponse.SearchResult.Items.map((item: any) => ({
    ASIN: item.ASIN,
    title: item.ItemInfo?.Title?.DisplayValue || 'Title unavailable',
    author: item.ItemInfo?.ByLineInfo?.Contributors?.[0]?.Name || 'Unknown author',
    imageUrl: item.Images?.Primary?.Medium?.URL || '/images/no-cover.jpg',
    price:
      item.Offers?.Listings?.[0]?.Price?.DisplayAmount ||
      item.Offers?.Summaries?.[0]?.LowestPrice?.DisplayAmount ||
      'Price unavailable',
    currency: item.Offers?.Listings?.[0]?.Price?.Currency || 'USD',
    detailPageURL: item.DetailPageURL || '#',
    description:
      item.ItemInfo?.ContentInfo?.ContentDescription?.DisplayValue || 'No description available',
    publicationDate: item.ItemInfo?.ContentInfo?.PublicationDate?.DisplayValue || 'Unknown date',
    isPrimeEligible: item.Offers?.Listings?.[0]?.DeliveryInfo?.IsPrimeEligible || false,
  }))
}
