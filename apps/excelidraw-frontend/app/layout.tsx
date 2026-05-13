import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CollabCanvas | Real-Time Collaborative Whiteboard",
  description:
    "A high-performance collaborative canvas built from the ground up for speed and precision. Collaborate in real-time without limits.",
  keywords: [
    "whiteboard",
    "collaboration",
    "real-time",
    "drawing",
    "canvas",
    "team",
  ],
  authors: [{ name: "CollabCanvas Team" }],
  openGraph: {
    title: "CollabCanvas | Real-Time Collaborative Whiteboard",
    description:
      "A high-performance collaborative canvas built from the ground up for speed and precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
