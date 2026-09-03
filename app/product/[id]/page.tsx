"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  ArrowLeft, 
  Check, 
  ShieldCheck, 
  Truck, 
  Rotate3d, 
  X, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Share2,
  Cpu,
  Sliders,
  Volume2,
  Sparkles
} from "lucide-react";
import ThreeSixtyModal from "@/components/ThreeSixtyModal";
import CustomOrderCalculator from "@/components/CustomOrderCalculator";
import { getProductById } from "@/data/products";
import ProductCalculatorButton from "@/components/ProductCalculatorButton";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  // Supabase Data State
  const [dbProduct, setDbProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch product from Supabase
  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        setLoading(true);
        const data = await getProductById(productId);
        setDbProduct(data);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  // Image Safe Fetch Function
  const getImagesList = (prod: any): string[] => {
    if (prod && Array.isArray(prod.images) && prod.images.length > 0) {
      return prod.images;
    }
    if (prod && typeof prod.images === "string" && prod.images.trim() !== "") {
      return [prod.images];
    }
    if (prod && prod.image_url && prod.image_url.trim() !== "") {
      return [prod.image_url];
    }
    return [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&q=80"
    ];
  };

  // Specs/Features Dynamic Normalization (No hardcoded fallbacks)
  const getFeaturesList = (prod: any): string[] => {
    if (!prod) return [];
    if (Array.isArray(prod.features) && prod.features.length > 0) {
      return prod.features;
    }
    if (Array.isArray(prod.specs) && prod.specs.length > 0) {
      return prod.specs;
    }
    if (prod.description || prod.desc) {
      const descText = prod.description || prod.desc;
      return descText.split("\n").filter((s: string) => s.trim() !== "");
    }
    return [];
  };

  // Dynamic Technical Specs List Extractor (Pure database text without labels)
  const getTechSpecsList = (prod: any): string[] => {
    if (!prod) return [];
    
    // If backend direct tech_specs / technical_specifications array exists
    if (Array.isArray(prod.tech_specs) && prod.tech_specs.length > 0) {
      return prod.tech_specs;
    }
    if (Array.isArray(prod.technical_specifications) && prod.technical_specifications.length > 0) {
      return prod.technical_specifications;
    }

    // Dynamic field collection directly from DB without adding labels
    const specs: string[] = [];
    if (prod.material && String(prod.material).trim() !== "") {
      specs.push(String(prod.material));
    }
    if (prod.driverSize && String(prod.driverSize).trim() !== "") {
      specs.push(String(prod.driverSize));
    }
    if (prod.driver_size && String(prod.driver_size).trim() !== "") {
      specs.push(String(prod.driver_size));
    }
    if (prod.power && String(prod.power).trim() !== "") {
      specs.push(String(prod.power));
    }
    if (prod.impedance && String(prod.impedance).trim() !== "") {
      specs.push(String(prod.impedance));
    }
    return specs;
  };

 // Dynamic Warranty Points Extractor
  const getWarrantyList = (prod: any): string[] => {
    if (!prod) return [];

    if (prod.Warranty && typeof prod.Warranty === "string") {
      return prod.Warranty
        .split("\n")
        .map((item: string) => item.trim())
        .filter((item: string) => item !== "");
    }

    if (Array.isArray(prod.Warranty) && prod.Warranty.length > 0) {
      return prod.Warranty;
    }

    return [];
  };

  // Product Data Logic (Pure Database object)
  const product = dbProduct || {};

  const productImages = getImagesList(product);
  const productFeatures = getFeaturesList(product);
  const techSpecsList = getTechSpecsList(product);
  const warrantyList = getWarrantyList(product);

  // State Management
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [is3DOpen, setIs3DOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  // Mobile scroll lock when Calculator Modal is active
  useEffect(() => {
    if (isCalcOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCalcOpen]);

  // Keyword check for Baffle / Cabinet products only (Array / String support)
  const allowedKeywords = ["rcf", "jbl", "srx", "top", "bin", "monitor", "buffel", "baffle", "cabinets", "box", "subwoofer"];
  
  const subCatText = Array.isArray(product?.subCategory) 
    ? product.subCategory.join(" ") 
    : Array.isArray(product?.sub_category) 
    ? product.sub_category.join(" ") 
    : product?.subCategory || product?.sub_category || "";

  const isBaffleProduct = allowedKeywords.some((key) =>
    `${product?.category || ""} ${subCatText} ${product?.name || ""}`
      .toLowerCase()
      .includes(key)
  );

  // Auto-slide Gallery Images every 4 seconds
  useEffect(() => {
    if (!productImages || productImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % productImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [productImages]);

  // Handle WhatsApp Direct Inquiry
  const handleWhatsAppInquiry = () => {
 const formattedPrice = product.price ? Math.round(Number(product.price)).toLocaleString() : "Contact Us";
    const msg = `Hello K.M SOUNDS, I am interested in ordering:\n*Product:* ${product.name || ""}\n*Price:* LKR ${formattedPrice}\n*Category:* ${product.category || "Audio Equipment"}`;
    window.open(`https://wa.me/94751513131?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Handle Link Share
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-cyan-400 font-bold tracking-wider uppercase">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 selection:bg-cyan-500 selection:text-black">
      
      {/* Top Glassmorphism Navigation Bar */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-3 py-2.5 sm:px-8 flex items-center justify-between gap-2">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-800/60 hover:bg-slate-800 border border-cyan-500/30 px-2.5 py-1.5 rounded-lg transition-all shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Store</span>
        </button>

        <span className="text-[10px] sm:text-xs font-bold tracking-wider sm:tracking-widest text-slate-400 uppercase truncate text-center">
          K.M SOUNDS <span className="hidden sm:inline">| <span className="text-cyan-400">Professional Audio</span></span>
        </span>

        <button 
          onClick={handleShare}
          className="p-1.5 sm:p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all shrink-0"
          title="Share Product"
        >
          {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        
        {/* Main Grid: Images & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* LEFT SIDE: Image Gallery & 3D Trigger */}
          <div className="space-y-4">
            
            <div className="relative group bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden p-4 shadow-2xl shadow-cyan-950/20">
              
              <div className="absolute top-4 left-4 z-10 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-md backdrop-blur-md">
                {product.brand || "K.M SOUNDS"}
              </div>

              {/* Main Display Image */}
              <div className="relative w-full h-80 sm:h-96 flex items-center justify-center overflow-hidden rounded-xl bg-slate-950/50">
                <img 
                  src={productImages[currentImgIndex] || productImages[0]} 
                  alt={product?.name || "Product Image"} 
                  className="max-h-full max-w-full object-contain transition-all duration-700 ease-in-out group-hover:scale-105 p-2"
                />

                {/* Slider Manual Controls */}
                {productImages.length > 1 && (
                  <>
                    <button 
                      onClick={() => setCurrentImgIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-cyan-500 hover:text-black transition-all border border-slate-700/50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentImgIndex((prev) => (prev + 1) % productImages.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 text-white hover:bg-cyan-500 hover:text-black transition-all border border-slate-700/50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Indicators */}
              {productImages.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`h-12 w-12 rounded-lg border overflow-hidden p-1 transition-all ${
                        currentImgIndex === idx 
                          ? "border-cyan-400 bg-cyan-950/50 scale-105" 
                          : "border-slate-800 opacity-50 hover:opacity-100 bg-slate-950"
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Interactive View Button */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Interactive View Available
                </span>
                <button
                  onClick={() => setIs3DOpen(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500 hover:to-blue-600 text-cyan-300 hover:text-black font-bold text-xs px-4 py-2 rounded-xl border border-cyan-500/40 transition-all shadow-md hover:shadow-cyan-500/30"
                >
                  <Rotate3d className="w-4 h-4" /> View 3D Model
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Product Meta & Details */}
          <div className="space-y-6">
            
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {product.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                )}
                
                {/* SubCategory Array / String Render Support */}
                {Array.isArray(product.subCategory || product.sub_category) ? (
                  (product.subCategory || product.sub_category).map((sub: string, index: number) => (
                    <span key={index} className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded">
                      {sub}
                    </span>
                  ))
                ) : (product.subCategory || product.sub_category) ? (
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-0.5 rounded">
                    {product.subCategory || product.sub_category}
                  </span>
                ) : null}

                {product.inStock !== false ? (
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-0.5 rounded flex items-center gap-1">
                    <Check className="w-3 h-3" /> In Stock
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-rose-400 bg-rose-950/60 border border-rose-800/50 px-2.5 py-0.5 rounded">
                    Pre-Order Only
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                {product.name}
              </h1>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 flex items-baseline justify-between shadow-lg">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Price</p>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400">
  LKR {product.price ? Math.round(Number(product.price)).toLocaleString() : "Contact Us"}
</div>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                LKR Price Ex-Factory
              </span>
            </div>

            {/* TECHNICAL SPECIFICATIONS */}
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Materials
              </h3>
              
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 min-h-[100px] flex flex-col justify-center shadow-xl">
                {techSpecsList.length > 0 && (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {techSpecsList.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold select-none">•</span>
                        <span className="font-semibold text-slate-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">

              {/* 🚀 Venue Setup Calculator Button */}
              <ProductCalculatorButton />

              {isBaffleProduct && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsCalcOpen(true)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 border border-amber-300/40 transition-all flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
                >
                  <span className="text-base animate-bounce">🧮</span> 
                  <span>Customize Setup & Calculate Price</span>
                </motion.button>
              )}

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50 hover:shadow-emerald-500/20 active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" /> Order via WhatsApp
              </button>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: Features & Guarantee Cards */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* BUILD FEATURES BOX */}
          <div className="md:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 flex flex-col justify-start min-h-[180px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Build Features & Quality Specs
            </h3>
            {productFeatures.length > 0 && (
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                {productFeatures.map((feat: string, index: number) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-bold select-none">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* K.M SOUNDS WARRANTY BOX */}
          <div className="bg-gradient-to-br from-slate-900/80 to-cyan-950/20 border border-cyan-500/20 rounded-2xl p-6 flex flex-col justify-between space-y-4 min-h-[180px]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> K.M Sounds Warranty
              </h3>
              {warrantyList.length > 0 ? (
                <div className="space-y-3 text-xs text-slate-300">
                  {warrantyList.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-bold select-none">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No specific warranty details listed for this product.</p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              Need custom modifications or bulk orders? <br/>
              <span className="text-cyan-400 font-semibold">Contact K.M SOUNDS Direct.</span>
            </div>
          </div>

        </div>

      </div>

      {/* 360 INTERACTIVE MODAL */}
      <ThreeSixtyModal 
        isOpen={is3DOpen} 
        onClose={() => setIs3DOpen(false)} 
        productName={product.name} 
        images={product.threeSixtyImages || productImages} 
      />

      {/* CALCULATOR POPUP MODAL */}
      <AnimatePresence>
        {isCalcOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsCalcOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-slate-950 border border-cyan-500/40 rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[90vh] sm:h-[85vh] flex flex-col relative z-10 shadow-2xl overflow-hidden"
            >
              <div className="p-3 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="p-1 bg-cyan-950 text-cyan-400 rounded text-xs sm:text-sm shrink-0">🧮</span>
                  <h3 className="text-xs sm:text-base font-black text-cyan-400 uppercase tracking-wider truncate">
                    K.M SOUNDS Baffle Calculator - <span className="text-white font-bold">{product.name}</span>
                  </h3>
                </div>
                <button
                  onClick={() => setIsCalcOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>
              <div className="p-3 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 overscroll-contain">
                <CustomOrderCalculator />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}