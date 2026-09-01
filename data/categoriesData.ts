export const categoriesData: { [key: string]: string[] } = {
  "Baffles": ["Bin", "Top", "Monitors", "Line Array", "SRX", "RCF", "Normal", "Others"],
  "Speakers": ["8inch", "10inch", "12inch", "15inch", "18inch"],
  "Components & Drivers": ["HF Drivers", "Tweeters", "Diaphragms", "Recone Kits", "Network Boards"],
  "Cabinet Hardware": ["Handles", "Corners", "Castor Wheels", "Speaker Grilles", "Rubber Feet", "Pole Mounts" , "Back Plates" , "T Nuts", "Filter Net", "Logo Badge"],
  "Cables": ["XLR Cables", "Speakon Cables", "Power Cables", "Signal Cables", "Snake Cables"],
  "Connectors & Plugs": ["XLR Plugs", "Speakon Plugs", "Powercon Plugs", "6.35mm Jacks", "Adapters"],
  "Amplifiers": ["Class D Amps", "Power Amps", "4-Channel Amps", "Subwoofer Amps"],
  "Amp rack": ["Flight Cases", "Rack Cabinets", "Accessories", "Metal Racks"],
  "Mixers": ["Digital Mixers", "Analog Mixers", "DJ Mixers"],
  "Microphones": ["Wireless Mics", "Wired Mics", "Condenser Mics", "Mic Stands", "Podium Mics"],
  "Effect / Crossover": ["Passive Crossovers", "Digital Processors (DSP)", "Equalizers", "Effects Processors", "Active Crossovers"],
  "Power Distribution": ["Power Distro Boxes", "Powercon Cable", "Extension Cables", "Surge Protectors"],
  "Lights": ["Beam Moving Heads", "LED COB Par Lights", "PAR Lights", "LED Wash Lights", "Follow Spot Lights", "Laser Lights", "Strobe Lights", "DMX Controllers", "Wireless DMX"],
  "Light stands": ["T-Bars", "Truss Systems", "Heavy Duty Stands"],
  "Stage Effects": ["Fog Machines", "Cold Spark Machines", "Bubble Machines", "Snow Machines"],
  "Others": ["Mounts", "Padded Covers", "Cleaners & Tools"]
};

export const categoriesGrid = [
  { title: "Speaker Baffles", count: "View Collection", icon: "🔊", cat: "Baffles" },
  { title: "Power Amplifiers", count: "View Collection", icon: "⚡", cat: "Amplifiers" },
  { title: "Cables", count: "View Collection", icon: "🔌", cat: "Cables" },
  { title: "Amplifier Racks", count: "View Collection", icon: "🧰", cat: "Amp rack" },

];

export const heroBanners = [
  {
    id: 1,
    title: "Empty Speaker Boxes",
    desc: "18mm Malaysian Plywood Precision Cut Sound Boxes",
    tag: "HOT DEAL",
    image: "/banners/banner1.webp",
    link: "/category/Baffles", 
  },
  {
    id: 2,
    title: "Power Amplifiers",
    desc: "Extreme Outdoor Concert Power Amplifiers",
    tag: "NEW ARRIVAL",
    image: "/banners/banner2.webp",
    link: "/category/Amplifiers",
  },
  {
    id: 3,
    title: "Best Seller Light Stands",
    desc: "Indoor And Outdoor Dj Lighting Stands",
    tag: "BEST SELLER",
    image: "/banners/banner3.webp",
    link: "/category/Light stands",
  },
];