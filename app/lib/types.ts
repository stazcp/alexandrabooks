export interface Book {
  ASIN: string
  title: string
  author: string
  imageUrl: string
  price?: string
  currency?: string
  detailPageURL: string
  description: string
  series: string
  publicationDate?: string
  isPrimeEligible?: boolean
}
