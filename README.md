# Alexandra Books

A modern website showcasing the poetry and visual art of Alexandra Psaropoulou. This project uses Next.js to create a beautiful, responsive platform for exploring Alexandra's illustrated poetry books, with dynamic content fetched from Amazon's Product Advertising API.

## About

Alexandra Psaropoulou is a visual poet known for "The Flying series" - innovative illustrated poetry books that take readers on spiritual journeys. This website serves as a digital gallery and storefront for her work, making her unique blend of poetry and visual art accessible to a global audience.

## Features

- **Dynamic Book Catalog**: Automatically fetches and displays Alexandra's latest books from Amazon
- **Responsive Design**: Beautiful reading experience on all devices
- **Light/Dark Mode**: Comfortable viewing options for different environments
- **Poetry Showcase**: Dedicated sections for highlighting featured poems and artwork
- **Direct Purchase Links**: Easy access to buy books through Amazon

## Technology Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **API Integration**: AWS Product Advertising API
- **Deployment**: [Deployment platform TBD]

## Development

### Prerequisites

- Node.js 16.x or higher
- pnpm package manager

### Setup

1. Clone the repository

   ```
   git clone https://github.com/stazcp/alexandrabooks.git
   cd alexandrabooks
   ```

2. Install dependencies

   ```
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following variables:

   ```
   AWS_ACCESS_KEY=your_access_key
   AWS_SECRET_KEY=your_secret_key
   AWS_ASSOCIATE_TAG=your_associate_tag
   AUTHOR_ID=B07HMP374T
   ```

4. Start the development server
   ```
   pnpm dev
   ```

## AWS API Integration

This project utilizes Amazon's Product Advertising API to dynamically fetch book data. The integration allows us to:

1. Display up-to-date book listings from Alexandra Psaropoulou's author page
2. Show book covers, descriptions, prices, and availability
3. Provide direct purchase links to Amazon
4. Automatically update when new books are published

## Deployment

[Deployment instructions to be added]

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[License information to be added]

## Links

- Author's Amazon Store: [Alexandra Psaropoulou on Amazon](https://www.amazon.com/stores/Alexandra-Psaropoulou/author/B07HMP374T)
- Author's Website: [alexandrabooks.info](https://alexandrabooks.info/)
