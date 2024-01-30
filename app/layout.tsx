"use client";

import { Inter } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import HeaderSearch from "@/components/Header-Search";
import HeaderResponsive from "@/components/Header-Responsive";
import { useStore } from "@/store/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSearchOpen, isResponsiveMenu } = useStore();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        <div className="relative z-20">
          <HeaderSearch />
        </div>

        <div className="relative z-20">
          <HeaderResponsive />
        </div>

        <div
          className={`${
            isSearchOpen || isResponsiveMenu
              ? "pointer-events-none"
              : "pointer-events-auto"
          } `}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
