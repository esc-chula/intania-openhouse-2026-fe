import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { ThemeProvider } from "../theme/theme-provider";
import { AuthProvider } from "@/contexts/auth-provider";
import { ReactQueryProvider } from "@/contexts/query-provider";

import { Noto_Sans_Thai, Manrope } from 'next/font/google';
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-thai',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: "Intania Openhouse 2026",
  description: "Intania Openhouse 2026",
  openGraph: {
    title: "Intania Openhouse 2026",
    description: "Intania Openhouse 2026",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansThai.variable} ${manrope.variable}`}>
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <ThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
