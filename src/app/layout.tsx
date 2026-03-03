import type { Metadata } from "next";
import { Quicksand, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata: Metadata = {
  title: "ApalyRx | Direct Drug Access — Simplified",
  description:
    "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost. Configurable rules, real-time eRx routing, medical claims settlement, and decision-level documentation.",
  openGraph: {
    title: "ApalyRx | Direct Drug Access — Simplified",
    description:
      "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost. Configurable rules, real-time eRx routing, medical claims settlement, and decision-level documentation.",
    type: "website",
    locale: "en_US",
    siteName: "ApalyRx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${openSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ApalyRx",
              description:
                "Real-time prescription routing and benefit operations platform",
              url: "https://apalyrx.com",
              email: "sales@apalyrx.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tampa",
                addressRegion: "FL",
                addressCountry: "US",
              },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
