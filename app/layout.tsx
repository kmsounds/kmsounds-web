import type { Metadata, Viewport } from "next";
import "./globals.css";
import SocialFloatingMenu from "@/components/SocialFloatingMenu";
import SeoSchema from "@/components/SeoSchema";

export const metadata: Metadata = {
  title: {
    default: "K.M SOUNDS Hanwella | Pro Audio Solutions",
    template: "%s | K.M SOUNDS"

  },

  other: {
    google: "notranslate",
  },
  
manifest: "/manifest.json",
 
  description: "K.M SOUNDS Hanwella - Premier manufacturer and supplier of Pro Audio Equipment in Sri Lanka. SRX & RCF Baffles, Subwoofer Bins, Tops, Amplifiers, Mixers, DJ Lights, Stands, Mic & Pro Cables.",
  keywords: [
    
    // Brand & Location
    "KM Sounds Hanwella",
    "Km Sounds",
    "K.M SOUNDS",
    "Audio Store Hanwella",
    "Music Shop Colombo",
    "DJ Store Sri Lanka",
    "Pro Audio Sri Lanka",

    // Speaker Baffles & Cabinets
    "Speaker Cabinets",
    "Speaker Baffles Sri Lanka",
    "Buffel",
    "Bin",
    "Top",
    "Bass Bin",
    "Subwoofer Enclosures",
    "18mm Malaysian Plywood Cabinets",
    "SRX 715",
    "SRX 718",
    "SRX 725",
    "RCF Baffle",

    // Speaker Sizes & Component Brands
    "18 inch speaker model",
    "15 inch speaker model",
    "12 inch speaker model",
    "10 inch speaker model",
    "8 inch speaker model",
    "RCF",
    "B&C",
    "JBL",
    "Eminence",
    "PD",
    "Hice",
    "Backplate",
    "Hice cones",

    // Electronics & Gear
    "Pro audio",
    "Sound item",
    "Pro Audio Equipment",
    "Sounds",
    "Amplifier",
    "Power Amplifiers",
    "Mixers",
    "Crossovers",
    "Digital Crossover",
    "Equalizer",
    "Effect Machine",

    // Accessories & Hardware
    "Light Stands",
    "T Bar",
    "Dj equipment",
    "Lights",
    "Pro Audio Cables",
    "Mic",
    "Mic stands",
    "Amp Rack",
    "Sound System Accessories Sri Lanka"
  ],
  authors: [{ name: "K.M SOUNDS" }],
  openGraph: {
    title: "K.M SOUNDS Hanwella | Feel the Power Hear The Quality",
    description: "High-Performance Speaker Baffles, RCF Bins & Tops, Power Amps, DJ Equipment & Pro Audio Accessories in Sri Lanka.",
    url: "https://kmsounds.com",
    siteName: "K.M SOUNDS",
    images: [
      {
        url: "https://kmsounds.com/og-main/og-main.jpeg",
        width: 1200,
        height: 630,
        alt: "K.M Sounds Hanwella Pro Audio Equipment",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "K.M SOUNDS HANWELLA | PRO AUDIO SOLUTIONS",
    description: "High-Performance Speaker Baffles, RCF Bins & Tops, Power Amps, DJ Equipment & Pro Audio Accessories in Sri Lanka.",
    images: ["https://kmsounds.com/og-main/og-main.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <SeoSchema />
      </head>
      <body className="antialiased bg-slate-950 text-slate-100 selection:bg-cyan-500">
        {children}
        <SocialFloatingMenu />
      </body>
    </html>
  );
}