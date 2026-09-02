export default function SeoSchema() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AudioVisualStore",
    "name": "K.M SOUNDS",
    "alternateName": [
      "KM Sounds Hanwella",
      "K.M SOUNDS Sri Lanka",
      "KM SOUNDS Pro Audio & Stage Lighting",
      "KM Sound Speaker Box Builders"
    ],
    "image": "https://kmsounds.com/og-image.jpg",
    "description":
      "Leading Sri Lankan manufacturer and supplier of pro audio equipment, custom speaker baffles (SRX 715, 718, 725 & RCF Bins/Tops crafted with 18mm Malaysian Plywood), power amplifiers, crossovers, studio microphones, XLR cables, light stands, T-bar stands, and stage accessories in Hanwella.",
    "url": "https://kmsounds.com",
    "priceRange": "LKR",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hanwella",
      "addressRegion": "Colombo",
      "addressCountry": "LK"
    },
    "slogan": "Feel the Power, Hear The Quality",
    "keywords": "Speaker Baffles Sri Lanka, SRX 718 Box Price, RCF Speaker Bins, 18mm Malaysian Plywood Speaker Boxes, Power Amplifiers Sri Lanka, Light Stands, T-Bar Light Stand, Mic Stands, Studio Microphones, XLR Cables Sri Lanka, Audio Connectors, Subwoofer Enclosures, Stage Lighting Accessories, DJ Sound Systems Hanwella",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pro Audio & Stage Equipment Catalog",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Custom Speaker Baffles & Cabinets (SRX 715, 718, 725, RCF Bins & Tops)",
          "description": "Precision-cut custom speaker baffles and full enclosures built with high-grade 18mm Malaysian Plywood according to original specs."
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Pro Power Amplifiers & Speaker Protection Modules",
          "description": "High-output power amplifiers, MOSFET modules, sound processing units, and speaker protection systems."
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Stage Lighting Stands & T-Bar Mounts",
          "description": "Heavy-duty stage light stands, T-bar light stands, and lighting rig mounting accessories."
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Microphones & Professional Mic Stands",
          "description": "Vocal and instrument microphones, desktop mic stands, and heavy-duty boom mic stands."
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Pro Audio Cables & XLR Connectors",
          "description": "Balanced XLR microphone cables, heavy-duty speaker cables, audio patch cords, and connectors."
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Active & Passive Audio Crossovers",
          "description": "Digital audio processors and active/passive frequency crossover systems for live audio setups."
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData),
      }}
    />
  );
}