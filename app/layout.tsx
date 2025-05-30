// app/layout.tsx
import type { Metadata } from 'next';
import { Navbar, geistSans, ThemeProvider, ThemeSwitcher, Footer } from '@/lib/barrel';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'NASA Facts - Daily Space Discoveries',
    template: '%s | NASA Facts'
  },
  description: 'Discover the cosmos through NASA\'s Astronomy Picture of the Day (APOD). Explore breathtaking space images, scientific explanations, and daily astronomical wonders.',
  keywords: ['NASA', 'APOD', 'Astronomy Picture of the Day', 'space', 'cosmos', 'astronomy', 'daily facts', 'space images'],
  authors: [{ name: 'NASA Facts Team' }],
  creator: 'NASA Facts',
  publisher: 'NASA Facts',
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'NASA Facts - Daily Space Discoveries',
    description: 'Explore NASA\'s daily astronomical images and discoveries',
    siteName: 'NASA Facts',
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
    creator: '@nasafacts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <main className="relative mt-20 max-w-7xl mx-auto">
            {children}
          </main>
          <div className="fixed bottom-4 right-4 z-50"> 
            <ThemeSwitcher/>
          </div>

          {/* Footer */}
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}