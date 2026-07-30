
import "./globals.css";
import { JetBrains_Mono, Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";

const merriweatherHeading = Merriweather({subsets:['latin'],variable:'--font-heading'});

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-mono", jetbrainsMono.variable, merriweatherHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {/** navbar */}
        {children}

        {/** footer */}
        </body>
    </html>
  );
}
