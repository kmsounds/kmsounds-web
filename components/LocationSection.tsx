"use client";

import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-16 bg-slate-900/60 border-t border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-tight">
            Visit Our Workshop
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Get your custom speaker baffles & sound equipment directly from Hanwella, Sri Lanka
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Contact Details Card */}
          <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              K.M SOUNDS Location Info
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Address</h4>
                  <p className="text-slate-400 text-sm">
                    K.M SOUNDS, Jayaweeragoda Rd, Hanwella, Colombo, Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl mt-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Hotline & WhatsApp</h4>
                  <p className="text-slate-400 text-sm">+94 75 151 3131</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl mt-1">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Opening Hours</h4>
                  <p className="text-slate-400 text-sm">Monday – Saturday: 8:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Google Maps Direction Button */}
            <div className="pt-4">
              <a
                href="https://maps.google.com/?q=Hanwella,Sri+Lanka"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg"
              >
                <Navigation className="w-5 h-5" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Embedded Google Map */}
          <div className="h-[380px] w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <iframe
              title="K.M SOUNDS Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.985!2d80.088!3d6.891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2530000000001%3A0x0!2sHanwella!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.2)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}