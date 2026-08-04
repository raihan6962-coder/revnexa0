import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ChatWidget } from '@/components/site/chat-widget';
import { AnalyticsBeacon } from '@/components/site/analytics-beacon';
import { PerformanceMonitor } from '@/components/site/performance-monitor';
import { DbProvider } from '@/lib/db-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://revnexa.com'),
  title: {
    default: 'Google Play Reviews Service | Real User Feedback for Android Apps',
    template: '%s | Revnexa',
  },
  description:
    'Get authentic Google Play reviews from real Android users. Improve your app rating, gain valuable feedback, and boost conversions. Start your campaign today.',
  keywords: [
    'Google Play reviews',
    'app review service',
    'Android app reviews',
    'Google Play Store reviews',
    'app rating improvement',
    'real user reviews',
    'authentic app feedback',
    'Google Play rating',
    'Android app growth',
    'app store optimization',
    'review generation service',
    'mobile app reviews',
  ],
  authors: [{ name: 'Revnexa' }],
  creator: 'Revnexa',
  publisher: 'Revnexa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://revnexa.com',
    siteName: 'Revnexa',
    title: 'Google Play Reviews Service | Real User Feedback for Android Apps',
    description:
      'Get authentic Google Play reviews from real Android users. Improve your app rating, gain valuable feedback, and boost conversions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Revnexa - Professional Google Play Review Service',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Play Reviews Service | Real User Feedback for Android Apps',
    description:
      'Get authentic Google Play reviews from real Android users. Improve your app rating, gain valuable feedback.',
    images: ['/og-image.png'],
    creator: '@revnexa',
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
  alternates: {
    canonical: 'https://revnexa.com',
    languages: {
      'en-US': 'https://revnexa.com',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans antialiased">
        <DbProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <AnalyticsBeacon />
          <PerformanceMonitor />
        </DbProvider>
      </body>
    </html>
  );
}
