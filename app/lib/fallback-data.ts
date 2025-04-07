import type { Book } from './types'

// Fallback book data for when API calls fail
export const fallbackBooks: Book[] = [
  {
    ASIN: 'fallback-flying-1',
    title: 'Flying 12',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying12-cover.png',
    price: '12.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description:
      'The twelfth installment in the Flying series takes readers on a journey through visual poetry.',
    series: 'The Flying',
    publicationDate: '2018-09-15',
  },
  {
    ASIN: 'fallback-flying-2',
    title: 'Flying 13',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying13-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description:
      'Flying 13 continues the spiritual journey with new visual poems and artistic expressions.',
    series: 'The Flying',
    publicationDate: '2019-03-22',
  },
  {
    ASIN: 'fallback-flying-3',
    title: 'Flying 14',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying14-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description:
      'The fourteenth book in the Flying series features flowing lines, creating a sense of movement and energy.',
    series: 'The Flying',
    publicationDate: '2019-08-10',
  },
  {
    ASIN: 'fallback-flying-4',
    title: 'Flying 15',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying15-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description:
      'The fifteenth book in the Flying series continues the spiritual journey with vibrant visuals.',
    series: 'The Flying',
    publicationDate: '2020-01-15',
  },
  {
    ASIN: 'fallback-flying-5',
    title: 'Flying 16',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/flying16-cover.jpg',
    price: '12.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description:
      'The sixteenth book in the Flying series with flowing lines that represent spiritual awakening.',
    series: 'The Flying',
    publicationDate: '2020-06-30',
  },
  {
    ASIN: 'fallback-other-1',
    title: 'All The Stars',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/all-the-stars-cover.jpg',
    price: '14.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description: 'A mesmerizing journey through cosmic imagery and spiritual poetry.',
    series: 'Other Works',
    publicationDate: '2021-02-18',
  },
  {
    ASIN: 'fallback-other-2',
    title: 'All Blown Up',
    author: 'Alexandra Psaropoulou',
    imageUrl: '/images/all-blown-up-cover.jpg',
    price: '14.99',
    currency: 'USD',
    detailPageURL: 'https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T',
    description: 'An explosive collection of visual poetry that expands the mind and spirit.',
    series: 'Other Works',
    publicationDate: '2021-09-05',
  },
]

// Map of fallback images by series for when remote images fail to load
export const fallbackImagesBySeries: { [key: string]: string } = {
  'The Flying': '/images/flying12-cover.png',
  'Other Works': '/images/all-the-stars-cover.jpg',
  default: '/images/logo.png',
}

/**
 * Helper function to get a fallback image based on book series
 */
export function getFallbackImage(series?: string): string {
  if (series && fallbackImagesBySeries[series]) {
    return fallbackImagesBySeries[series]
  }
  return fallbackImagesBySeries.default
}

/**
 * Helper function to filter fallback books by series
 */
export function getFilteredFallbackBooks(series?: string) {
  if (!series) return fallbackBooks

  return fallbackBooks.filter((book) => book.series.toLowerCase() === series.toLowerCase())
}
