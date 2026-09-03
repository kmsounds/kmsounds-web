import CableGuide from "@/components/CableGuide";

export const metadata = {
  title: "Pro Audio Cable & Wire Guide | K.M. SOUNDS",
  description: "Check exact power cable thickness and speaker cable loss for live audio setups.",
};

export default function CableGuidePage() {
  return (
    <main className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 flex items-center justify-center">
      <CableGuide />
    </main>
  );
}