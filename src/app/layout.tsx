import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalculationProvider } from "@/context/calculation-context";
import { METADATA_IMG } from "@/lib/constants";
import CookieConsent from "@/components/cookie-constent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aunshx.github.io/cultivision/"),
  title: "Cultivision | Cultivated Meat Insights & Analytics",
  description:
    "Explore real-time data and insights on cultivated meat production, sustainability metrics, and bioreactor performance for research and industry professionals.",
  authors: [{ name: "Aunsh Bandivadekar", url: "https://aunsh.dev" }],
  creator: "Aunsh Bandivadekar",
  publisher: "UC Davis",
  applicationName: "Cultivision",
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
  category: "technology",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aunshx.github.io/cultivision/",
    siteName: "Cultivision",
    title: "Cultivision | Advanced Cultivated Meat Analytics Platform",
    description:
      "Track, analyze, and optimize cultivated meat production with real-time sustainability data and performance metrics.",
    images: [
      {
        url: METADATA_IMG,
        width: 1200,
        height: 630,
        alt: "Cultivision Dashboard Interface",
      },
      {
        url: METADATA_IMG,
        width: 1200,
        height: 600,
        alt: "Cultivision Analytics Overview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@YourTwitterHandle",
    creator: "@aunshx",
    title: "Cultivision | Cultivated Meat Analytics",
    description:
      "Interactive dashboard for cultivated meat production monitoring and optimization.",
    images: [METADATA_IMG],
  },

  alternates: {
    canonical: "https://aunshx.github.io/cultivision/",
    languages: {
      "en-US": "https://aunshx.github.io/cultivision/",
    },
  },

  appleWebApp: {
    title: "Cultivision",
    statusBarStyle: "black-translucent",
    capable: true,
  },

  appLinks: {
    web: {
      url: "https://aunshx.github.io/cultivision/",
      should_fallback: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  other: {
    "dc.creator": "Aunsh Bandivadekar",
    "dc.publisher": "UC Davis",
    "dc.rights": "© 2025 Cultivision",
    "dc.subject": "Cultivated Meat, Cellular Agriculture, Alternative Protein",
  },
};

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
        <CalculationProvider>
          {children}
          <CookieConsent />
        </CalculationProvider>
      </body>
    </html>
  );
}

export default RootLayout;
