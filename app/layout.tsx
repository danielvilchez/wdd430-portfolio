import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Portfolio | WDD 430",
    template: "%s | My Portfolio",
  },
  description:
    "Explore my web development portfolio, including projects built with React, Next.js, TypeScript, and Tailwind CSS.",
  metadataBase: new URL("https://wdd430-portfolio-peach.vercel.app"),
  openGraph: {
    title: "My Portfolio | WDD 430",
    description:
      "Explore my web development portfolio and my journey learning modern web development.",
    type: "website",
    locale: "en_US",
    siteName: "My Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Portfolio | WDD 430",
    description:
      "Explore my web development portfolio and projects.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Suspense fallback={<div className="h-16" />}>
          <Header />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
