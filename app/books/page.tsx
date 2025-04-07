'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookDisplay } from '@/components/book-display'
import { useBooks } from '@/hooks/useBooks'

export default function BooksPage() {
  // Use our custom hook to get books data
  const { getBooksBySeries, isLoading, error } = useBooks()

  // Get books for each category using the hook
  const allBooks = getBooksBySeries(undefined)
  const flyingBooks = getBooksBySeries('The Flying')
  const otherBooks = getBooksBySeries('Other Works')

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Amazon Book Catalog</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Browse all of Alexandra Psaropoulou's illustrated poetry books available on Amazon,
          including her renowned "Flying" series and other visual poems.
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
          <BookDisplay books={allBooks} isLoading={isLoading} error={error} />
        </TabsContent>

        <TabsContent value="flying" className="mt-6">
          <BookDisplay books={flyingBooks} isLoading={isLoading} error={error} />
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <BookDisplay books={otherBooks} isLoading={isLoading} error={error} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
