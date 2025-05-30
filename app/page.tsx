// app/page.tsx
import type { Metadata } from 'next';
import { HomePage } from '@/lib/barrel';

export const metadata: Metadata = {
  title: 'NASA Facts - Daily Space Discoveries | APOD',
  description: 'Discover the cosmos through NASA\'s Astronomy Picture of the Day (APOD). Explore breathtaking space images, scientific explanations, and daily astronomical wonders.',
  keywords: 'NASA, APOD, Astronomy Picture of the Day, space, cosmos, astronomy, daily facts, space images',
  openGraph: {
    title: 'NASA Facts - Daily Space Discoveries',
    description: 'Explore NASA\'s daily astronomical images and discoveries',
    type: 'website',
    url: 'https://your-domain.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NASA Facts - Space Exploration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NASA Facts - Daily Space Discoveries',
    description: 'Explore NASA\'s daily astronomical images and discoveries',
    images: ['/twitter-image.jpg'],
  },
};

export default function Page() {
  return <HomePage />;
}