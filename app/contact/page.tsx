"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ContactPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<
    string,
    string | Record<string, string>
  > | null>(null);
  const data = previewData || initialData;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TET_LIVE_PREVIEW")
        setPreviewData(event.data.state);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const translate = (key: string, fallback: string) => {
    const val = data[key];
    if (!val) return fallback;
    return typeof val === "object" ? val[locale] || fallback : val;
  };

  const getImg = (key: string, fallback: string) => {
    const path = data[key];
    if (!path) return fallback;
    if (
      typeof path === "string" &&
      (path.includes("livewire") || path.startsWith("blob:"))
    )
      return path;
    return getAssetUrl(path, fallback);
  };

  return (
    <div className="w-full bg-[#fdfcf9] text-[#2c3e50] selection:bg-[#e8d5c4] overflow-x-hidden">
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={fadeInUp}
        >
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
            {translate("ct_hero_label", "TRANS EQUALITY TRUST • CONNECT")}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1a365d] mb-6 italic tracking-tight leading-tight">
            {translate("ct_hero_title", "Connect with Us.")}
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 leading-relaxed text-sm md:text-base italic">
            {translate(
              "ct_hero_desc",
              "Whether you are seeking partnership, legal aid, or looking to support our mission, our institutional desk is ready to facilitate your inquiry.",
            )}
          </p>
        </motion.div>
      </section>

      {/* 2. EMERGENCY INTERVENTION */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-[#334155] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(51,65,85,0.3)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e8d5c4]/10 rounded-full blur-[80px] -mr-40 -mt-40"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-[#e8d5c4]/10 border border-[#e8d5c4]/20 text-[#e8d5c4] text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
                {translate("ct_crisis_badge", "Crisis Protocol Active")}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 italic">
                {translate("ct_crisis_title", "Urgent Safety Assistance")}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed opacity-80">
                {translate(
                  "ct_crisis_desc",
                  "If you are facing illegal detention, harassment, or medical mistreatment, our emergency response team is available 24/7 for direct legal aid and safe-access intervention.",
                )}
              </p>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-4">
              <a
                href={`tel:${translate("ct_crisis_phone", "+94112345678")}`}
                className="group bg-white text-[#334155] px-10 py-5 rounded-full font-bold text-lg hover:bg-[#e8d5c4] transition-all flex items-center gap-3 shadow-lg active:scale-95"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                {translate("ct_crisis_phone", "+94 11 234 5678")}
              </a>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic tracking-[0.2em]">
                Confidential • 24/7 • Secure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT INFO GRID */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            id: 1,
            label: "General Inquiries",
            val: "info@transequalitytrust.lk",
            sub: "For institutional partnerships.",
          },
          {
            id: 2,
            label: "Media & Press",
            val: "media@transequalitytrust.lk",
            sub: "Official statements & interviews.",
          },
          {
            id: 3,
            label: "Office Registry",
            val: "Colombo 05, Sri Lanka",
            sub: "Central District HQ.",
          },
        ].map((item) => (
          <motion.div
            key={item.id}
            initial="initial"
            whileInView="whileInView"
            variants={fadeInUp}
            transition={{ delay: item.id * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-[#f3f0ec] hover:shadow-lg transition-all group"
          >
            <p className="text-[#8e7f71] text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
              {translate(`ct_g${item.id}_label`, item.label)}
            </p>
            <h4 className="font-serif text-xl text-[#1a365d] mb-2">
              {translate(`ct_g${item.id}_val`, item.val)}
            </h4>
            <p className="text-gray-400 text-xs italic">
              {translate(`ct_g${item.id}_sub`, item.sub)}
            </p>
          </motion.div>
        ))}
      </section>

      {/* 4. FORM SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-[#f3f0ec] flex flex-col lg:flex-row">
          <div className="w-full lg:w-3/5 p-12 md:p-20">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1a365d] mb-10 tracking-tight">
              {translate("ct_form_title", "Send a Message.")}
            </h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-gray-100 py-4 focus:border-[#d88998] outline-none transition-colors bg-transparent text-sm"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border-b border-gray-100 py-4 focus:border-[#d88998] outline-none transition-colors bg-transparent text-sm"
                    placeholder="hello@desk.lk"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full border-b border-gray-100 py-4 focus:border-[#d88998] outline-none transition-colors bg-transparent text-sm resize-none"
                  placeholder="How can our desk assist you?"
                ></textarea>
              </div>
              <button className="bg-[#1a365d] text-white px-12 py-4 rounded-full text-[10px] font-bold tracking-widest hover:shadow-xl transition-all uppercase active:scale-95 shadow-md">
                {translate("ct_form_btn", "Submit Inquiry")}
              </button>
            </form>
          </div>

          <div className="hidden lg:block w-2/5 relative">
            <Image
              src={getImg(
                "ct_form_img",
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
              )}
              fill
              alt="Community Desk"
              className="object-cover"
               sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized={!!previewData}
            />
            <div className="absolute inset-0 bg-[#1a365d]/10 backdrop-blur-[1px]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
