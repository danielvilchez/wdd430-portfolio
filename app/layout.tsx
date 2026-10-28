import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My web development portfolio for WDD 430.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
