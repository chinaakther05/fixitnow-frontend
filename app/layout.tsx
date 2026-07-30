import { Suspense } from "react";
import "./globals.css";
import { JetBrains_Mono, Merriweather, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import NavbarServer from "@/components/shared/NavbarServer";
import ToastHandler from "@/components/shared/ToastHandler";
import { Toaster } from "@/components/ui/sonner";

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
      className={cn(
        "h-full antialiased",
        jetbrainsMono.variable,
        merriweatherHeading.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div className="h-16 border-b" />}>
          <NavbarServer />
        </Suspense>
        <Suspense fallback={null}>
          <ToastHandler />
        </Suspense>
        {children}
        <Toaster />
      </body>
    </html>
  );
}