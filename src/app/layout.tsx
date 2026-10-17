import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { CONFIG } from "@/config";
import { JsonLd } from "@/components/JsonLd";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: CONFIG.copy.seoTitle,
  description: CONFIG.copy.seoDescription,
  applicationName: CONFIG.businessName,
  authors: [{ name: CONFIG.owner }],
  keywords: CONFIG.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_HN",
    url: CONFIG.siteUrl,
    siteName: CONFIG.businessName,
    title: CONFIG.copy.seoTitle,
    description: CONFIG.copy.seoDescription,
    images: [
      {
        url: CONFIG.images.hero,
        width: 1920,
        height: 1080,
        alt: CONFIG.copy.heroTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: CONFIG.copy.seoTitle,
    description: CONFIG.copy.seoDescription,
    images: [CONFIG.images.hero],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1B1A3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es-HN" className={`${heading.variable} ${body.variable}`}>
      <body className="min-h-screen bg-white font-sans text-brand-navy antialiased">
        <JsonLd />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
