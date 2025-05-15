import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalculationProvider } from "@/context/calculation-context";
import { METADATA_IMG } from "@/lib/constants";
import CookieConsent from "@/components/cookie-constent";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cultivision | Cultivated Meat Insights & Analytics",
  description:
    "Explore real-time data and insights on cultivated meat production, sustainability metrics, and bioreactor performance.",
  authors: {
    url: "https://aunsh.dev",
    name: "Aunsh Bandivadekar",
  },
  keywords: [
    "cultivated meat",
    "cellular agriculture",
    "bioreactor analytics",
    "food tech",
    "alternative protein",
    "sustainability metrics",
    "ucdavis",
    "dashboard",
  ],
  openGraph: {
    title: "Cultivision",
    description: "Track cultivated meat production and sustainability data.",
    url: "https://aunshx.github.io/cultivision/",
    siteName: "Cultivision",
    images: [
      {
        url: METADATA_IMG,
        width: 1200,
        height: 630,
        alt: "Cultivated Meat Dashboard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cultivision",
    description: "Interactive dashboard for cultivated meat production.",
    images: [METADATA_IMG],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  console.log("HELLO", process.env.NEXT_GOOGLE_ANALYTICS_ID);
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CalculationProvider>
          <Navbar />
          {children}
          <CookieConsent />
        </CalculationProvider>
        <GoogleAnalytics gaId={process.env.NEXT_GOOGLE_ANALYTICS_ID ?? ''} />
      </body>
    </html>
  );
}

export default RootLayout;
