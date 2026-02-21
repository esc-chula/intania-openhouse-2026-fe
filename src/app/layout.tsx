import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../theme/theme-provider";

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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
