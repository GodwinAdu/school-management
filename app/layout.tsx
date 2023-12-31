import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/lib/provider";
import Loader from "@/components/loader/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Management",
  description: "Created by Jutech Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Loader />
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
