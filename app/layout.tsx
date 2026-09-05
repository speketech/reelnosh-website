import type { Metadata } from 'next';
import { Lora, Figtree } from 'next/font/google';
import './globals.css';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { Footer } from '@/components/layout/Footer';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Reelnosh | Where food content becomes meals.',
  description:
    'We turn food content into meals you can actually order. Help shape the first creator-led food drops in Lagos.',
  icons: {
    icon: '/brand/icon-mark.svg',
    apple: '/brand/icon-mark.svg',
  },
  openGraph: {
    title: 'Reelnosh | Where food content becomes meals.',
    description:
      'We turn food content into meals you can actually order. Help shape the first creator-led food drops in Lagos.',
    siteName: 'Reelnosh',
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${figtree.variable}`}>
      <body className="bg-neutral-warmWhite text-neutral-charcoal antialiased min-h-screen flex flex-col font-sans">
        <HeaderWrapper />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
