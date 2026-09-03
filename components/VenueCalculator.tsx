"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, Disc, Volume2, Send, Sliders, Cpu, ShieldAlert, 
  Printer, Layers, Activity, Gauge, BatteryCharging, Radio 
} from "lucide-react";

type VenueMode = 
  | "indoor_hall" 
  | "indoor_canopy" 
  | "outdoor_ground" 
  | "outdoor_canopy" 
  | "stadium_open" 
  | "stadium_covered";

type GenreType = "edm" | "band" | "speech";
type ArrayModeType = "stereo" | "cardioid" | "center";

export default function VenueCalculator() {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // 1. Input States
  const [venueMode, setVenueMode] = useState<VenueMode>("outdoor_ground");
  const [audience, setAudience] = useState<number>(1500);
  const [genre, setGenre] = useState<GenreType>("band");
  const [arrayMode, setArrayMode] = useState<ArrayModeType>("stereo");
  const [tempC, setTempC] = useState<number>(30);

  const pdfExportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Real-World Audio Engineering Engine
  const calculateSetup = () => {
    let wattsPerPerson = 3.5;
    let lossFactor = 1.35;
    let boundaryGainDb = 0.0;
    let isLargeScale = audience >= 800;

    switch (venueMode) {
      case "indoor_hall":
        wattsPerPerson = 2.0;
        lossFactor = 1.0;
        boundaryGainDb = 4.5;
        break;
      case "indoor_canopy":
        wattsPerPerson = 2.0;
        lossFactor = 1.15;
        boundaryGainDb = 2.0;
        break;
      case "outdoor_ground":
        wattsPerPerson = 3.5;
        lossFactor = 1.35;
        boundaryGainDb = 0.0;
        break;
      case "outdoor_canopy":
        wattsPerPerson = 3.5;
        lossFactor = 1.15;
        boundaryGainDb = 2.0;
        break;
      case "stadium_open":
        wattsPerPerson = 5.0;
        lossFactor = 1.35;
        boundaryGainDb = 0.0;
        isLargeScale = true;
        break;
      case "stadium_covered":
        wattsPerPerson = 5.0;
        lossFactor = 1.15;
        boundaryGainDb = 2.0;
        isLargeScale = true;
        break;
    }

    const targetWatts = Math.round(audience * wattsPerPerson * lossFactor);

    let subRatio = 0.60;
    let topRatio = 0.40;
    if (genre === "edm") { subRatio = 0.70; topRatio = 0.30; }
    if (genre === "speech") { subRatio = 0.40; topRatio = 0.60; }

    const targetSubPower = targetWatts * subRatio;
    const targetTopPower = targetWatts * topRatio;

    const wattsPerSubBox = isLargeScale ? 1600 : 800;
    const wattsPerTopBox = isLargeScale ? 1200 : 600;

    let rawSubCount = Math.ceil(targetSubPower / wattsPerSubBox);
    let rawTopCount = Math.ceil(targetTopPower / wattsPerTopBox);

    let subCount = rawSubCount % 2 === 0 ? rawSubCount : rawSubCount + 1;
    let topCount = rawTopCount % 2 === 0 ? rawTopCount : rawTopCount + 1;

    subCount = Math.max(2, subCount);
    topCount = Math.max(2, topCount);

    let cardioidRearSubs = 0;
    if (arrayMode === "cardioid") {
      const rawRear = Math.ceil(subCount / 3);
      cardioidRearSubs = rawRear % 2 === 0 ? Math.max(2, rawRear) : rawRear + 1;
    }

    const totalPhysicalSubBoxes = subCount + cardioidRearSubs;

    const actualSubPower = totalPhysicalSubBoxes * wattsPerSubBox;
    const actualTopPower = topCount * wattsPerTopBox;
    const totalWatts = actualSubPower + actualTopPower;

    let subModel = "SRX 718 Single 18″ Sub (800W RMS)";
    let topModel = "SRX 715 Single 15″ Top (600W RMS)";
    let systemImpedance = "4-Ohms Nominal per Amp Channel (Parallel Pair)";

    if (isLargeScale) {
      subModel = "RCF / SRX Dual 18″ Heavy Bass Bins (1600W RMS)";
      topModel = "SRX 725 Dual 15″ High-Power Tops (1200W RMS)";
      systemImpedance = "2-Ohms / 4-Ohms Stable Heavy Amp Rack";
    }

    const ampEfficiency = 0.85;
    const electricalInputWatts = totalWatts / ampEfficiency;
    const mainsVoltage = 230;

    const peakCurrentAmps = Number((electricalInputWatts / mainsVoltage).toFixed(1));
    const continuousCurrentAmps = Number((peakCurrentAmps * 0.25).toFixed(1));

    const generatorKVA = Number(((electricalInputWatts * 1.25) / (1000 * 0.8)).toFixed(1));

    const speedOfSound = Number((331.4 + 0.6 * tempC).toFixed(1));
    const subToTopDelayMs = Number(((0.85 / speedOfSound) * 1000).toFixed(2));

    const baseSensitivity = isLargeScale ? 102 : 98;
    const maxSpl1m = baseSensitivity + 10 * Math.log10(totalWatts);
    const splAt15m = Number((maxSpl1m - 20 * Math.log10(15) + boundaryGainDb).toFixed(1));

    const subWeightKg = isLargeScale ? 68 : 38;
    const topWeightKg = isLargeScale ? 52 : 27;
    const totalWeightKg = totalPhysicalSubBoxes * subWeightKg + topCount * topWeightKg;

    let cableGauge = "2.5mm² (13 AWG) Speakon Core";
    if (totalWatts > 4000 && totalWatts <= 10000) cableGauge = "4.0mm² (11 AWG) Speakon Heavy Core";
    if (totalWatts > 10000) cableGauge = "6.0mm² (9 AWG) Ultra Heavy Speakon Core";

    return {
      totalWatts,
      subPower: actualSubPower,
      topPower: actualTopPower,
      subCount,
      topCount,
      cardioidRearSubs,
      totalPhysicalSubBoxes,
      isLargeScale,
      subModel,
      topModel,
      systemImpedance,
      continuousCurrentAmps,
      peakCurrentAmps,
      generatorKVA,
      speedOfSound,
      subToTopDelayMs,
      splAt15m,
      totalWeightKg,
      cableGauge,
    };
  };

  const result = calculateSetup();

  // 3. Ultra-Compressed Mobile-Optimized PDF Engine
  const handleDownloadPDF = async () => {
    if (typeof window !== "undefined" && pdfExportRef.current) {
      const element = pdfExportRef.current;

      try {
        const { toJpeg } = await import("html-to-image");
        const { jsPDF } = await import("jspdf");

        // Force element to fixed desktop layout temporarily for high quality capture
        const originalWidth = element.style.width;
        element.style.width = "1024px";

        const dataUrl = await toJpeg(element, {
          quality: 0.85,
          pixelRatio: 2,
          filter: (node) => {
            if (node instanceof HTMLElement && node.classList.contains("print:hidden")) {
              return false;
            }
            return true;
          },
        });

        // Restore original width for mobile UI display
        element.style.width = originalWidth;

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
          compress: true
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(dataUrl);
        const calculatedImgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Render perfectly fitting height to avoid clipping on A4
        const renderHeight = Math.min(calculatedImgHeight, pdfHeight);

        // 1. Add Spec Sheet Image
        pdf.addImage(dataUrl, "JPEG", 0, 0, pdfWidth, renderHeight, undefined, "FAST");

        // 2. Add PDF-Only Subtle Watermark (Direct Canvas Render)
        const centerX = pdfWidth / 2;
        const centerY = pdfHeight / 2;

        pdf.saveGraphicsState();
        pdf.setGState((pdf as any).GState({ opacity: 0.10 }));
        pdf.setTextColor(16, 185, 129); // Emerald Green RGB
        
        // Title Line
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(36);
        pdf.text("K.M SOUNDS", centerX, centerY - 5, {
          align: "center",
          angle: 45
        });

        // Subtitle Line
        pdf.setFontSize(12);
        pdf.text("FEEL THE POWER • HEAR THE QUALITY", centerX, centerY + 10, {
          align: "center",
          angle: 45
        });
        pdf.restoreGraphicsState();

        pdf.save(`KM_SOUNDS_Spec_Sheet_${audience}_People.pdf`);
      } catch (err) {
        console.error("PDF Direct Download Error:", err);
      }
    }
  };

  const handleWhatsAppQuote = () => {
    const extraSubs = result.cardioidRearSubs > 0 
      ? ` (+${result.cardioidRearSubs} Rear Cardioid Reversal Bins)` 
      : "";

    const msg = `Hi K.M SOUNDS! Custom Audio Engineering Spec Sheet:\n` +
      `- Venue Mode: ${venueMode.toUpperCase()} | Audience: ${audience}\n` +
      `- Setup Mode: ${arrayMode.toUpperCase()} | Genre Profile: ${genre.toUpperCase()}\n` +
      `- Actual System RMS: ${result.totalWatts.toLocaleString()}W RMS\n` +
      `- Subwoofers: ${result.subCount}x ${result.subModel}${extraSubs} [${result.subPower.toLocaleString()}W]\n` +
      `- Tops: ${result.topCount}x ${result.topModel} [${result.topPower.toLocaleString()}W]\n` +
      `- Electrical Draw: ${result.continuousCurrentAmps}A Continuous (${result.peakCurrentAmps}A Peak) @ 230V\n` +
      `- Required Generator: ${result.generatorKVA} kVA (Real-World Safe Load)\n` +
      `- Total Gear Weight: ${result.totalWeightKg} kg\n\n` +
      `Please provide a formal quote for this cabinet configuration!`;

    window.open(
      `https://wa.me/94751513131?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  if (!isMounted) {
    return <div className="max-w-6xl mx-auto p-8 rounded-3xl bg-slate-900/80 border border-emerald-500/30 text-white my-6 min-h-[600px]" />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-emerald-500/30 shadow-[0_0_60px_rgba(16,185,129,0.15)] text-white my-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-500/20 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Sliders className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
              Pro Audio Engineering Calculator
            </h1>
            <p className="text-slate-400 text-xs md:text-sm">
              K.M SOUNDS • Real-Time Acoustic, Electrical & System Array Analytics Engine ...පහලින් බලන්න..
            </p>
          </div>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all shadow-md self-start md:self-auto cursor-pointer"
        >
          <Printer className="w-4 h-4" /> Download Spec Sheet (PDF)
        </button>
      </div>

      {/* PDF EXPORT WRAPPER */}
      <div ref={pdfExportRef} className="p-2 relative overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* LEFT PANEL: INPUT CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                <Radio className="w-4 h-4" /> 1. Venue & Acoustic Environment (Select One)
              </label>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  { id: "indoor_hall", label: "Indoor Hall", desc: "Acoustic Enclosed (+4.5dB)" },
                  { id: "indoor_canopy", label: "Indoor Marquee", desc: "Semi-Enclosed (+2.0dB)" },
                  { id: "outdoor_ground", label: "Outdoor Show", desc: "Open Ground Freefield" },
                  { id: "outdoor_canopy", label: "Outdoor Tent", desc: "Canopy Covered (+2.0dB)" },
                  { id: "stadium_open", label: "Stadium Open", desc: "High Power Freefield" },
                  { id: "stadium_covered", label: "Stadium Arena", desc: "Covered Grandstand (+2dB)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setVenueMode(item.id as VenueMode)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      venueMode === item.id
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-xs font-bold">{item.label}</span>
                    <span className="text-[10px] text-slate-500 mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-slate-400">Target Audience Capacity:</span>
                  <span className="text-emerald-400 font-black text-base px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                    {audience.toLocaleString()} People
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={audience}
                  onChange={(e) => setAudience(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer bg-slate-800 rounded-lg h-2"
                />
              </div>
            </div>

            <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800 space-y-4">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                <Activity className="w-4 h-4" /> 2. Audio Profile & Sub Array Layout
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[11px] text-slate-400 mb-1.5">Genre Tuning Profile:</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: "band", label: "Live Band / Musical Show" },
                      { id: "edm", label: "DJ / EDM / Heavy Bass" },
                      { id: "speech", label: "Corporate / Speech" },
                    ].map((g) => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setGenre(g.id as GenreType)}
                        className={`py-2 px-3 text-left text-xs rounded-lg border cursor-pointer ${
                          genre === g.id
                            ? "bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] text-slate-400 mb-1.5">Subwoofer Array Layout:</span>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: "stereo", label: "Left / Right Stack" },
                      { id: "cardioid", label: "Cardioid Array (Rear Rejection)" },
                      { id: "center", label: "Center Mono Block" },
                    ].map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setArrayMode(a.id as ArrayModeType)}
                        className={`py-2 px-3 text-left text-xs rounded-lg border cursor-pointer ${
                          arrayMode === a.id
                            ? "bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-400"
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
  <span className="text-slate-400">
    Ambient Air Temp (°C) for DSP Speed of Sound Math:
  </span>
  <div className="flex items-center gap-2 self-start sm:self-auto">
    {/* Minus Button */}
    <button
      type="button"
      onClick={() => setTempC((prev) => Math.max(15, prev - 1))}
      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold text-lg active:scale-95 transition-all flex items-center justify-center cursor-pointer hover:bg-slate-800"
    >
      -
    </button>

    {/* Input Field */}
    <input
      type="number"
      inputMode="numeric"
      min="15"
      max="45"
      value={tempC}
      onChange={(e) => setTempC(Number(e.target.value))}
      className="w-16 h-10 bg-slate-900 border border-slate-700 rounded-xl text-center text-emerald-400 font-bold text-base focus:border-emerald-400 outline-none"
    />

    {/* Plus Button */}
    <button
      type="button"
      onClick={() => setTempC((prev) => Math.min(45, prev + 1))}
      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold text-lg active:scale-95 transition-all flex items-center justify-center cursor-pointer hover:bg-slate-800"
    >
      +
    </button>
    <span className="text-slate-400 font-bold ml-1">°C</span>
  </div>
</div>
</div>

            <div className="bg-slate-950/70 p-5 rounded-2xl border border-emerald-500/20">
              <span className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Dynamic Stage Rig Representation
              </span>

              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex items-end justify-between min-h-[140px]">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-emerald-400/80 font-mono">LEFT STACK</span>
                  <div className="flex flex-col gap-1 items-center">
                    {Array.from({ length: Math.ceil(result.topCount / 2) }).map((_, i) => (
                      <div key={`left-top-${i}`} className="w-12 h-6 bg-emerald-950 border border-emerald-400/60 rounded flex items-center justify-center text-[9px] text-emerald-300 font-mono shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                        TOP 15″
                      </div>
                    ))}
                    {Array.from({ length: Math.ceil(result.subCount / 2) }).map((_, i) => (
                      <div key={`left-sub-${i}`} className="w-16 h-8 bg-slate-800 border border-slate-600 rounded flex items-center justify-center text-[9px] text-slate-300 font-mono">
                        SUB 18″
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 py-2 px-3 rounded bg-slate-950/80 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">STAGE CENTER</span>
                  {arrayMode === "cardioid" && (
                    <div className="flex flex-col items-center gap-1 mt-1">
                      <span className="text-[9px] text-amber-400 font-mono font-bold">
                        Cardioid Reversal ({result.cardioidRearSubs} Bins 180° Inverted)
                      </span>
                      <div className="flex gap-1">
                        {Array.from({ length: result.cardioidRearSubs }).map((_, i) => (
                          <div key={`rear-sub-${i}`} className="w-10 h-6 bg-amber-950/80 border border-amber-500/60 rounded flex items-center justify-center text-[8px] text-amber-300 font-mono">
                            REAR 18″
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {arrayMode === "center" && (
                    <span className="text-[9px] text-emerald-400 mt-1 font-mono">
                      Coupled Center Sub Array
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-emerald-400/80 font-mono">RIGHT STACK</span>
                  <div className="flex flex-col gap-1 items-center">
                    {Array.from({ length: Math.ceil(result.topCount / 2) }).map((_, i) => (
                      <div key={`right-top-${i}`} className="w-12 h-6 bg-emerald-950 border border-emerald-400/60 rounded flex items-center justify-center text-[9px] text-emerald-300 font-mono shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                        TOP 15″
                      </div>
                    ))}
                    {Array.from({ length: Math.ceil(result.subCount / 2) }).map((_, i) => (
                      <div key={`right-sub-${i}`} className="w-16 h-8 bg-slate-800 border border-slate-600 rounded flex items-center justify-center text-[9px] text-slate-300 font-mono">
                        SUB 18″
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: CALCULATED SPECS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 p-6 rounded-2xl shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Live Acoustic Calculations
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  VERIFIED MATH
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold">Actual System Power:</span>
                <span className="text-2xl font-black text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]">
                  {result.totalWatts.toLocaleString()}W RMS
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <Disc className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">Subwoofer Enclosures ({result.subPower.toLocaleString()}W RMS):</span>
                    <strong className="text-white text-sm">{result.subCount}× {result.subModel}</strong>
                    {result.cardioidRearSubs > 0 && (
                      <span className="block text-[10px] text-amber-400 mt-0.5 font-semibold">
                        + {result.cardioidRearSubs}× Cardioid Reversal Bins (Inverted Phase)
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px]">High/Mid Top Cabinets ({result.topPower.toLocaleString()}W RMS):</span>
                    <strong className="text-white text-sm">{result.topCount}× {result.topModel}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" /> Current Draw:
                  </div>
                  <div className="text-emerald-300 font-bold text-xs">
                    {result.continuousCurrentAmps}A Cont. <span className="text-slate-500">({result.peakCurrentAmps}A Peak)</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Req. Generator:
                  </div>
                  <div className="text-emerald-400 font-bold text-sm">{result.generatorKVA} kVA (Real Safe)</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Radio className="w-3.5 h-3.5 text-emerald-400" /> Est. SPL @ 15m:
                  </div>
                  <div className="text-emerald-300 font-bold text-sm">{result.splAt15m} dB SPL</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Sub/Top DSP Delay:
                  </div>
                  <div className="text-emerald-300 font-bold text-sm">{result.subToTopDelayMs} ms</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-[11px] space-y-1.5 text-slate-300">
                <p><strong>Min Speakon Core:</strong> {result.cableGauge}</p>
                <p><strong>System Load:</strong> {result.systemImpedance}</p>
                <p><strong>Gear Weight:</strong> ~{result.totalWeightKg} kg (Rigging Safe)</p>
                <p className="text-slate-400"><strong>Speed of Sound (v):</strong> {result.speedOfSound} m/s @ {tempC}°C</p>
              </div>

              <button
                onClick={handleWhatsAppQuote}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer print:hidden"
              >
                <Send className="w-4 h-4" /> Request Quote on WhatsApp
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* ADVISORY FOOTER */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>Pro-Audio Sound Engineering Advisory</span>
        </div>
        <p className="leading-relaxed text-slate-400">
          <strong>වගකීම් ප්‍රකාශනය:</strong> මෙහි දැක්වෙන දත්තයන් AI තාක්ෂණය ඔස්සේ ලබාදෙන දළ ඇස්තමේන්තුවක් පමණි. ස්ථානයේ ස්වභාවය සහ Acoustic වෙනස්කම් අනුව සැබෑ අවශ්‍යතාවය වෙනස් විය හැකි බැවින්, ඔබගේ Event එක සඳහා සුදුසුම Sound System එක තෝරාගැනීමට වෘත්තීය සවුන්ඩ් ඉංජිනේරුවරයෙකු හමුවී උපදෙස් ලබාගන්න.
          <br /><br />
          <strong>Disclaimer:</strong> The data provided here is a general estimate powered by AI technology. Actual system requirements may vary based on venue acoustics and environmental factors. Please consult a professional sound engineer to determine the exact setup for your event.
        </p>
      </div>

    </div>
  );
}