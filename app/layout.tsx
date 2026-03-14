
import type { Metadata } from "next";
import { Hanken_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/ui/ScrollAnimations";

const hkGrotesk = Hanken_Grotesk({
  weight: ['400'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-hk-grotesk',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: "Amritesh | Full Stack Developer",
  description: "Portfolio of Amritesh Kumar Rai - Full Stack Developer",
  openGraph: {
    title: "Amritesh | Full Stack Developer",
    description: "Portfolio of Amritesh Kumar Rai - Full Stack Developer",
    url: "https://amritesh.dev",
    siteName: "Amritesh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Amritesh Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amritesh | Full Stack Developer",
    description: "Portfolio of Amritesh Kumar Rai - Full Stack Developer",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://amritesh.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${hkGrotesk.className} ${instrumentSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <div className="relative z-10">
            {children}
          </div>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
