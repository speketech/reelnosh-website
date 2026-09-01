import type { Metadata } from "next";
import { Figtree, Lora } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reelnosh | Where Food Content Becomes Meals",
  description:
    "Reelnosh turns food content from local food creators into limited meal Drops you can discover, order, and enjoy.",
  metadataBase: new URL("https://www.reelnosh.com"),
  openGraph: {
    title: "Reelnosh | Where Food Content Becomes Meals",
    description:
      "Discover limited meal Drops from local food creators and order the food you see in their content.",
    url: "https://www.reelnosh.com",
    siteName: "Reelnosh",
    images: [
      {
        url: "/images/hero-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reelnosh | Where Food Content Becomes Meals",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reelnosh | Where Food Content Becomes Meals",
    description:
      "Discover limited meal Drops from local food creators and order the food you see in their content.",
    images: ["/images/hero-og-image.jpg"],
    creator: "@reelnosh",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-warmWhite text-charcoal">
        {children}
      </body>
    </html>
  );
}
