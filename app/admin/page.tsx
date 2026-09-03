"use client";
import { supabase } from '@/lib/supabase';
import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Baffles");
  const [subCategory, setSubCategory] = useState<string[]>([]); // 🔄 Changed to Array
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [material, setMaterial] = useState("");
  const [warranty, setWarranty] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiFilled, setAiFilled] = useState(false);

  // ✏️ Edit Mode States
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [editLoading, setEditLoading] = useState(false);

  const subCategoriesData: { [key: string]: string[] } = {
   "Baffles": ["Bin", "Top", "Monitors", "Line Array", "SRX", "RCF", "Normal", "Others"],
  "Speakers": ["8inch", "10inch", "12inch", "15inch", "18inch"],
  "Components & Drivers": ["HF Drivers", "Tweeters", "Diaphragms", "Recone Kits", "Network Boards"],
  "Cabinet Hardware": ["Handles", "Corners", "Castor Wheels", "Speaker Grilles", "Rubber Feet", "Pole Mounts" , "Back Plates", "T Nuts", "Filter Net", "Logo Badge"],
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

  // Check existing session on mount (Strictly verify Admin Email)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        if (data.session.user.email === "kmsounds023@gmail.com") {
          setIsAuthenticated(true);
        } else {
          await supabase.auth.signOut();
          setIsAuthenticated(false);
        }
      }
    };
    checkSession();
  }, []);

  // 🔑 Supabase Email & Password Login Logic
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      });

      if (error) {
        alert("❌ Login වීමට නොහැකි විය: " + error.message);
      } else if (data.session) {
        if (data.session.user.email !== "kmsounds023@gmail.com") {
          await supabase.auth.signOut();
          alert("❌ ඔබට Admin Panel එකට පිවිසීමට අවසර නැත!");
          return;
        }

        setIsAuthenticated(true);
      }
    } catch (err: any) {
      alert("❌ Login Error: " + err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  // 🔒 Logout Logic
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const fetchProductsFromSupabase = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProductsFromSupabase();
    }
  }, [isAuthenticated]);

  // 🔄 Stock Status Fast Toggle Logic
  const handleToggleStock = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      const { error } = await supabase
        .from("products")
        .update({ inStock: newStatus })
        .eq("id", id);

      if (error) throw error;

      setProducts(prev => 
        prev.map(p => p.id === id ? { ...p, inStock: newStatus } : p)
      );
    } catch (err: any) {
      alert("Stock Status වෙනස් කිරීමට නොහැකි විය: " + err.message);
    }
  };

  // 🛠️ Storage Bucket එකේ Folder සහ File Path extraction helper
  const extractFilePath = (url: string) => {
    if (!url || url.includes("unsplash.com")) return null;
    try {
      const pathParts = url.split("/product-images/");
      return pathParts[1] ? pathParts[1].split("?")[0] : null;
    } catch {
      return null;
    }
  };

  // 🗑️ Delete Product Logic
  const handleDeleteProduct = async (product: any) => {
    const confirmDelete = window.confirm(`"${product.name}" ප්‍රඩක්ට් එක සම්පූර්ණයෙන්ම Delete කරන්නද?`);
    if (!confirmDelete) return;

    try {
      const imagesToDelete: string[] = [];

      if (product.images && Array.isArray(product.images)) {
        product.images.forEach((url: string) => {
          const filePath = extractFilePath(url);
          if (filePath) imagesToDelete.push(filePath);
        });
      } else if (product.image_url) {
        const filePath = extractFilePath(product.image_url);
        if (filePath) imagesToDelete.push(filePath);
      }

      if (imagesToDelete.length > 0) {
        await supabase.storage
          .from("product-images")
          .remove(imagesToDelete);
      }

      const { error: dbError } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (dbError) throw dbError;

      alert("🎉 Product එක සාර්ථකව Delete විය!");
      fetchProductsFromSupabase();
    } catch (err: any) {
      alert("Delete කිරීමට නොහැකි විය: " + err.message);
    }
  };

  // ✏️ Start Editing Logic
  const handleStartEdit = (product: any) => {
    setEditingProductId(product.id);

    let currentSubCats: string[] = [];
    if (Array.isArray(product.subCategory)) {
      currentSubCats = product.subCategory;
    } else if (typeof product.subCategory === "string" && product.subCategory.trim() !== "") {
      currentSubCats = [product.subCategory];
    }

    setEditFormData({
      name: product.name || "",
      price: product.price || 0,
      category: product.category || "Baffles",
      subCategory: currentSubCats,
      material: product.material || "",
      description: product.description || "",
      Warranty: product.Warranty || product.warranty || "",
      inStock: product.inStock ?? true
    });
  };

  // ✏️ Edit Input Change Logic
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setEditFormData((prev: any) => ({
      ...prev,
      [name]: val
    }));
  };

  // ✏️ Edit Subcategory Checkbox Toggle
  const handleEditSubCategoryToggle = (sub: string) => {
    setEditFormData((prev: any) => {
      const currentArr: string[] = Array.isArray(prev.subCategory) ? prev.subCategory : [];
      if (currentArr.includes(sub)) {
        return { ...prev, subCategory: currentArr.filter((item: string) => item !== sub) };
      } else {
        return { ...prev, subCategory: [...currentArr, sub] };
      }
    });
  };

  // 💾 Save Product Edit Logic
  const handleSaveEdit = async (id: string) => {
    setEditLoading(true);
    try {
      const specsArray = editFormData.description
        .split("\n")
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0);

      const updatePayload = {
        name: editFormData.name.trim(),
        price: Math.round(Number(editFormData.price)),
        category: editFormData.category,
        subCategory: editFormData.subCategory,
        material: editFormData.material,
        description: editFormData.description,
        Warranty: editFormData.Warranty.trim() !== "" ? editFormData.Warranty.trim() : null,
        inStock: editFormData.inStock,
        features: specsArray
      };

      const { error } = await supabase
        .from("products")
        .update(updatePayload)
        .eq("id", id);

      if (error) throw error;

      alert("🎉 Product details updated successfully!");
      setEditingProductId(null);
      fetchProductsFromSupabase();
    } catch (err: any) {
      alert("Update කිරීමට නොහැකි විය: " + err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // 📸 Multi-Image selection & SDK Based Gemini AI Call
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;

    // 1. දැනටමත් Photo එකක් තිබේදැයි පරීක්ෂා කිරීම (පළමු පින්තූරය පසුව එකතු වන Photo වලින් වෙනස් කර ගැනීමට)
    const isFirstTimeUpload = imageFiles.length === 0;

    // 2. Photos 6 සීමාව දක්වා එකතු කිරීම
    const newFiles = [...imageFiles, ...selected].slice(0, 6);
    setImageFiles(newFiles);

    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newUrls);

    // 🛑 2, 3, 4, 5, 6 පින්තූර එකතු කරද්දී AI එක Run නොවී Photos ටික පමණක් Add වේ!
    if (!isFirstTimeUpload) {
      return;
    }

    // 3. පළමු Photo එක සඳහා පමණක් AI Analysis ආරම්භ වේ
    const primaryFile = selected[0];
    setAnalyzing(true);

    try {
      // ⚡ Client-side Image Resize Logic (Max 1024px) for Fast AI Processing
      const base64Image = await new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1024;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas context missing"));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          const base64Str = dataUrl.split(",")[1];
          resolve(base64Str);
        };
        img.onerror = (err) => reject(err);
        img.src = URL.createObjectURL(primaryFile);
      });

      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        alert("❌ NEXT_PUBLIC_GEMINI_API_KEY එක .env.local එකේ සටහන් කර නැත!");
        setAnalyzing(false);
        return;
      }

      // Official Google Gen AI SDK Initialization
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

      const promptText = `You are an expert audio equipment technician for K.M SOUNDS. Analyze this photo of audio equipment. 
Extract key technical specifications, dimensions, build details, or features.
Return ONLY a JSON object with keys: "name", "material", "category", "subCategory", "features" (array of strings).`;

     // 🔄 Next.js Red Screen Crash එක වැළැක්වීමට Gemini Call එක සඳහා පමණක් වෙනම Try-Catch එකක්
let rawText = '{}';

try {
  const maxAttempts = 3;
  let response: any = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          promptText,
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
        ],
        config: {
          responseMimeType: 'application/json',
        },
      });

      // Gemini request එක සාර්ථකයි
      break;

    } catch (err: any) {
      const errorMessage = String(err?.message || err);

      const is503 =
        err?.status === 503 ||
        err?.statusCode === 503 ||
        /503|UNAVAILABLE|overload|overloaded|temporarily unavailable/i.test(errorMessage);

      // 503 නොවන error එකක් නම් retry කරන්නේ නැහැ
      if (!is503 || attempt === maxAttempts - 1) {
        throw err;
      }

      // 1st retry → 1.5 seconds
      // 2nd retry → 3 seconds
      const delay = 1500 * Math.pow(2, attempt);

      console.warn(
        `Gemini 503. Retry ${attempt + 1}/${maxAttempts - 1} after ${delay}ms`
      );

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  rawText = response?.text || '{}';

} catch (apiErr: any) {
  console.warn("Gemini API Error / Busy:", apiErr);

  // 🔔 සියලු retries fail වුණාම විතරක් notification එක
  alert(
    "⚠️ Google Server Busy (503). Photo එක එකතු විය, විස්තර Manually ඇතුළත් කරන්න."
  );

  setAnalyzing(false);
  return; // Analysis එක නවතා Photo එක Retain කරයි
}

      const aiData = JSON.parse(rawText);

      if (aiData.name) setName(aiData.name);
      if (aiData.material) setMaterial(aiData.material);
      if (Array.isArray(aiData.features)) {
        setDesc(aiData.features.join("\n"));
      } else if (aiData.description) {
        setDesc(aiData.description);
      }

      if (aiData.category && subCategoriesData[aiData.category]) {
        setCategory(aiData.category);
        if (Array.isArray(aiData.subCategory)) {
          setSubCategory(aiData.subCategory.filter((s: string) => subCategoriesData[aiData.category].includes(s)));
        } else if (typeof aiData.subCategory === "string" && subCategoriesData[aiData.category].includes(aiData.subCategory)) {
          setSubCategory([aiData.subCategory]);
        } else {
          setSubCategory([]);
        }
      }

      setAiFilled(true);
    } catch (err: any) {
      console.error("AI General Error:", err);
      alert("⚠️ Error processing image file.");
    } finally {
      setAnalyzing(false);
    }
  };

  const removePhoto = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    setPreviewUrls(updatedUrls);
  };

  // ➕ Add Mode Subcategory Toggle
  const handleAddSubCategoryToggle = (sub: string) => {
    if (subCategory.includes(sub)) {
      setSubCategory(subCategory.filter(item => item !== sub));
    } else {
      setSubCategory([...subCategory, sub]);
    }
  };

  // 🚀 Insert product logic
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedUrls: string[] = [];

      if (imageFiles.length > 0) {
        const baseName = name.trim() ? name.trim() : "product";
        const folderName = baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        for (const file of imageFiles) {
          const fileExt = file.name.split(".").pop();
          const cleanFileName = `${folderName}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
          const filePath = `${folderName}/${cleanFileName}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("product-images")
            .upload(filePath, file);

          if (!uploadError && uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from("product-images")
              .getPublicUrl(filePath);
            
            if (publicUrlData?.publicUrl) {
              uploadedUrls.push(publicUrlData.publicUrl);
            }
          }
        }
      }

      if (uploadedUrls.length === 0) {
        uploadedUrls = ["https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1000&q=80"];
      }

      const specsArray = desc
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0);

      const newProduct = {
        id: productId.trim(),
        name: name.trim(),
        category: category,
        subCategory: subCategory,
        price: Math.round(Number(price)),
        description: desc,
        material: material,
        Warranty: warranty.trim() !== "" ? warranty.trim() : null,
        inStock: true,
        features: specsArray,
        images: uploadedUrls
      };

      const { error } = await supabase.from("products").insert([newProduct]);

      if (error) throw error;

      alert("🎉 Product Added Successfully with " + uploadedUrls.length + " Photo(s)!");
      setProductId("");
      setName("");
      setPrice("");
      setDesc("");
      setMaterial("");
      setWarranty("");
      setSubCategory([]);
      setImageFiles([]);
      setPreviewUrls([]);
      setAiFilled(false);
      fetchProductsFromSupabase();

    } catch (err: any) {
      alert("Error saving product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 font-sans">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center">
          <div className="text-4xl mb-1">🔑</div>
          <h1 className="text-lg font-black text-cyan-400 tracking-wider">STORE ADMIN LOGIN</h1>
          <p className="text-[11px] text-slate-400">ඇතුළු වීමට Admin Email සහ Password ඇතුළත් කරන්න</p>
          
          <input 
            type="email" 
            placeholder="Admin Email" 
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs outline-none focus:border-cyan-400 text-cyan-400 font-bold"
            required
            autoFocus
          />

          <input 
            type="password" 
            placeholder="Password" 
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs outline-none focus:border-cyan-400 text-cyan-400 font-bold"
            required
          />

          <button 
            type="submit" 
            disabled={loginLoading}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
          >
            {loginLoading ? "Logging in..." : "Unlock Panel"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-slate-800 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-black text-cyan-400">K.M SOUNDS - STORE ADMIN</h1>
            <p className="text-xs text-slate-400 mt-1">Add & Manage Store Products / Sub-categories</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg font-bold hover:bg-red-500/20 transition cursor-pointer"
          >
            🔒 Logout Admin
          </button>
        </div>

        {/* Product Add Form */}
        <form onSubmit={handleAddProduct} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Add New Product Item</h2>
          
          <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 p-4 rounded-xl text-center bg-slate-950/60 transition">
            {previewUrls.length > 0 ? (
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-wrap justify-center gap-2">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        src={url} 
                        alt={`Preview ${idx + 1}`} 
                        className="h-24 w-24 object-cover rounded-lg border border-slate-700" 
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-cyan-400 font-bold">{previewUrls.length} Photo(s) Selected (Max 6)</p>
                {previewUrls.length < 6 && (
                  <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-400 font-bold px-3 py-1.5 rounded-lg transition">
                    + Add More Photos
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-1.5 py-2">
                <span className="text-2xl">📸</span>
                <span className="text-xs font-bold text-slate-300">Upload Product Photos (Select up to 6 photos)</span>
                <span className="text-[10px] text-slate-500">AI will automatically read specs from the primary photo</span>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
              </label>
            )}

            {analyzing && (
              <p className="mt-2 text-cyan-400 text-xs font-bold animate-pulse">
                🤖 AI is reading product specifications from photo...
              </p>
            )}
          </div>

          {aiFilled && (
            <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-amber-300 text-xs flex items-center justify-between">
              <span>💡 <strong>AI Auto-filled details:</strong> Review the highlighted fields and edit any prices or specs if needed.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Product ID (e.g. srx-715-01) *" 
              value={productId} 
              onChange={(e) => setProductId(e.target.value)} 
              required
              className="p-3 bg-slate-950 border border-cyan-500/50 rounded-xl text-xs text-cyan-400 font-bold outline-none focus:border-cyan-400 placeholder:text-slate-600"
            />
            
            <input 
              type="number" 
              placeholder="Price in LKR *" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              required
              className="p-3 bg-slate-950 border border-emerald-500/50 rounded-xl text-xs text-emerald-400 font-bold outline-none focus:border-emerald-400 placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Product Title *" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className={`p-3 bg-slate-950 rounded-xl text-xs outline-none border transition ${
                aiFilled ? "border-amber-500/70 bg-amber-950/10" : "border-slate-800 focus:border-cyan-400"
              }`}
            />
            
            <select 
              value={category} 
              onChange={(e) => {
                const selectedCat = e.target.value;
                setCategory(selectedCat);
                setSubCategory([]);
              }}
              className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs outline-none focus:border-cyan-400 text-slate-300"
            >
              {Object.keys(subCategoriesData).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Multi-Select Subcategories (Checkboxes) */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-slate-400 block">
              Sub Categories (Select multiple if needed - Optional):
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {subCategoriesData[category]?.map(s => {
                const isSelected = subCategory.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => handleAddSubCategoryToggle(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-400 border-cyan-500"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <span>{isSelected ? "☑" : "☐"}</span>
                    <span>{s}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <input 
            type="text" 
            placeholder="Construction Material" 
            value={material} 
            onChange={(e) => setMaterial(e.target.value)} 
            className={`w-full p-3 bg-slate-950 rounded-xl text-xs outline-none border transition ${
              aiFilled ? "border-amber-500/70 bg-amber-950/10" : "border-slate-800 focus:border-cyan-400"
            }`}
          />

          <textarea 
            placeholder="Product Specifications / Description (Line by line)" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            rows={4}
            className={`w-full p-3 bg-slate-950 rounded-xl text-xs outline-none border transition ${
              aiFilled ? "border-amber-500/70 bg-amber-950/10" : "border-slate-800 focus:border-cyan-400"
            }`}
          />

          <textarea 
            placeholder="Warranty Details (Line by line, e.g. 1 Year Official Body Warranty)" 
            value={warranty} 
            onChange={(e) => setWarranty(e.target.value)} 
            rows={3}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs outline-none focus:border-cyan-400 text-slate-200 placeholder:text-slate-600"
          />

          <button 
            type="submit" 
            disabled={loading || analyzing}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Publishing to Supabase..." : "Publish Product to Store"}
          </button>
        </form>

        {/* Inventory Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider flex items-center justify-between">
            <span>Current Inventory ({products.length})</span>
            <span className="text-[10px] text-slate-500 font-normal">Click Stock button to toggle status</span>
          </h2>

          <div className="space-y-3">
            {products.map((p) => (
              <div key={p.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl transition">
                {editingProductId === p.id ? (
                  /* EDIT MODE FORM */
                  <div className="space-y-3 bg-slate-900/90 p-3 rounded-lg border border-cyan-500/40">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-cyan-400">Editing Product: {p.id}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Product Title</label>
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditChange}
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Price (LKR)</label>
                        <input
                          type="number"
                          name="price"
                          value={editFormData.price}
                          onChange={handleEditChange}
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-emerald-400 font-bold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Category</label>
                        <select
                          name="category"
                          value={editFormData.category}
                          onChange={(e) => {
                            const cat = e.target.value;
                            setEditFormData((prev: any) => ({
                              ...prev,
                              category: cat,
                              subCategory: []
                            }));
                          }}
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-300"
                        >
                          {Object.keys(subCategoriesData).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Material</label>
                        <input
                          type="text"
                          name="material"
                          value={editFormData.material}
                          onChange={handleEditChange}
                          className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Edit Mode Multi-Select Subcategories */}
                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 block">Sub Categories (Multiple):</label>
                      <div className="flex flex-wrap gap-1.5">
                        {subCategoriesData[editFormData.category]?.map(s => {
                          const isSel = Array.isArray(editFormData.subCategory) && editFormData.subCategory.includes(s);
                          return (
                            <button
                              type="button"
                              key={s}
                              onClick={() => handleEditSubCategoryToggle(s)}
                              className={`px-2.5 py-1 rounded text-[11px] font-bold border transition cursor-pointer flex items-center gap-1 ${
                                isSel
                                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500"
                                  : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                              }`}
                            >
                              <span>{isSel ? "☑" : "☐"}</span>
                              <span>{s}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id={`instock-${p.id}`}
                        name="inStock"
                        checked={editFormData.inStock ?? true}
                        onChange={handleEditChange}
                        className="w-4 h-4 text-cyan-500 bg-slate-950 border-slate-700 rounded focus:ring-cyan-400 cursor-pointer"
                      />
                      <label htmlFor={`instock-${p.id}`} className="text-xs text-slate-300 font-bold cursor-pointer">
                        In Stock Status
                      </label>
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Description / Specs (Line by line)</label>
                      <textarea
                        name="description"
                        rows={3}
                        value={editFormData.description}
                        onChange={handleEditChange}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-slate-400 block mb-1">Warranty Details</label>
                      <input
                        type="text"
                        name="Warranty"
                        value={editFormData.Warranty}
                        onChange={handleEditChange}
                        className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-200"
                      />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingProductId(null)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={editLoading}
                        onClick={() => handleSaveEdit(p.id)}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition disabled:opacity-50 cursor-pointer"
                      >
                        {editLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* NORMAL ROW DISPLAY */
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      {p.images && p.images[0] ? (
                        <img 
                          src={p.images[0]} 
                          alt={p.name}
                          loading="lazy" 
                          className="w-12 h-12 object-cover rounded-lg border border-slate-800 bg-slate-900" 
                        />
                      ) : (
                        <div className="w-12 h-12 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-600 text-[10px]">
                          No Img
                        </div>
                      )}

                      <div>
                        <span className="font-bold text-white text-xs block">{p.name}</span>
                        <span className="text-[10px] text-cyan-400 font-mono block">
                          ID: {p.id} | {p.category} {
                            Array.isArray(p.subCategory) && p.subCategory.length > 0 
                              ? `› [${p.subCategory.join(", ")}]` 
                              : p.subCategory ? `› ${p.subCategory}` : ''
                          }
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="font-bold text-emerald-400 text-xs">
                        LKR {p.price?.toLocaleString()}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleStock(p.id, p.inStock ?? true)}
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition cursor-pointer ${
                          (p.inStock ?? true)
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                        }`}
                      >
                        {(p.inStock ?? true) ? "🟢 In Stock" : "🔴 Out of Stock"}
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(p)}
                          className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold rounded-lg transition cursor-pointer"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProduct(p)}
                          className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[11px] font-bold rounded-lg transition cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}