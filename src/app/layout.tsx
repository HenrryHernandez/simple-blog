import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "sonner";

import { Header } from "@/components";
import { Providers } from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description: "App for sharing posts.",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          <Header /> {children}
        </Providers>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
