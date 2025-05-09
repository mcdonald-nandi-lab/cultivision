import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CalculationProvider } from "@/context/calculation-context";

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
    url: 'https://aunsh.dev',
    name: 'Aunsh Bandivadekar'
  },
  keywords: ['cultivated', 'meat', 'dashboard', 'ucdavis', 'nextjs'],
  openGraph: {
    title: "Cultivision",
    description: "Track cultivated meat production and sustainability data.",
    url: "https://aunshx.github.io/cultivision/",
    siteName: "Cultivision",
    images: [
      {
        url: "https://i.postimg.cc/bJw4jzv1/cultivision-Dashboard.png",
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
    images: ["https://i.postimg.cc/bJw4jzv1/cultivision-Dashboard.png"],
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
        <CalculationProvider>{children}</CalculationProvider>
      </body>
    </html>
  );
}

export default RootLayout;
