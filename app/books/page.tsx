import { Metadata } from 'next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BooksGrid } from '@/components/books-grid'
import { BookProps } from '@/components/book-card'

export const metadata: Metadata = {
  title: 'Books by Alexandra Psaropoulou | Alexandra Books',
  description:
    'Discover the complete collection of illustrated poetry books by Alexandra Psaropoulou, including the Flying series and other visual poems.',
}

// Function to fetch books server-side for initial load
async function getBooks(series?: string): Promise<BookProps[]> {
  try {
    // Create the API URL with the appropriate params
    const url = new URL(
      `/api/books${series ? `?series=${encodeURIComponent(series)}` : ''}`,
      process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`
    )

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } })

    if (!res.ok) {
      throw new Error(`Failed to fetch books: ${res.statusText}`)
    }

    const data = await res.json()
    return data.books || []
  } catch (error) {
    console.error('Error fetching books:', error)
    return []
  }
}

export default async function BooksPage() {
  // Pre-fetch books for all categories for initial load
  const allBooks = await getBooks()
  const flyingBooks = allBooks.filter((book) => book.series?.toLowerCase() === 'the flying')
  const otherBooks = allBooks.filter((book) => book.series?.toLowerCase() === 'other works')

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Books by Alexandra Psaropoulou</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore Alexandra Psaropoulou's illustrated poetry books, including her renowned "Flying"
          series and other visual poems that take readers on a spiritual journey.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="mb-6 flex justify-center">
          <TabsList>
            <TabsTrigger value="all">All Books</TabsTrigger>
            <TabsTrigger value="flying">The Flying Series</TabsTrigger>
            <TabsTrigger value="other">Other Works</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          <BooksGrid initialBooks={allBooks} />
        </TabsContent>

        <TabsContent value="flying" className="mt-6">
          <BooksGrid initialBooks={flyingBooks} series="The Flying" />
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <BooksGrid initialBooks={otherBooks} series="Other Works" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
