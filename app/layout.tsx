import { Suspense } from "react";
import "./globals.css";
import { JetBrains_Mono, Merriweather, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import NavbarServer from "@/components/shared/NavbarServer";
import ToastHandler from "@/components/shared/ToastHandler";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/QueryProvider";
import Footer from "@/components/shared/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const merriweatherHeading = Merriweather({ subsets: ["latin"], variable: "--font-heading" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        jetbrainsMono.variable,
        merriweatherHeading.variable,
        geist.variable
      )}
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {/* Navbar-এর জন্য ক্যাচ ফিলব্যাক সহ Suspense */}
            <Suspense fallback={<div className="h-16 w-full border-b bg-background" />}>
              <NavbarServer />
            </Suspense>

            <Suspense fallback={null}>
              <ToastHandler />
            </Suspense>

            <main className="flex-1 w-full">{children}</main>

            <Footer />
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}