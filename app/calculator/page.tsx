import VenueCalculator from "@/components/VenueCalculator";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4">
      {/* Home එකෙන් එන අය වෙනුවෙන් Top Header Navigation එක */}
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-400 bg-slate-900/80 hover:bg-slate-800 px-4 py-2 rounded-xl border border-slate-800 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Link
          href="/"
          className="p-2 text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full border border-slate-800 transition-all shadow-md"
          title="Close Calculator"
        >
          <X className="w-5 h-5" />
        </Link>
      </div>

      <VenueCalculator />
    </main>
  );
}