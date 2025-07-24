import ConditionalAnalytics from "@/components/analytics/conditional-analytics";
import CookieConsent from "@/components/analytics/cookie-constent";
import { AccessControlProvider } from "@/context/access-control-context";
import { CalculationProvider } from "@/context/calculation-context";
import ComposeProviders from "@/context/compose-providers";
import { CookieConsentProvider } from "@/context/cookie-consent-context";
import { ModalProvider } from "@/context/modal-context";
import { ToastProvider } from "@/context/toast-context";
import { AUTHOR_LINK, METADATA_IMG } from "@/lib/constants";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserbackProvider } from "@/context/userback";
import FeedbackButton from "@/components/feedback";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cultivated Meat Insights & Analytics - Cultivision",
  description:
    "Explore real-time data and insights on cultivated meat production, sustainability metrics, and bioreactor performance.",
  authors: {
    url: AUTHOR_LINK,
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
    url: "https://mcdonald-nandi-lab.github.io/cultivision/",
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

const providers = [
  CookieConsentProvider,
  CalculationProvider,
  ModalProvider,
  AccessControlProvider,
  ToastProvider,
  UserbackProvider
];

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
          {children}
          <CookieConsent />
          <ConditionalAnalytics />
          {/* <FeedbackButton /> */}
        </ComposeProviders>
      </body>
    </html>
  );
};

export default RootLayout;
