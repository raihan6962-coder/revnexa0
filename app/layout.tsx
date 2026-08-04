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
    default: 'Revnexa — Google Play Store Review Service',
    template: '%s | Revnexa',
  },
  description:
    'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://revnexa.com',
    siteName: 'Revnexa',
    title: 'Revnexa — Google Play Store Review Service',
    description:
      'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Revnexa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revnexa — Google Play Store Review Service',
    description:
      'Professional Google Play Store review service to help your app grow with authentic user engagement and rating improvement support.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
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
