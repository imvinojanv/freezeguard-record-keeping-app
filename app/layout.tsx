import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from "next/font/google";

import "./globals.css";
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreezeGuard - The Record Keeping Application",
  description: "The Record Keeping Application",
  other: {
    'theme-color': '#ffffff',
    'color-scheme': 'light only',
    "twitter:image": 'https://ik.imagekit.io/vinojan/Personal/gplus-landing-page.png',
    "twitter:card": "summary_large_image",
    "og:title": "FreezeGuard - The Record Keeping Application",
    "og:description": "The Record Keeping Application for FreezeGuard",
    "og:url": "https://freezeguard.uk/",
    "og:image": 'https://utfs.io/f/6be27557-6803-48dc-b643-d59bcb9150eb-widiox.png',
    "og:type": "website",
    "og:site_name": "FreezeGuard - The Record Keeping Application"
  }
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
