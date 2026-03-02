import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "ApalyRx | Real-Time Prescription Routing & Benefit Operations Platform",
  description:
    "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost — and documents every decision.",
  openGraph: {
    title: "ApalyRx | Real-Time Prescription Routing & Benefit Operations Platform",
    description:
      "ApalyRx works alongside PBMs to independently route high-cost prescriptions in real time to the lowest net cost — and documents every decision.",
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
    <html lang="en" className={quicksand.variable}>
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
      <body className="font-quicksand antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
