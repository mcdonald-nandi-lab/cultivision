import ConditionalAnalytics from "@/components/analytics/conditional-analytics";
import CookieConsent from "@/components/analytics/cookie-constent";
import Navbar from "@/components/navbar";
import { CalculationProvider } from "@/context/calculation-context";
import { METADATA_IMG } from "@/lib/constants";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CookieConsentProvider } from "@/context/cookie-consent-context";
import ComposeProviders from "@/context/compose-providers";
import { ModalProvider } from "@/context/modal-context";

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

const providers = [CookieConsentProvider, CalculationProvider, ModalProvider];

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ComposeProviders providers={providers}>
          <Navbar />
          {children}
          <CookieConsent />
          <ConditionalAnalytics />
        </ComposeProviders>
      </body>
    </html>
  );
};

export default RootLayout;
