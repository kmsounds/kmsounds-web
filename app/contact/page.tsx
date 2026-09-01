"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaYoutube, 
  FaTiktok, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaCheckCircle 
} from "react-icons/fa";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    phone: "", 
    category: "Speaker Cabinet",
    model: "SRX Series",
    message: "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // K.M SOUNDS Direct WhatsApp Number
    const phoneNumber = "94751513131"; 

    const text = `*New Inquiry from K.M SOUNDS Website*\n\n` +
                 `👤 *Name:* ${formData.name}\n` +
                 `📞 *Phone:* ${formData.phone}\n` +
                 `📦 *Category:* ${formData.category}\n` +
                 `🔊 *Model/Type:* ${formData.model}\n` +
                 `💬 *Details:* ${formData.message}`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, "_blank");

    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-3xl text-emerald-400" />,
      qr: "/qr/wspqr.webp",
      link: "https://wa.me/94751513131",
      color: "from-emerald-500/20 to-emerald-900/10 hover:border-emerald-500/50",
      badge: "Fast Reply",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF className="text-3xl text-blue-500" />,
      qr: "/qr/fbqr.webp",
      link: "https://www.facebook.com/share/195bkUQB8X/?mibextid=wwXIfr",
      color: "from-blue-500/20 to-blue-900/10 hover:border-blue-500/50",
      badge: "Community",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-3xl text-red-500" />,
      qr: "/qr/ytqr.webp",
      link: "https://youtube.com/@k.msounds?si=mPS3GYOnklaatL0R",
      color: "from-red-500/20 to-red-900/10 hover:border-red-500/50",
      badge: "Demos & Reviews",
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-3xl text-pink-500" />,
      qr: "/qr/ttqr.webp",
      link: "https://www.tiktok.com/@k.m.sound",
      color: "from-pink-500/20 to-purple-900/10 hover:border-pink-500/50",
      badge: "Short Videos",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden py-16 px-4 sm:px-8">
      {/* Lightweight Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-16">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="text-xs font-semibold tracking-widest text-red-500 uppercase px-3 py-1 bg-red-950/40 border border-red-800/50 rounded-full">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Get In Touch With <span className="text-red-500">K.M SOUNDS</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Speaker Baffles, Custom Cabinets හෝ Pro Audio Equipment පිළිබඳ ඕනෑම විමසීමක් සඳහා අප හා සම්බන්ධ වන්න පහසුවෙන්ම පහල ඇති foam එක පුරවා whatsapp බටන් එක ක්ලික් කරන්න. 
          </p>
        </div>

        {/* Quick Contact & Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Phone */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-red-500/40">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
              <FaPhoneAlt className="text-2xl" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Direct Hotline</p>
              <a href="tel:+94751513131" className="text-lg font-bold hover:text-red-400 transition-colors">
                +94 75 151 3131
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-red-500/40">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
              <FaEnvelope className="text-2xl" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Email Address</p>
              <a href="mailto:kmsounds023@gmail.com" className="text-sm font-bold hover:text-red-400 transition-colors break-all">
                kmsounds023@gmail.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="p-6 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:border-red-500/40">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
              <FaMapMarkerAlt className="text-2xl" />
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Location</p>
              <p className="text-lg font-bold">Jayaweeragoda Rd Hanwella, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Social Networks & QR Code Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-wide text-gray-200">
            Social Media & QR Connect
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((item, index) => (
              <div 
                key={index}
                className={`group relative p-6 bg-gradient-to-b ${item.color} backdrop-blur-lg border border-white/10 rounded-2xl flex flex-col items-center text-center justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black`}
              >
                <div className="w-full flex justify-between items-center mb-2">
                  {item.icon}
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-white/10 border border-white/10 rounded-full text-gray-300">
                    {item.badge}
                  </span>
                </div>

                {/* Larger QR Code Container with No Text Overlay */}
                <div className="relative w-44 h-44 sm:w-48 sm:h-48 my-2 bg-black/80 border border-white/10 rounded-xl overflow-hidden group-hover:border-white/30 transition-colors flex items-center justify-center p-2">
                  <Image 
                    src={item.qr} 
                    alt={`${item.name} QR Code`} 
                    fill 
                    className="object-contain"
                  />
                </div>

                <div className="w-full space-y-3 mt-2">
                  <h3 className="font-bold text-gray-200">{item.name}</h3>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full py-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-xl text-xs font-semibold tracking-wider transition-all"
                  >
                    SCAN OR VISIT
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct WhatsApp Message Form */}
        <div className="p-8 sm:p-10 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Direct WhatsApp Message</h2>
              <p className="text-gray-400 text-sm">
                ඔබට අවශ්‍ය විස්තර ලබාදී Send via WhatsApp මත Click කරන්න.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <FaCheckCircle className="text-4xl text-emerald-400 mx-auto" />
                <h3 className="font-bold text-emerald-300">Opening WhatsApp...</h3>
                <p className="text-xs text-gray-400">ඔබගේ Message එක WhatsApp හරහා යැවීමට සූදානම්!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">නම (Name)</label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      required
                      placeholder="ඔබගේ නම"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">දුරකථන අංකය (Phone)</label>
                    <input
                      suppressHydrationWarning
                      type="tel"
                      required
                      placeholder="07xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">අවශ්‍ය සේවාව (Category)</label>
                    <div className="relative">
                      <select
                        suppressHydrationWarning
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-black/90 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-sm transition-colors text-gray-200 appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Speaker Baffle / Cabinet">Speaker Baffle / Cabinet</option>
                        <option value="Raw Enclosure">Raw Enclosure (Unfinished)</option>
                        <option value="Pro Audio Accessories">Pro Audio Accessories</option>
                        <option value="Repair / Protection Module">Repair / Amp Protection Module</option>
                        <option value="Other Custom Order">Other Custom Order</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs pointer-events-none">🔻</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">මාදිලිය (Model / Type)</label>
                    <div className="relative">
                      <select
                        suppressHydrationWarning
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-4 py-3 bg-black/90 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-sm transition-colors text-gray-200 appearance-none pr-10 cursor-pointer"
                      >
                        <option value="SRX Series (715 / 718 / 725)">SRX Series (715 / 718 / 725)</option>
                        <option value="RCF Bins & Tops">RCF Bins & Tops</option>
                        <option value="18 Inch Subwoofer Cabinet">18 Inch Subwoofer Cabinet</option>
                        <option value="15 Inch Speaker Cabinet">15 Inch Speaker Cabinet</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-xs pointer-events-none">🔻</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">අමතර විස්තර (Additional Details)</label>
                  <textarea
                    suppressHydrationWarning
                    rows={3}
                    placeholder="ප්‍රමාණය (Quantity), Plywood thickness, හෝ වෙනත් විශේෂිත අවශ්‍යතා..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-red-500 text-sm transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all duration-300"
                >
                  <FaWhatsapp className="text-xl" /> Send via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}