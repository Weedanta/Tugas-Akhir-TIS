// app/about/page.tsx
import type { Metadata } from 'next';
import AboutNASAPage from '@/components/about/about_nasa';

export const metadata: Metadata = {
  title: 'About NASA - Space Exploration Pioneer',
  description: 'Learn about NASA\'s mission, achievements, and ongoing programs in space exploration. Discover the history and future of America\'s space agency.',
  keywords: ['NASA', 'space exploration', 'astronomy', 'space agency', 'moon landing', 'Mars exploration', 'space telescope'],
  openGraph: {
    title: 'About NASA - Space Exploration Pioneer',
    description: 'Discover NASA\'s incredible journey of space exploration and scientific discovery',
    type: 'website',
    images: [
      {
        url: '/about-nasa-og.jpg',
        width: 1200,
        height: 630,
        alt: 'NASA About Page - Space Exploration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About NASA - Space Exploration Pioneer',
    description: 'Discover NASA\'s incredible journey of space exploration and scientific discovery',
    images: ['/about-nasa-twitter.jpg'],
  },
};

export default function AboutPage() {
  return <AboutNASAPage />;
}