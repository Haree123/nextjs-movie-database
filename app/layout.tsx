import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import HeaderSearch from "@/components/Header-Search";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Film Box",
  description: "Created By Haree Prasad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="relative z-20">
          <HeaderSearch />
        </div>
        {children}
      </body>
    </html>
  );
}
