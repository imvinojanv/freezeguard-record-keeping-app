import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreezeGuard - The Record Keeping Application",
  description: "The Record Keeping Application",
  // other: {
  //   'theme-color': '#ffffff',
  //   'color-scheme': 'light only',
  //   "keywords": "GPA, Academic Performance Tracker, undergraduates in Sri Lanka, GPA calculator, University",
  //   "twitter:image": 'https://ik.imagekit.io/vinojan/Personal/gplus-landing-page.png',
  //   "twitter:card": "summary_large_image",
  //   "og:title": "G Plus: Academic Performance Tracker",
  //   "og:description": "The Academic Performance Tracker Application for the undergraduates in Sri Lanka",
  //   "og:url": "https://gplus.gov.lk",
  //   "og:image": 'https://ik.imagekit.io/vinojan/Personal/gplus-launch-poster.jpg',
  //   "og:type": "website",
  //   "og:site_name": "G Plus: Academic Performance Tracker"
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
