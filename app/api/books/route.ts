import { NextResponse } from 'next/server'
import { getBooksByAuthor, processAmazonResponse } from '@/lib/amazon-api'
import { AUTHOR_AMAZON_PAGE } from '@/app/lib/fallback-data'

// Book interface
interface Book {
  ASIN: string
  title: string
  author: string
  imageUrl: string
  price: string
  currency: string
  detailPageURL: string
  description: string
  series?: string
  publicationDate: string
  isPrimeEligible?: boolean
}

// Mock data for fallback or development
const mockAmazonBooks: Book[] = [
  {
    ASIN: 'B07HMQJW7T',
    title: 'Flying 12',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying12-cover.png',
    price: '12.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'The twelfth installment in the Flying series takes readers on a journey through visual poetry and spiritual exploration with vibrant colors and dynamic flowing lines.',
    series: 'The Flying',
    publicationDate: '2018-09-15',
  },
  {
    ASIN: 'B07JKLN45P',
    title: 'Flying 13',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying13-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'Flying 13 continues the spiritual journey with new visual poems and artistic expressions. The soft pink background creates a gentle contrast with the vibrant flowing elements.',
    series: 'The Flying',
    publicationDate: '2019-03-22',
  },
  {
    ASIN: 'B07NPQF3VX',
    title: 'Flying 14',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying14-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'The fourteenth book in the series features a bright yellow background with flowing cyan lines, creating a sense of movement and energy that lifts the spirit.',
    series: 'The Flying',
    publicationDate: '2019-08-10',
  },
  {
    ASIN: 'B07TNKL45M',
    title: 'Flying 15',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying15-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'Flying 15 builds upon the foundation of the series, taking readers deeper into the realms of inner exploration with its unique visual style and spiritual insights.',
    series: 'The Flying',
    publicationDate: '2020-01-15',
  },
  {
    ASIN: 'B07ZNP4F3V',
    title: 'Flying 16',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying16-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'The sixteenth installment features a stunning orange and yellow color palette with dynamic flowing lines that represent the journey of spiritual awakening.',
    series: 'The Flying',
    publicationDate: '2020-06-30',
  },
  {
    ASIN: 'B08HMQJW7T',
    title: 'All The Stars',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/all-the-stars-cover.jpg',
    price: '14.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'A mesmerizing journey through cosmic imagery and spiritual poetry. The vibrant blue background with circular patterns creates a sense of celestial movement and cosmic harmony.',
    series: 'Other Works',
    publicationDate: '2021-02-18',
  },
  {
    ASIN: 'B08JKLN45P',
    title: 'All Blown Up',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/all-blown-up-cover.jpg',
    price: '14.99',
    currency: 'USD',
    detailPageURL: AUTHOR_AMAZON_PAGE,
    description:
      'An explosive collection of visual poetry that expands the mind and spirit. The purple background with flowing orange lines creates a sense of expansion and transformation.',
    series: 'Other Works',
    publicationDate: '2021-09-05',
  },
]

// Cache control settings
export const revalidate = 3600 // Revalidate data once per hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const series = searchParams.get('series')
  const useMockData = searchParams.get('mock') === 'true' || process.env.USE_MOCK_DATA === 'true'

  try {
    // Alexandra Psaropoulou's Amazon Author ID
    const authorId = process.env.AUTHOR_ID || 'B07HMP374T'
    let books = []

    if (useMockData) {
      console.log('Using mock data for books')
      books = mockAmazonBooks
    } else {
      // Try to fetch from Amazon API
      try {
        console.log('Fetching books from Amazon API for author:', authorId)
        const apiResponse = await getBooksByAuthor(authorId)
        books = processAmazonResponse(apiResponse)

        // If we didn't get any books, fall back to mock data
        if (!books || books.length === 0) {
          console.log('No books returned from API, using mock data')
          books = mockAmazonBooks
        }
      } catch (apiError) {
        console.error('Error fetching from Amazon API:', apiError)
        console.log('Falling back to mock data')
        books = mockAmazonBooks
      }
    }

    // Filter by series if requested
    const filteredBooks = series
      ? books.filter((book: Book) => book.series?.toLowerCase() === series.toLowerCase())
      : books

    return NextResponse.json({ books: filteredBooks })
  } catch (error) {
    console.error('Error in books API route:', error)
    return NextResponse.json({ error: 'Failed to fetch books', books: [] }, { status: 500 })
  }
}
