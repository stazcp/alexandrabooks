'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface BookProps {
  ASIN: string
  title: string
  author: string
  imageUrl: string
  price: string
  currency?: string
  detailPageURL: string
  description?: string
  series?: string
  publicationDate?: string
  isPrimeEligible?: boolean
}

export function BookCard({
  ASIN,
  title,
  author,
  imageUrl,
  price,
  detailPageURL,
  description,
  series,
  publicationDate,
  isPrimeEligible,
}: BookProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl || '/images/no-cover.jpg'}
          alt={`Cover of ${title} by ${author}`}
          fill
          className="object-contain p-4 transition-transform hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-2 text-lg">{title}</CardTitle>
          {isPrimeEligible && (
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600">
              Prime
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm">by {author}</CardDescription>
        {series && (
          <CardDescription className="text-xs text-muted-foreground">
            Series: {series}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        {description && <p className="line-clamp-3 text-sm text-gray-600">{description}</p>}
        {publicationDate && (
          <p className="mt-2 text-xs text-gray-500">Published: {publicationDate}</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <p className="font-medium text-primary">{price}</p>
        <Button asChild size="sm">
          <a href={detailPageURL} target="_blank" rel="noreferrer">
            View on Amazon
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
