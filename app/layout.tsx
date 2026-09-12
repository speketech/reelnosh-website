import type { Metadata } from 'next';
import { Lora, Figtree } from 'next/font/google';
import './globals.css';
import { HeaderWrapper } from '@/components/layout/HeaderWrapper';
import { Footer } from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

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

const defaultTitle = `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://reelnosh.com'),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: '/brand/icon-mark.svg',
    apple: '/brand/icon-mark.svg',
  },
  openGraph: {
    title: defaultTitle,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: SITE_CONFIG.description,
  },
};

import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lora.variable} ${figtree.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var stored=localStorage.getItem('theme');var theme=(stored==='dark'||stored==='light')?stored:'light';document.documentElement.setAttribute('data-theme',theme);if(theme==='dark'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="bg-neutral-warmWhite text-neutral-charcoal antialiased min-h-screen flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              url: 'https://reelnosh.com',
              logo: 'https://reelnosh.com/brand/icon-mark.svg',
              sameAs: Object.values(SITE_CONFIG.links),
            }),
          }}
        />
        <ThemeProvider>
          <HeaderWrapper />
          <div className="flex-1">{children}</div>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
