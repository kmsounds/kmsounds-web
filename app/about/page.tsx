import React from "react";
import { ShieldCheck, Cpu, Box, Phone, Mail, Globe, Sparkles, CheckCircle2, Volume2 } from "lucide-react";

export const metadata = {
  title: "About Us | K.M SOUNDS",
  description: "Feel The Power Hear The Quality - Professional Speaker Baffles & Audio Equipment Manufacturing in Sri Lanka.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      {/* 🔮 BACKGROUND ANIMATED GLASS GLOW ORBS */}
      <div className="absolute top-10 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/15 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-80 h-80 sm:w-[500px] sm:h-[500px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse pointer-events-none duration-1000" />
      <div className="absolute top-1/2 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* 1. HERO SECTION & TAGLINE */}
        <section className="text-center space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-semibold tracking-wide uppercase backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-bounce duration-1000">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Professional Audio Craftsmanship</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-md">
            About <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">K.M SOUNDS</span>
          </h1>

          <div className="inline-block relative">
            <p className="text-xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-wider uppercase drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
              &quot;FEEL THE POWER HEAR THE QUALITY&quot;
            </p>
          </div>

          <p className="max-w-3xl mx-auto text-neutral-300 text-base sm:text-lg leading-relaxed font-light">
            K.M SOUNDS ආරම්භයේ සිටම අපගේ ප්‍රධාන අරමුණ වූයේ Live Audio Rental සහ High-output Sound Systems සඳහා උපරිම ශ්‍රව්‍ය කාර්යක්ෂමතාවයක් ලබා දෙන Professional Speaker Baffles නිෂ්පාදනය කිරීමයි.
          </p>
        </section>

        {/* 2. BRAND STORY & MISSION (GLASS CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Sinhala Story */}
          <div className="group relative bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-cyan-500/50 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-1 overflow-hidden">
            <div className="w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-600 absolute left-0 top-0 group-hover:w-2.5 transition-all duration-300" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌐</span>
              <h2 className="text-2xl font-bold text-white tracking-wide">අපගේ මෙහෙවර</h2>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              සාමාන්‍ය නිෂ්පාදන මෙන් නොව, Acoustic Tuning සහ Original Factory Dimensions 100% ක් නිවැරදිව පවත්වා ගනිමින්, සවුන්ඩ් සිස්ටම් පාවිච්චි කරන අයගේ සහ Sound Engineers ලාගේ අවශ්‍යතාවයන්ට හරියටම ගැලපෙන සවිශක්තිමත් නිෂ්පාදන වෙළඳපොළට ඉදිරිපත් කිරීම අපගේ එකම අරමුණයි.
            </p>
          </div>

          {/* English Story */}
          <div className="group relative bg-neutral-900/40 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 p-6 sm:p-8 rounded-3xl transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-1 overflow-hidden">
            <div className="w-1.5 h-full bg-gradient-to-b from-blue-500 to-purple-600 absolute left-0 top-0 group-hover:w-2.5 transition-all duration-300" />
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌐</span>
              <h2 className="text-2xl font-bold text-white tracking-wide">Our Mission</h2>
            </div>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
              From day one, K.M SOUNDS has been committed to manufacturing high-grade Speaker Baffles tailored specifically for Live Audio Rental companies and High-output Sound Systems. Our mission is to deliver acoustic excellence by strictly adhering to original factory dimensions and exact acoustic tuning.
            </p>
          </div>
        </section>

        {/* 3. WHY CHOOSE US (GLASS FEATURE CARDS) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <Volume2 className="w-7 h-7 text-cyan-400 animate-pulse" />
              අපේ විශේෂත්වය (Why Choose Us)
            </h2>
            <p className="text-neutral-400 text-sm">Engineered for extreme durability, power, and touring performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="group bg-neutral-900/30 backdrop-blur-md border border-white/10 hover:border-cyan-400/60 p-6 rounded-3xl transition-all duration-500 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:-translate-y-2 relative overflow-hidden">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl w-fit mb-5 group-hover:scale-110 transition duration-300">
                <Box className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">18mm Malaysian Plywood</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mt-2">
                වෙළදපොලේ ඇති බාල Plywood Board වෙනුවට කල්පැවැත්ම ඇති ඉහලම තත්වයෙන් යුත් 18Mm malaysian Plywood වර්ග පමණක් බාවිතා කිරීම
              </p>
              <p className="text-neutral-500 text-xs italic mt-3 pt-3 border-t border-neutral-800">
                (Exclusively premium Quality 18mm Malaysian Plywood).
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-neutral-900/30 backdrop-blur-md border border-white/10 hover:border-cyan-400/60 p-6 rounded-3xl transition-all duration-500 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:-translate-y-2 relative overflow-hidden">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl w-fit mb-5 group-hover:scale-110 transition duration-300">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">OEM Dimension Accuracy</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mt-2">
                JBL SRX Series (SRX 715, 718, 725) සහ RCF ඇතුළු ලොව ප්‍රමුඛතම සවුන්ඩ් බ්‍රෑන්ඩ් වල Original Factory Specs වලට 100% ක් සමානව Acoustic Design එක සිදු කිරීම.
              </p>
              <p className="text-neutral-500 text-xs italic mt-3 pt-3 border-t border-neutral-800">
                (Engineered to 100% match original factory enclosure specs).
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-neutral-900/30 backdrop-blur-md border border-white/10 hover:border-cyan-400/60 p-6 rounded-3xl transition-all duration-500 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)] hover:-translate-y-2 relative overflow-hidden">
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl w-fit mb-5 group-hover:scale-110 transition duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">Textured Protective Coating</h3>
              <p className="text-neutral-300 text-sm leading-relaxed mt-2">
                විශේශ කාලගුන තත්වයන් වලින් ඔබගේ උපාංගය ආරක්ශා වන ලෙස හොඳම Speaker Box Texture Coating එකකින් පින්තාරු කර තිබීම
              </p>
              <p className="text-neutral-500 text-xs italic mt-3 pt-3 border-t border-neutral-800">
                (Finished with professional Speaker Box Texture coating).
              </p>
            </div>

          </div>
        </section>

        {/* 4. WHAT WE MANUFACTURE (GLASS PANELS) */}
        <section className="bg-neutral-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">අපගේ නිෂ්පාදන (What We Manufacture)</h2>
            <p className="text-neutral-400 text-sm">We specialize in premium pro-audio enclosures & touring hardware.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category 1 */}
            <div className="space-y-3 bg-neutral-950/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition duration-300">
              <h3 className="text-lg font-bold text-cyan-400 border-b border-neutral-800 pb-2 flex items-center justify-between">
                SRX Series
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </h3>
              <ul className="text-neutral-300 text-sm space-y-2.5">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> SRX 715 Single Top</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> SRX 725 Double Top</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> SRX 718 Subwoofer</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> SRX 728 Double Bin</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> And All Type Boxes</li>
              </ul>
            </div>

            {/* Category 2 */}
            <div className="space-y-3 bg-neutral-950/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition duration-300">
              <h3 className="text-lg font-bold text-cyan-400 border-b border-neutral-800 pb-2 flex items-center justify-between">
                RCF Bins & Tops
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </h3>
              <ul className="text-neutral-300 text-sm space-y-2.5">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> 15 Inch Tops</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> RCF Open Bins</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Double Bins</li>
                 <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> And All Type Bins</li>
              </ul>
            </div>

            {/* Category 3 */}
            <div className="space-y-3 bg-neutral-950/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition duration-300">
              <h3 className="text-lg font-bold text-cyan-400 border-b border-neutral-800 pb-2 flex items-center justify-between">
                Line Arrays & Subs
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </h3>
              <ul className="text-neutral-300 text-sm space-y-2.5">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Full Set Line Arrays</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Custom Array Cabinets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Custom Sub Enclosures</li>
              </ul>
            </div>

            {/* Category 4 */}
            <div className="space-y-3 bg-neutral-950/50 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition duration-300">
              <h3 className="text-lg font-bold text-cyan-400 border-b border-neutral-800 pb-2 flex items-center justify-between">
                Stands & Racks
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </h3>
              <ul className="text-neutral-300 text-sm space-y-2.5">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> DJ Light Stands</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Lighting Trusses</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Console Stands</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" /> Heavy-duty Amp Racks</li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5. CONTACT & WHATSAPP CTA (GLOWING GLASS BANNER) */}
        <section className="relative bg-gradient-to-r from-cyan-950/40 via-neutral-900/80 to-blue-950/40 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-3xl font-black text-white">අපව සම්බන්ධ කරගන්න (Contact Us)</h2>
          <p className="text-neutral-300 max-w-xl mx-auto text-sm sm:text-base">
            ඔබගේ Sound System එකට අවශ්‍ය සියලුම Baffles සහ Sound Setup Custom Order කරගැනීමට දැන්ම අප හා සම්බන්ධ වන්න.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-2 text-sm sm:text-base font-medium">
            <a href="tel:0751513131" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition hover:scale-105">
              <Phone className="w-5 h-5" /> 075 151 3131 / +94 75 151 3131
            </a>
            <a href="mailto:kmsounds023@gmail.com" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition hover:scale-105">
              <Mail className="w-5 h-5" /> kmsounds023@gmail.com
            </a>
            <span className="flex items-center gap-2 text-neutral-300">
              <Globe className="w-5 h-5 text-cyan-400" /> kmsounds.com
            </span>
          </div>

          <div className="pt-4">
            <a
              href="https://wa.me/94751513131?text=Hello%20K.M%20SOUNDS,%20I%20want%20to%20inquire%20about%20Speaker%20Baffles."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-full text-base transition-all duration-300 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] hover:scale-105"
            >
              💬 Connect via WhatsApp
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}