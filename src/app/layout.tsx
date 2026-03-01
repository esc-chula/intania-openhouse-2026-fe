import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { ThemeProvider } from "../theme/theme-provider";
import { AuthProvider } from "@/contexts/auth-provider";
import { ReactQueryProvider } from "@/contexts/query-provider";

export const metadata: Metadata = {
  title: "Intania Openhouse 2026",
  description: "Intania Openhouse 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
