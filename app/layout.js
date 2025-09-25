// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⚠️ Cambia el dominio por el real
const SITE_URL = "https://justdots.art";
const SITE_NAME = "DOTS";
const TWITTER_USER = "@justdots_art"; // cámbialo

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DOTS — The largest PFP collection in history",
    template: "%s · DOTS",
  },
  description:
    "1,100,000 PFPs. Born on Bitcoin. Moving endlessly across its node network.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "DOTS — The largest PFP collection in history",
    description:
      "1,100,000 PFPs. Born on Bitcoin. Moving endlessly across its node network.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DOTS — 1,100,000 PFPs on Bitcoin",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOTS — The largest PFP collection in history",
    description:
      "1,100,000 PFPs. Born on Bitcoin. Moving endlessly across its node network.",
    site: TWITTER_USER,
    creator: TWITTER_USER,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 👇 añadimos starry-bg aquí */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased starry-bg`}>
        {children}

        {/* JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              sameAs: ["https://x.com/justdots_art"],
              logo: `${SITE_URL}/icon.png`,
            }),
          }}
        />
        {/* JSON-LD WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: SITE_URL,
              name: SITE_NAME,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
