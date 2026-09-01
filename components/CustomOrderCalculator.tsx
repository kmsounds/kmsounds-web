"use client";

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, MessageCircle, Info, ShieldAlert } from 'lucide-react';

interface CustomOrderCalculatorProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface SpeakerOption {
  name: string;
  price: number;
}

interface ModelData {
  id: string;
  name: string;
  basePrice: number; // Complete Empty Box Price (Pair 2)
  rawMinus: number; // Complete Without Handles/Grill/Net Price Deduction
  speakers: SpeakerOption[];
}

interface CategoryData {
  category: string;
  paintDeduction: number;
  models: ModelData[];
  note: string;
  isLineArray?: boolean;
}

const CALCULATOR_DATA: CategoryData[] = [
  {
    category: 'Double Top (15")',
    paintDeduction: 2500,
    note: '⭕️ Complete With: Handle, Net, Filter Net, Hice Cone, Back Plate, Pole Mount Socket, Badge & Texture Paint',
    models: [
      {
        id: 'jbl-725',
        name: 'JBL 725 Double Top (Pair)',
        basePrice: 62500,
        rawMinus: 12600, // 62500 - 49900 = 12600
        speakers: [
          { name: 'JBL 2226 H (VC 4" - 1600W) & 750 Hice', price: 155000 },
          { name: 'RCF 15 lf 400H (VC 4" - 1800W) & 750 Hice', price: 190000 },
          { name: 'RCF lf 401 (VC 4" - 1600W) & 750 Hice', price: 185000 },
          { name: 'B&C TBW 100 (VC 4" - 2000W) & 750 Hice', price: 190000 },
          { name: 'Eminence KP 15A (VC 3" - 500W) & 750 Hice', price: 136000 }
        ]
      },
      {
        id: 'rcf-15-dt',
        name: 'RCF 15 Double Top (Pair)',
        basePrice: 62500,
        rawMinus: 12600,
        speakers: [
          { name: 'JBL 2226 H (VC 4" - 1600W) & 750 Hice', price: 155000 },
          { name: 'RCF 15 lf 400H (VC 4" - 1800W) & 750 Hice', price: 190000 },
          { name: 'RCF lf 401 (VC 4" - 1600W) & 750 Hice', price: 185000 },
          { name: 'B&C TBW 100 (VC 4" - 2000W) & 750 Hice', price: 190000 },
          { name: 'Eminence KP 15A (VC 3" - 500W) & 750 Hice', price: 136000 }
        ]
      }
    ]
  },
  {
    category: 'Single Top (15" / 12")',
    paintDeduction: 2000,
    note: '⭕️ Complete With: Handle, Net, Filter Net, Hice Cone, Back Plate, Pole Mount Socket, Badge & Texture Paint',
    models: [
      {
        id: 'jbl-715',
        name: 'JBL 715 (15" Pair)',
        basePrice: 46500,
        rawMinus: 10500, // 46500 - 36000 = 10500
        speakers: [
          { name: 'JBL 2226 H (VC 4" - 1600W) & 450 Hice', price: 88500 },
          { name: 'RCF 15 lf 400H (VC 4" - 1800W) & 450 Hice', price: 105000 },
          { name: 'RCF lf 401 (VC 4" - 1600W) & 450 Hice', price: 96500 },
          { name: 'B&C TBW 100 (VC 4" - 2000W) & 450 Hice', price: 105000 },
          { name: 'Eminence KP 15A (VC 3" - 500W) & 450 Hice', price: 70000 }
        ]
      },
      {
        id: 'rcf-15-st',
        name: 'RCF 15 (15" Pair)',
        basePrice: 46500,
        rawMinus: 10500,
        speakers: [
          { name: 'JBL 2226 H (VC 4" - 1600W) & 450 Hice', price: 88500 },
          { name: 'RCF 15 lf 400H (VC 4" - 1800W) & 450 Hice', price: 105000 },
          { name: 'RCF lf 401 (VC 4" - 1600W) & 450 Hice', price: 96500 },
          { name: 'B&C TBW 100 (VC 4" - 2000W) & 450 Hice', price: 105000 },
          { name: 'Eminence KP 15A (VC 3" - 500W) & 450 Hice', price: 70000 }
        ]
      },
      {
        id: 'jbl-712',
        name: 'JBL 712 (12" Pair)',
        basePrice: 35500,
        rawMinus: 9500, // 35500 - 26000 = 9500
        speakers: [
          { name: 'RCF 12X351 (VC 3" - 900W) 350 Hice', price: 73500 },
          { name: 'B&C 12EAU-20 (VC 3" - 450W) 350 Hice', price: 71500 },
          { name: 'RCF lf 12G301 (VC 3" - 900W) 350 Hice', price: 73500 }
        ]
      },
      {
        id: 'rcf-12-st',
        name: 'RCF 12 (12" Pair)',
        basePrice: 35500,
        rawMinus: 9500,
        speakers: [
          { name: 'RCF 12X351 (VC 3" - 900W) 350 Hice', price: 73500 },
          { name: 'B&C 12EAU-20 (VC 3" - 450W) 350 Hice', price: 71500 },
          { name: 'RCF lf 12G301 (VC 3" - 900W) 350 Hice', price: 73500 }
        ]
      }
    ]
  },
  {
    category: 'Normal Top (Rexin)',
    paintDeduction: 1500,
    note: '⭕️ Complete With: Handle, Hice Cone, Back Plate & Rexin Finish',
    models: [
      {
        id: 'norm-15',
        name: '15" Normal Top (Pair)',
        basePrice: 36500,
        rawMinus: 11500, // 36500 - 25000 = 11500
        speakers: [
          { name: 'JBL 2226 H (VC 4" - 1600W) & 450 Hice', price: 78500 },
          { name: 'RCF 15 lf 400H (VC 4" - 1800W) & 450 Hice', price: 95000 },
          { name: 'RCF lf 401 (VC 4" - 1600W) & 450 Hice', price: 86500 },
          { name: 'B&C TBW 100 (VC 4" - 2000W) & 450 Hice', price: 95000 },
          { name: 'Eminence KP 15A (VC 3" - 500W) & 450 Hice', price: 60000 }
        ]
      },
      {
        id: 'norm-12',
        name: '12" Normal Top (Pair)',
        basePrice: 32500,
        rawMinus: 8000, // 32500 - 24500 = 8000
        speakers: [
          { name: 'RCF 12X351 (VC 3" - 900W) 350 Hice', price: 69500 },
          { name: 'B&C 12EAU-20 (VC 3" - 450W) 350 Hice', price: 66500 },
          { name: 'RCF lf 12G301 (VC 3" - 900W) 350 Hice', price: 69500 }
        ]
      }
    ]
  },
  {
    category: 'Bass Bin (Single 18")',
    paintDeduction: 2500,
    note: '⭕️ Complete With: Handle, Net, Filter Net, Back Plate, Pole Mount Socket, Badge & Texture Paint',
    models: [
      {
        id: 'jbl-718',
        name: 'JBL 718 (Pair)',
        basePrice: 62500,
        rawMinus: 8900, // 62500 - 53600 = 8900
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 120000 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 115000 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 127000 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 139500 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 120000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 119500 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 135000 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 162500 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 145500 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 137500 }
        ]
      },
      {
        id: 'rcf-18-open',
        name: 'RCF 18 Open Bin (Pair)',
        basePrice: 62500,
        rawMinus: 8900,
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 120000 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 115000 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 127000 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 139500 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 120000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 119500 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 135000 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 162500 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 145500 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 137500 }
        ]
      }
    ]
  },
  {
    category: 'Double Bass Bin (18")',
    paintDeduction: 2500,
    note: '⭕️ Complete With: Handle, Net, Filter Net, Back Plate, Pole Mount Socket, Badge & Texture Paint',
    models: [
      {
        id: 'jbl-728',
        name: 'JBL 728 Double Bin (Pair)',
        basePrice: 90000,
        rawMinus: 14500,
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 219500 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 219500 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 240000 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 270500 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 220000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 218000 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 225000 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 276500 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 246000 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 228000 }
        ]
      },
      {
        id: 'rcf-dbin',
        name: 'RCF Double Bin (Pair)',
        basePrice: 90000,
        rawMinus: 14500,
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 219500 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 219500 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 240000 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 270500 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 220000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 218000 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 225000 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 276500 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 246000 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 228000 }
        ]
      },
      {
        id: 'srx-928',
        name: 'SRX 928 Double Bin (Pair)',
        basePrice: 100000,
        rawMinus: 14500,
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 219500 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 219500 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 240000 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 270500 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 220000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 218000 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 225000 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 276500 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 246000 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 228000 }
        ]
      }
    ]
  },
  {
    category: 'W Bin',
    paintDeduction: 2500,
    note: '⭕️ Complete With: Handle, Net, Filter Net, Back Plate, Pole Mount Socket, Badge & Texture Paint',
    models: [
      {
        id: 'w-bin',
        name: 'W Bin (Pair)',
        basePrice: 88500,
        rawMinus: 8500,
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 151000 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 151000 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 162500 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 166000 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 151000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 148000 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 166500 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 190000 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 175500 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 186500 }
        ]
      }
    ]
  },
  {
    category: 'Cerwin Vega',
    paintDeduction: 2500,
    note: '⭕️ Complete With: Handle, Back Plate, Pole Mount Socket, Badge & Texture Paint (No Grills required)',
    models: [
      {
        id: 'cerwin-vega',
        name: 'Cerwin Vega (Pair)',
        basePrice: 95000,
        rawMinus: 7500,
        speakers: [
          { name: 'RCF lf 401 (VC 4" - 1600W)', price: 161000 },
          { name: 'RCF lf 400 (VC 4" - 1600W)', price: 161000 },
          { name: 'RCF lf 18x401H (VC 4" - 2000W)', price: 172000 },
          { name: 'RCF lf 451 (VC 4" - 2500W)', price: 176000 },
          { name: 'JBL 2246 (VC 4" - 1600W)', price: 161000 },
          { name: 'B&C 18TBX100 (VC 4" - 1500W)', price: 158000 },
          { name: 'PD 1880H (VC 5" - 2000W-5000W)', price: 176500 },
          { name: 'PD 1852H (VC 5" - 3000W-5000W)', price: 200000 },
          { name: 'PD 1882 (VC 5" - 2500W-5000W)', price: 185500 },
          { name: 'PD 1852 (VC 5" - 2000W-5000W)', price: 196500 }
        ]
      }
    ]
  },
  {
    category: 'Line Array',
    paintDeduction: 1500,
    isLineArray: true,
    note: '⭕️ Complete Box Only WITHOUT Line Array Rigging System (With Handles, Net, Filter Net, Hice Cone, Back Plate & Texture Paint)',
    models: [
      {
        id: 'la-12-st',
        name: '12" Single Top (Pair)',
        basePrice: 38500,
        rawMinus: 0,
        speakers: [
          { name: 'RCF 12X351 (VC 3" - 900W) 750 Hice', price: 71000 },
          { name: 'B&C 12EAU-20 (VC 3" - 450W) 750 Hice', price: 74000 },
          { name: 'RCF lf 12G301 (VC 3" - 900W) 750 Hice', price: 75000 },
          { name: 'B&C 12BC-8Y (VC 3" - 600W) 750 Hice', price: 77000 },
          { name: 'B&C 12ND-75Y (VC 3" - 600W) 750 Hice', price: 89000 }
        ]
      },
      {
        id: 'la-12-dt',
        name: '12" Double Top (Pair)',
        basePrice: 45000,
        rawMinus: 0,
        speakers: [
          { name: 'RCF 12X351 (VC 3" - 900W) 750 Hice', price: 107000 },
          { name: 'B&C 12EAU-20 (VC 3" - 450W) 750 Hice', price: 105000 },
          { name: 'RCF lf 12G301 (VC 3" - 900W) 750 Hice', price: 107000 },
          { name: 'B&C 12BC-8Y (VC 3" - 600W) 750 Hice', price: 112000 },
          { name: 'B&C 12ND-75Y (VC 3" - 600W) 750 Hice', price: 135000 }
        ]
      },
      {
        id: 'la-10-st',
        name: '10" Single Top (Pair)',
        basePrice: 30000,
        rawMinus: 0,
        speakers: [
          { name: 'B&C 10EAU - 20 (VC 2.5" - 350W) 450 Hice', price: 61000 },
          { name: 'B&C LY-10 750 (VC 3" - 600W) 450 Hice', price: 62500 },
          { name: 'B&C 10ND-75Y (VC 3" - 600W) 450 Hice', price: 72500 }
        ]
      },
      {
        id: 'la-10-dt',
        name: '10" Double Empty Top (Pair)',
        basePrice: 40000,
        rawMinus: 0,
        speakers: [
          { name: 'B&C 10 EAU - 20 (VC 2.5" - 350W) 450 Hice', price: 88500 },
          { name: 'B&C LY-10 750 (VC 3" - 600W) 450 Hice', price: 92500 },
          { name: 'B&C 10ND-75Y (VC 3" - 600W) 450 Hice', price: 112500 }
        ]
      },
      {
        id: 'la-8-st',
        name: '8" Single Top (Pair)',
        basePrice: 25500,
        rawMinus: 0,
        speakers: [
          { name: 'B&C 8 EAU-630 (VC 2" - 250W) 350 Hice', price: 51000 }
        ]
      },
      {
        id: 'la-8-dt',
        name: '8" Double Top (Pair)',
        basePrice: 30500,
        rawMinus: 0,
        speakers: [
          { name: 'B&C 8 EAU-630 (VC 2" - 250W) 350 Hice', price: 71000 }
        ]
      }
    ]
  }
];

export default function CustomOrderCalculator({ isOpen = true }: CustomOrderCalculatorProps) {
  const [selectedCatIdx, setSelectedCatIdx] = useState<number>(0);
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(0);
  const [configType, setConfigType] = useState<'empty' | 'speaker'>('empty');
  const [selectedSpeakerIdx, setSelectedSpeakerIdx] = useState<number>(0);
  const [includePaint, setIncludePaint] = useState<boolean>(true);
  const [includeHardware, setIncludeHardware] = useState<boolean>(true);

  if (!isOpen) return null;

  const activeCategory = CALCULATOR_DATA[selectedCatIdx];
  const activeModel = activeCategory.models[selectedModelIdx] || activeCategory.models[0];

  // Price Calculation Logic
  let calculatedPrice = 0;

  if (configType === 'speaker') {
    const selSpeaker = activeModel.speakers[selectedSpeakerIdx] || activeModel.speakers[0];
    calculatedPrice = selSpeaker ? selSpeaker.price : activeModel.basePrice;
    if (!includePaint) {
      calculatedPrice -= activeCategory.paintDeduction;
    }
  } else {
    // Empty Box Configuration
    calculatedPrice = activeModel.basePrice;
    if (!includeHardware && !activeCategory.isLineArray) {
      calculatedPrice -= activeModel.rawMinus;
    }
    if (!includePaint) {
      calculatedPrice -= activeCategory.paintDeduction;
    }
  }

  const handleCategoryChange = (idx: number) => {
    setSelectedCatIdx(idx);
    setSelectedModelIdx(0);
    setSelectedSpeakerIdx(0);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi K.M SOUNDS,\nI would like to order / get info on:\n- Category: ${activeCategory.category}\n- Model: ${activeModel.name}\n- Setup: ${configType === 'speaker' ? 'Loaded With Speakers' : 'Empty Box'}\n${configType === 'speaker' && activeModel.speakers[selectedSpeakerIdx] ? `- Speaker Option: ${activeModel.speakers[selectedSpeakerIdx].name}\n` : ''}- Texture Paint: ${includePaint ? 'Yes' : 'No'}\n${configType === 'empty' ? `- Grills & Hardware: ${includeHardware ? 'Yes (Complete)' : 'No (Raw Box)'}\n` : ''}- Total Estimate (Pair 2): LKR ${calculatedPrice.toLocaleString()}`
  );

  return (
    <div className="w-full max-w-7xl mx-auto my-6 bg-slate-900/95 border border-cyan-500/40 rounded-3xl p-4 sm:p-8 shadow-[0_0_60px_rgba(6,182,212,0.2)] text-white font-sans">
      
      {/* Top Header */}
      <div className="mb-6 border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          INSTANT BAFFLE CALCULATOR
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
          K.M SOUNDS Baffle Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          බෆල් ජෝඩුවට (Pair 2) අදාළ Category එක, Setup එක සහ Customization තෝරා ක්ෂණික ගණන බලාගන්න.
        </p>
      </div>

      {/* Category Tabs (Scrollable on Mobile) */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin scrollbar-thumb-cyan-500/30">
        {CALCULATOR_DATA.map((cat, idx) => (
          <button
            key={cat.category}
            onClick={() => handleCategoryChange(idx)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
              selectedCatIdx === idx
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-cyan-500/50'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Controls & Right Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Select Model */}
          <div>
            <label className="block text-cyan-400 text-xs font-black tracking-wider uppercase mb-2">
              1. Select Model
            </label>
            <select
              value={selectedModelIdx}
              onChange={(e) => {
                setSelectedModelIdx(Number(e.target.value));
                setSelectedSpeakerIdx(0);
              }}
              className="w-full bg-slate-800/90 border border-slate-700 text-white font-bold text-sm sm:text-base rounded-xl p-3 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {activeCategory.models.map((mod, idx) => (
                <option key={mod.id} value={idx}>
                  {mod.name} - Complete Empty: LKR {mod.basePrice.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Configuration Type */}
          <div>
            <label className="block text-cyan-400 text-xs font-black tracking-wider uppercase mb-2">
              2. Configuration Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfigType('empty')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  configType === 'empty'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                📦 Empty Box Pair
              </button>
              <button
                type="button"
                onClick={() => setConfigType('speaker')}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  configType === 'speaker'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}
              >
                🔊 Loaded With Speakers
              </button>
            </div>
          </div>

          {/* 3. Speaker Option Selection */}
          {configType === 'speaker' && (
            <div>
              <label className="block text-cyan-400 text-xs font-black tracking-wider uppercase mb-2">
                3. Select Speaker Option
              </label>
              <select
                value={selectedSpeakerIdx}
                onChange={(e) => setSelectedSpeakerIdx(Number(e.target.value))}
                className="w-full bg-slate-800/90 border border-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl p-3 focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                {activeModel.speakers.map((spk, idx) => (
                  <option key={idx} value={idx}>
                    {spk.name} - LKR {spk.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* 4. Finish & Customization */}
          <div>
            <label className="block text-cyan-400 text-xs font-black tracking-wider uppercase mb-2">
              {configType === 'speaker' ? '3. Finish Options' : '3. Finish & Hardware Customization'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-all">
                <input
                  type="checkbox"
                  checked={includePaint}
                  onChange={(e) => setIncludePaint(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-medium text-slate-200">
                  Texture Paint Finish
                </span>
              </label>

              {configType === 'empty' && !activeCategory.isLineArray && (
                <label className="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-700 rounded-xl cursor-pointer hover:border-cyan-500/50 transition-all">
                  <input
                    type="checkbox"
                    checked={includeHardware}
                    onChange={(e) => setIncludeHardware(e.target.checked)}
                    className="w-4 h-4 accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm font-medium text-slate-200">
                    Grills, Handles & Plates
                  </span>
                </label>
              )}
            </div>
          </div>

          {activeCategory.isLineArray && (
            <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-start gap-2.5 text-cyan-300 text-xs">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                ලයින් ඇරේ එකේ වෙනස්කම් (Customizations) අවශ්‍ය නම් කෙලින්ම WhatsApp හරහා සම්බන්ධ වන්න.
              </span>
            </div>
          )}

        </div>

        {/* Right Column: Selected Build Summary */}
        <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 border-b border-slate-700 pb-2 mb-4">
              SELECTED BUILD SUMMARY
            </h3>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">MODEL</span>
                <span className="font-extrabold text-cyan-300">{activeModel.name}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase">BUILD TYPE</span>
                <span className="font-bold text-white">
                  {configType === 'speaker' ? 'Loaded With Speakers' : 'Empty Box'}
                </span>
              </div>

              {configType === 'speaker' && activeModel.speakers[selectedSpeakerIdx] && (
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">SELECTED SPEAKER</span>
                  <span className="font-medium text-emerald-400">
                    {activeModel.speakers[selectedSpeakerIdx].name}
                  </span>
                </div>
              )}

              {/* Specifications Box */}
              <div className="p-3 bg-slate-900/80 border border-slate-700 rounded-xl text-[11px] text-slate-300 space-y-1 mt-2">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Specifications</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  {activeCategory.note}
                </p>
              </div>
            </div>
          </div>

          {/* Price & Order Action */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              TOTAL ESTIMATED PRICE (1 PAIR / 2 BAFFLES)
            </span>
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 my-1">
              LKR {calculatedPrice.toLocaleString()}
            </div>

            <a
              href={`https://wa.me/94751513131?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform active:scale-95 text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-black" />
              Order / Customize via WhatsApp
            </a>
          </div>

        </div>

        {/* CUSTOM ORDER & ENCLOSURE ADVISORY FOOTER (Full width on Desktop / Laptop) */}
        <div className="lg:col-span-12 mt-2 p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            <span>K.M SOUNDS • Cabinet Construction & Acoustic Advisory</span>
          </div>
          <p className="leading-relaxed text-slate-400">
            <strong>වගකීම් ප්‍රකාශනය:</strong> මෙහි දැක්වෙන ගණනය කිරීම් සහ මිල ගණන් ඔබේ Custom Specification (Cabinet Design, Malaysian Plywood Thickness, Tuning Frequency, Horn Flare Specs) අනුව වෙනස් විය හැක. නිවැරදිම Enclosure Volume එක සහ Port Tuning එක ලබාගැනීමට Order එක Confirm කිරීමට පෙර අපගේ Audio Craftsmanship කණ්ඩායම සමඟ සාකච්ඡා කරන්න.
            <br /><br />
            <strong>Disclaimer:</strong> Calculations and estimations shown are based on standard enclosure parameters. Final pricing and internal volume tuning may vary based on exact timber grade, custom bracing, and driver Thiele-Small (T/S) parameters. Please confirm exact specs with our engineering team prior to production.
          </p>
        </div>

      </div>

    </div>
  );
}