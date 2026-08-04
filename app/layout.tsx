import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ChatWidget } from '@/components/site/chat-widget';
import { AnalyticsBeacon } from '@/components/site/analytics-beacon';
import { DbProvider } from '@/lib/db-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://revnexa.com'),
  title: {
    default: 'Google Play Reviews Service | Real User Feedback for Android Apps',
    template: '%s | Revnexa',
  },
  description:
    'Get authentic Google Play reviews from real Android users. Improve your app rating, gain valuable feedback, and boost conversions. Start your campaign today.',
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
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Revnexa - Google Play Review Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Google Play Reviews Service | Real User Feedback for Android Apps',
    description:
      'Get authentic Google Play reviews from real Android users. Improve your app rating, gain valuable feedback.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://revnexa.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="font-sans antialiased">
        <DbProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
          <AnalyticsBeacon />
        </DbProvider>
      </body>
    </html>
  );
}
