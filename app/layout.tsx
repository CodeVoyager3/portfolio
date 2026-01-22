
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Amritesh | Full Stack Developer",
  description: "Portfolio of Amritesh Kumar Rai - Full Stack Developer",
  openGraph: {
    title: "Amritesh | Full Stack Developer",
    description: "Portfolio of Amritesh Kumar Rai - Full Stack Developer",
    url: "https://amritesh.dev", // Replace with actual domain
    siteName: "Amritesh Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or use a placehoder
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
  metadataBase: new URL("https://amritesh.dev"), // Replace with actual domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

