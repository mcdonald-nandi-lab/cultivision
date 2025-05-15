import CookieConsent from "@/components/cookie-constent";
import Navbar from "@/components/navbar";
import { CalculationProvider } from "@/context/calculation-context";
import { trackPageView } from "@/lib/analytics";
import { METADATA_IMG } from "@/lib/constants";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

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
  const pathname = usePathname();
  
  useEffect(() => {
    const pageTitle = document.title;
    trackPageView(pathname, pageTitle);
  }, [pathname]);

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
