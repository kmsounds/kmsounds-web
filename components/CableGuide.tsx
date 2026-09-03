"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPlug,
  FaVolumeUp,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
  FaHome,
} from "react-icons/fa";

interface CableGuideProps {
  onClose?: () => void;
}

export default function CableGuide({ onClose }: CableGuideProps) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"power" | "speaker">("power");

  // Power Cable Controls
  const [watts, setWatts] = useState<number | "">(3000);
  const [distance, setDistance] = useState<number | "">(25);
  const [gauge, setGauge] = useState<number>(2.5);

  // Speaker Cable Controls
  const [spkWatts, setSpkWatts] = useState<number | "">(1000);
  const [spkOhms, setSpkOhms] = useState<number>(4);
  const [spkDistance, setSpkDistance] = useState<number | "">(15);
  const [spkGauge, setSpkGauge] = useState<number>(2.5);

  // Hydration Error මඟහැරීමට Browser load වූ පසු active කිරීම
  useEffect(() => {
    setMounted(true);
  }, []);

  // Copper Resistivity at ~50°C (Real-world Stage/Audio cable operating temp)
  const COPPER_RES = 0.0195; // Ohm-mm²/m

  // Safe Number Converters
  const numWatts = typeof watts === "number" ? watts : 0;
  const numDistance = typeof distance === "number" ? distance : 0;
  const numSpkWatts = typeof spkWatts === "number" ? spkWatts : 0;
  const numSpkDistance = typeof spkDistance === "number" ? spkDistance : 0;

  // --- POWER CALCULATIONS ---
  const current = numWatts > 0 ? numWatts / 230 : 0;
  const powerResistance = gauge > 0 ? (2 * numDistance * COPPER_RES) / gauge : 0;
  const vDrop = current * powerResistance;
  const dropPct = (vDrop / 230) * 100;
  const remVoltage = Math.max(0, 230 - vDrop);

  // --- SPEAKER CALCULATIONS ---
  const spkResistance = gauge > 0 ? (2 * numSpkDistance * COPPER_RES) / spkGauge : 0;
  const spkLossPct =
    spkOhms > 0 ? (spkResistance / (spkResistance + spkOhms)) * 100 : 0;
  const spkLostWatts = (numSpkWatts * spkLossPct) / 100;
  const spkDelivered = Math.max(0, numSpkWatts - spkLostWatts);
  const effectiveDF = 400 / (1 + 400 * (spkResistance / spkOhms));

  if (!mounted) {
    return null; // Hydration mismatch වැළැක්වීම සඳහා
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 sm:p-8 bg-slate-900/95 border border-slate-800 backdrop-blur-2xl rounded-3xl shadow-2xl text-white">
      {/* Top Header Navigation Bar (Home & Close Buttons) */}
      <div className="flex items-center justify-between mb-6">
        {/* Back to Home Button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all shadow-md"
        >
          <FaHome className="text-cyan-400 text-sm sm:text-base" />
          <span>Back to Home</span>
        </Link>

        {/* Close Button */}
        {onClose ? (
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 sm:p-2.5 bg-slate-800/80 hover:bg-red-500/20 border border-slate-700/60 hover:border-red-500/40 rounded-xl text-slate-400 hover:text-red-400 transition-all shadow-md"
          >
            <FaTimes className="text-base sm:text-lg" />
          </button>
        ) : (
          <Link
            href="/"
            aria-label="Close"
            className="p-2 sm:p-2.5 bg-slate-800/80 hover:bg-red-500/20 border border-slate-700/60 hover:border-red-500/40 rounded-xl text-slate-400 hover:text-red-400 transition-all shadow-md"
          >
            <FaTimes className="text-base sm:text-lg" />
          </Link>
        )}
      </div>

      {/* Title Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-4xl font-black tracking-wide">
          🎛️ Pro Audio <span className="text-cyan-400">Cable Spec Guide</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
          Calculates voltage drop & speaker power loss using stage-grade thermal copper specs.
        </p>
      </div>

      {/* Mode Switcher Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6 sm:mb-8">
        <button
          onClick={() => setMode("power")}
          className={`py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            mode === "power"
              ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FaPlug /> Mains Power
        </button>
        <button
          onClick={() => setMode("speaker")}
          className={`py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            mode === "speaker"
              ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FaVolumeUp /> Speaker Output
        </button>
      </div>

      {mode === "power" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Controls Side */}
          <div className="space-y-5 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
            {/* Watts Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300">Total System Load (Watts)</label>
                <span className="text-[10px] text-cyan-400 font-mono">@ 230V AC</span>
              </div>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                suppressHydrationWarning
                value={watts}
                onChange={(e) => {
                  const val = e.target.value;
                  setWatts(val === "" ? "" : Math.max(0, Number(val)));
                }}
                placeholder="e.g. 3000"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 font-black text-lg text-cyan-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all"
              />
              {/* Quick Preset Buttons */}
              <div className="flex gap-2 mt-2">
                {[1500, 3000, 5000, 8000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWatts(w)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      numWatts === w
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {w >= 1000 ? `${w / 1000}kW` : `${w}W`}
                  </button>
                ))}
              </div>
            </div>

            {/* Run Distance */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300">Cable Run Distance</label>
                <span className="text-xs font-bold text-cyan-400 font-mono">{numDistance} Meters</span>
              </div>
              <input
                type="range"
                min="1"
                max="150"
                value={numDistance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between items-center mt-2">
                <input
                  type="number"
                  inputMode="numeric"
                  suppressHydrationWarning
                  value={distance}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDistance(val === "" ? "" : Math.max(0, Number(val)));
                  }}
                  className="w-24 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-200 outline-none"
                />
                <span className="text-[11px] text-slate-500">Max 150m</span>
              </div>
            </div>

            {/* Cable Thickness */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Cable Gauge / Thickness</label>
              <select
                value={gauge}
                onChange={(e) => setGauge(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 font-bold text-sm text-slate-100 focus:border-cyan-400 outline-none cursor-pointer"
              >
                <option value={1.5}>1.5 mm² (~16 AWG - Small Rack)</option>
                <option value={2.5}>2.5 mm² (~14 AWG - Standard Main)</option>
                <option value={4.0}>4.0 mm² (~12 AWG - Heavy Amp Rack)</option>
                <option value={6.0}>6.0 mm² (~10 AWG - High Power Distribution)</option>
                <option value={10.0}>10.0 mm² (~8 AWG - Sub-Mains Feed)</option>
              </select>
            </div>
          </div>

          {/* Results Display Side */}
          <div className="bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Calculated Terminal Line</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">{remVoltage.toFixed(1)}V</span>
                <span className={`text-xs sm:text-sm font-bold ${dropPct <= 3.5 ? "text-green-400" : "text-red-400"}`}>
                  ({dropPct.toFixed(1)}% Drop)
                </span>
              </div>

              <div className="mt-6 space-y-2.5 text-xs font-medium text-slate-300 border-t border-slate-800/80 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Operating Current:</span>
                  <span className="text-white font-bold font-mono">{current.toFixed(1)} Amps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Voltage Loss:</span>
                  <span className="text-cyan-400 font-bold font-mono">{vDrop.toFixed(2)} Volts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cable Loop Resistance:</span>
                  <span className="text-slate-300 font-bold font-mono">{powerResistance.toFixed(3)} Ω</span>
                </div>
              </div>
            </div>

            <div
              className={`mt-6 p-3.5 rounded-xl border text-xs font-bold flex items-start gap-2.5 ${
                dropPct <= 3.5
                  ? "bg-green-950/30 border-green-500/40 text-green-300"
                  : dropPct <= 5
                  ? "bg-yellow-950/30 border-yellow-500/40 text-yellow-300"
                  : "bg-red-950/30 border-red-500/40 text-red-300"
              }`}
            >
              {dropPct <= 3.5 ? (
                <FaCheckCircle className="text-green-400 text-base shrink-0 mt-0.5" />
              ) : (
                <FaExclamationTriangle className="text-red-400 text-base shrink-0 mt-0.5" />
              )}
              <div>
                {dropPct <= 3.5
                  ? "Safe line voltage. Safe for high-current digital & class-TD stage amplifiers."
                  : dropPct <= 5
                  ? "Acceptable for light loads, but heavy bass amps may clip early under peak load."
                  : "Critical Voltage Drop! Heavy risk of amplifier shut-off or overheating."}
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Speaker Controls */}
          <div className="space-y-5 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
            {/* Amplifier Power */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Amplifier Output (RMS Watts)</label>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                suppressHydrationWarning
                value={spkWatts}
                onChange={(e) => {
                  const val = e.target.value;
                  setSpkWatts(val === "" ? "" : Math.max(0, Number(val)));
                }}
                placeholder="e.g. 1000"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 font-black text-lg text-cyan-400 focus:border-cyan-400 outline-none"
              />
              <div className="flex gap-2 mt-2">
                {[500, 1000, 2000, 4000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setSpkWatts(w)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                      numSpkWatts === w
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {w}W
                  </button>
                ))}
              </div>
            </div>

            {/* Speaker Load Impedance */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Speaker Load (Impedance)</label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 4, 8].map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setSpkOhms(o)}
                    className={`py-2.5 rounded-xl text-xs font-extrabold border transition-all ${
                      spkOhms === o
                        ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {o} Ω {o === 2 ? "(Parallel)" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Cable Run Distance */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-300">Speaker Cable Length</label>
                <span className="text-xs font-bold text-cyan-400 font-mono">{numSpkDistance} Meters</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={numSpkDistance}
                onChange={(e) => setSpkDistance(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Speaker Cable Gauge */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Speaker Cable Core Size</label>
              <select
                value={spkGauge}
                onChange={(e) => setSpkGauge(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 font-bold text-sm text-slate-100 focus:border-cyan-400 outline-none cursor-pointer"
              >
                <option value={1.5}>1.5 mm² (~16 AWG - Tops / Short run)</option>
                <option value={2.5}>2.5 mm² (~14 AWG - Pro Tops & Bins)</option>
                <option value={4.0}>4.0 mm² (~12 AWG - Subwoofer Heavy Run)</option>
                <option value={6.0}>6.0 mm² (~10 AWG - Long Distance Bins)</option>
              </select>
            </div>
          </div>

          {/* Speaker Results Display */}
          <div className="bg-slate-950/80 p-5 sm:p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Actual Delivered Speaker Power</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">{spkDelivered.toFixed(0)}W</span>
                <span className={`text-xs sm:text-sm font-bold ${spkLossPct <= 5 ? "text-green-400" : "text-red-400"}`}>
                  (-{spkLossPct.toFixed(1)}% Loss)
                </span>
              </div>

              <div className="mt-6 space-y-2.5 text-xs font-medium text-slate-300 border-t border-slate-800/80 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Wasted Power Heat:</span>
                  <span className="text-red-400 font-bold font-mono">{spkLostWatts.toFixed(0)} RMS Watts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Cable Loop Resistance:</span>
                  <span className="text-cyan-400 font-bold font-mono">{spkResistance.toFixed(3)} Ω</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Damping Factor at Speaker:</span>
                  <span className="text-slate-200 font-bold font-mono">~{effectiveDF.toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div
              className={`mt-6 p-3.5 rounded-xl border text-xs font-bold flex items-start gap-2.5 ${
                spkLossPct <= 5
                  ? "bg-green-950/30 border-green-500/40 text-green-300"
                  : "bg-red-950/30 border-red-500/40 text-red-300"
              }`}
            >
              {spkLossPct <= 5 ? (
                <FaCheckCircle className="text-green-400 text-base shrink-0 mt-0.5" />
              ) : (
                <FaExclamationTriangle className="text-red-400 text-base shrink-0 mt-0.5" />
              )}
              <div>
                {spkLossPct <= 5
                  ? "Optimal power transfer. Excellent kick bass tightness & high clarity."
                  : "High power loss! Subwoofer bass punch will feel muddy and loose due to low damping factor."}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Disclaimer Box (Sinhala & English) */}
      <div className="mt-8 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs leading-relaxed flex gap-3 items-start">
        <FaInfoCircle className="text-amber-400 text-lg shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p>
            <strong className="text-amber-300">වගකීම් ප්‍රකාශනය:</strong> මෙය AI තාක්ෂණය මගින් ගණනය කරනු ලබන දළ ඇස්තමේන්තුවක් (Rough Estimate) පමණි. ඔබගේ සැබෑ ශබ්ද පරිපාලන සහ විදුලි පද්ධති සැකසීමේදී, සුදුසුකම් ලත් වෘත්තීය සවුන්ඩ් ඉංජිනේරුවරයෙකුගේ (Professional Sound/Electrical Engineer) උපදෙස් ලබාගැනීමට කාරුණික වන්න.
          </p>
          <p className="text-[11px] text-amber-300/80 border-t border-amber-500/20 pt-1.5">
            <strong>Disclaimer:</strong> This tool provides an AI-generated rough estimate for reference purposes only. For professional audio setups and installations, please consult a qualified Sound/Electrical Engineer.
          </p>
        </div>
      </div>
    </div>
  );
}