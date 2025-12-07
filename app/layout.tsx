import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex Lite - Explore Pokemon",
  description: "A modern Pokedex web application built with Next.js featuring server-side rendering, search, filters, and Firebase authentication.",
  keywords: ["pokemon", "pokedex", "nextjs", "typescript", "pokemon database"],
  authors: [{ name: "Hitesh Mehta" }],
  openGraph: {
    title: "Pokedex Lite - Explore Pokemon",
    description: "Discover and explore Pokemon with our modern web application",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
