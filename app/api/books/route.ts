import { NextResponse } from "next/server"

// This would normally use the official Amazon Product Advertising API SDK
// but for demonstration purposes, we'll create a mock implementation

// Mock data structure based on what Amazon's API would return
const mockAmazonBooks = [
  {
    ASIN: "B07HMQJW7T",
    title: "Flying 12",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/flying12-cover.png",
    price: "12.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B07HMQJW7T",
    description:
      "The twelfth installment in the Flying series takes readers on a journey through visual poetry and spiritual exploration with vibrant colors and dynamic flowing lines.",
    series: "The Flying",
    publicationDate: "2018-09-15",
  },
  {
    ASIN: "B07JKLN45P",
    title: "Flying 13",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/flying13-cover.jpg",
    price: "12.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B07JKLN45P",
    description:
      "Flying 13 continues the spiritual journey with new visual poems and artistic expressions. The soft pink background creates a gentle contrast with the vibrant flowing elements.",
    series: "The Flying",
    publicationDate: "2019-03-22",
  },
  {
    ASIN: "B07NPQF3VX",
    title: "Flying 14",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/flying14-cover.jpg",
    price: "12.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B07NPQF3VX",
    description:
      "The fourteenth book in the series features a bright yellow background with flowing cyan lines, creating a sense of movement and energy that lifts the spirit.",
    series: "The Flying",
    publicationDate: "2019-08-10",
  },
  {
    ASIN: "B07TNKL45M",
    title: "Flying 15",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/flying15-cover.jpg",
    price: "12.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B07TNKL45M",
    description:
      "Flying 15 builds upon the foundation of the series, taking readers deeper into the realms of inner exploration with its unique visual style and spiritual insights.",
    series: "The Flying",
    publicationDate: "2020-01-15",
  },
  {
    ASIN: "B07ZNP4F3V",
    title: "Flying 16",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/flying16-cover.jpg",
    price: "12.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B07ZNP4F3V",
    description:
      "The sixteenth installment features a stunning orange and yellow color palette with dynamic flowing lines that represent the journey of spiritual awakening.",
    series: "The Flying",
    publicationDate: "2020-06-30",
  },
  {
    ASIN: "B08HMQJW7T",
    title: "All The Stars",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/all-the-stars-cover.jpg",
    price: "14.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B08HMQJW7T",
    description:
      "A mesmerizing journey through cosmic imagery and spiritual poetry. The vibrant blue background with circular patterns creates a sense of celestial movement and cosmic harmony.",
    series: "Other Works",
    publicationDate: "2021-02-18",
  },
  {
    ASIN: "B08JKLN45P",
    title: "All Blown Up",
    author: "Alexandra Psaropoulou",
    imageUrl: "/images/all-blown-up-cover.jpg",
    price: "14.99",
    currency: "USD",
    detailPageURL: "https://www.amazon.com/dp/B08JKLN45P",
    description:
      "An explosive collection of visual poetry that expands the mind and spirit. The purple background with flowing orange lines creates a sense of expansion and transformation.",
    series: "Other Works",
    publicationDate: "2021-09-05",
  },
]

// In a real implementation, this would use the Amazon Product Advertising API
// with proper authentication and error handling
async function fetchBooksFromAmazon(authorId: string) {
  // This is where you would make the actual API call to Amazon
  // For example:
  // const response = await amazonPaApi.searchItems({
  //   Keywords: authorId,
  //   SearchIndex: 'Books',
  //   Resources: ['ItemInfo.Title', 'Images.Primary.Large', 'Offers.Listings.Price']
  // });

  // For now, we'll just return our mock data
  return mockAmazonBooks
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const series = searchParams.get("series")

  try {
    // In a real implementation, you would use the author's Amazon ID
    const authorId = "B07HMP374T" // Alexandra Psaropoulou's Amazon Author ID
    const books = await fetchBooksFromAmazon(authorId)

    // Filter by series if requested
    const filteredBooks = series ? books.filter((book) => book.series.toLowerCase() === series.toLowerCase()) : books

    return NextResponse.json({ books: filteredBooks })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Failed to fetch books from Amazon" }, { status: 500 })
  }
}

