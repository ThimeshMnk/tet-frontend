"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function DonatePage() {
  const { locale, data: initialData } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
  const [selectedAmount, setSelectedAmount] = useState("5000");
  const [customAmount, setCustomAmount] = useState("");

  const data = previewData || initialData;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TET_LIVE_PREVIEW") setPreviewData(event.data.state);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const translate = (key: string, fallback: string) => {
    const val = data?.[key];
    if (!val) return fallback;
    return typeof val === "object" ? (val[locale] || fallback) : val;
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    if (e.target.value) {
      setSelectedAmount(e.target.value);
    }
  };

  const selectPreset = (amt: string) => {
    setSelectedAmount(amt);
    setCustomAmount("");
  };

  return (
    <div className="w-full bg-[#f8fbff] text-slate-800 selection:bg-pink-100 selection:text-sky-900 overflow-x-hidden min-h-screen">
      
      {/* 1. HERO: Institutional Header */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={fadeInUp}>
          <span className="text-sky-800 font-bold tracking-[0.3em] text-[11px] uppercase mb-4 px-4 py-1.5 bg-sky-100/80 rounded-full border border-sky-200 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            {translate("dn_hero_label", "TRANS EQUALITY TRUST • INVEST IN CHANGE")}
          </span>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-sky-950 mb-6 tracking-tight leading-tight">
            {translate("dn_hero_title1", "Invest in")}{" "}
            <span className="text-pride-gradient italic font-normal font-playfair">
              {translate("dn_hero_title2", "Equality & Dignity.")}
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-slate-600 leading-relaxed text-sm md:text-base">
            {translate(
              "dn_hero_desc",
              "Your financial support directly enables 24/7 legal aid, safe healthcare access, emergency shelter, and dignity for transgender individuals across Sri Lanka."
            )}
          </p>
        </motion.div>
      </section>

      {/* 2. DONATION INTERFACE CARD */}
      <section className="max-w-4xl mx-auto px-6 pb-28">
        <motion.div 
          initial="initial" 
          whileInView="whileInView" 
          viewport={{ once: true }} 
          variants={fadeInUp} 
          className="bg-white rounded-3xl md:rounded-[3rem] shadow-xl border border-sky-200/80 overflow-hidden"
        >
          {/* Card Header */}
          <div className="bg-gradient-to-r from-sky-500 via-sky-400 to-pink-400 p-8 md:p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 relative z-10">
              {translate("dn_desk_title", "Contribution Desk")}
            </h2>
            <p className="text-sky-50 text-xs md:text-sm max-w-md mx-auto relative z-10 leading-relaxed">
              {translate("dn_desk_desc", "Select an amount to fund specific advocacy programs and emergency community services.")}
            </p>
          </div>

          {/* Form Body */}
          <div className="p-8 md:p-14">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-12">
              
              {/* Amount Selection */}
              <div>
                <label className="text-xs font-bold text-sky-950 uppercase tracking-widest mb-6 block text-center">
                  {translate("dn_desk_amt_label", "Select Amount (LKR)")}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["1000", "5000", "10000", "25000"].map((amt) => (
                    <button 
                      key={amt} 
                      type="button" 
                      onClick={() => selectPreset(amt)} 
                      className={`py-4 rounded-2xl font-serif text-xl font-bold transition-all border-2 cursor-pointer ${
                        selectedAmount === amt && !customAmount
                          ? "bg-gradient-to-r from-sky-400 to-pink-400 text-white border-transparent shadow-md shadow-pink-200/60 scale-105" 
                          : "bg-white text-sky-950 border-sky-100 hover:border-pink-300 hover:bg-sky-50/50"
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-6 flex justify-center">
                  <div className="relative w-full max-w-sm">
                    <input 
                      type="number" 
                      placeholder="Or enter custom amount (LKR)" 
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full text-center border-b-2 border-sky-200 py-3 focus:border-pink-400 outline-none bg-sky-50/30 rounded-t-lg text-sm text-sky-950 placeholder-slate-400 transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Personal Info & Payment Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Donor Identity */}
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-sky-950 uppercase tracking-widest border-b border-sky-100 pb-2">
                    {translate("dn_id_title", "Donor Identity")}
                  </h4>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all bg-sky-50/20" 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none text-sm transition-all bg-sky-50/20" 
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <input 
                      type="checkbox" 
                      id="anon" 
                      className="w-4 h-4 accent-pink-500 rounded cursor-pointer" 
                    />
                    <label htmlFor="anon" className="text-xs text-slate-500 cursor-pointer">
                      {translate("dn_id_anon", "I prefer to remain an anonymous donor")}
                    </label>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-6">
                  <h4 className="text-[11px] font-black text-sky-950 uppercase tracking-widest border-b border-sky-100 pb-2">
                    {translate("dn_pay_title", "Payment Preference")}
                  </h4>
                  <div className="space-y-3.5">
                    <label className="flex items-center gap-4 p-3.5 rounded-2xl border-2 border-sky-200 hover:border-pink-300 hover:bg-sky-50/40 cursor-pointer transition-all">
                      <input 
                        type="radio" 
                        name="pay" 
                        defaultChecked 
                        className="accent-sky-500 w-4 h-4 cursor-pointer" 
                      />
                      <span className="text-sm font-semibold text-sky-950">
                        💳 {translate("dn_pay_opt1", "Credit / Debit Card")}
                      </span>
                    </label>
                    <label className="flex items-center gap-4 p-3.5 rounded-2xl border-2 border-sky-200 hover:border-pink-300 hover:bg-sky-50/40 cursor-pointer transition-all">
                      <input 
                        type="radio" 
                        name="pay" 
                        className="accent-pink-500 w-4 h-4 cursor-pointer" 
                      />
                      <span className="text-sm font-semibold text-sky-950">
                        🏦 {translate("dn_pay_opt2", "Direct Bank Transfer")}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Button & Badges */}
              <div className="pt-8 border-t border-sky-100 text-center">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-white px-14 py-4 rounded-full text-xs font-black tracking-widest uppercase shadow-md shadow-pink-200/60 hover:shadow-sky-300/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {translate("dn_desk_btn", "Donate LKR")} {selectedAmount || "5000"} {locale === "en" ? "Now" : ""}
                </button>

                {/* Security Trust Badges */}
                <div className="mt-8 flex justify-center items-center gap-4 md:gap-6 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-sky-800">
                    <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {translate("dn_badge1", "SSL Encrypted")}
                  </span>
                  <span className="w-1 h-1 bg-sky-300 rounded-full"></span>
                  <span className="text-sky-800">{translate("dn_badge2", "Verified NGO")}</span>
                  <span className="w-1 h-1 bg-sky-300 rounded-full"></span>
                  <span className="text-sky-800">{translate("dn_badge3", "100% Confidential")}</span>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* 3. TRANSPARENCY SECTION */}
      <section className="py-24 bg-gradient-to-b from-[#ebf6ff]/70 via-white to-[#fdf2f8]/70 border-t border-sky-100 rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-pink-600 font-bold uppercase text-[10px] tracking-[0.25em] block mb-2">
              {translate("dn_imp_label", "Institutional Accountability")}
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-bold text-sky-950 mb-3">
              {translate("dn_imp_title", "Where your investment goes.")}
            </h3>
            <p className="text-slate-600 text-xs md:text-sm max-w-lg mx-auto">
              Every rupee donated is audited and allocated directly to core human rights defenses and community protection networks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { id: 1, val: "40%", title: "Legal Aid & Defense", desc: "Direct legal representation for community members facing arbitrary detentions and police harassment." },
              { id: 2, val: "35%", title: "Healthcare & Safe Housing", desc: "Affirmative medical consultations, hormone therapy support, and emergency crisis shelter beds." },
              { id: 3, val: "25%", title: "Systemic Advocacy", desc: "Constitutional reform drafting, police sensitization workshops, and national awareness programs." }
            ].map((item) => (
              <div 
                key={item.id} 
                className="bg-white/90 p-8 rounded-3xl border border-sky-200/80 shadow-sm hover:border-pink-300 hover:shadow-md transition-all space-y-3"
              >
                <span className="font-serif text-5xl font-extrabold text-pride-gradient block">
                  {translate(`dn_i${item.id}_val`, item.val)}
                </span>
                <h4 className="font-bold text-sky-950 text-base uppercase tracking-wider">
                  {translate(`dn_i${item.id}_title`, item.title)}
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto">
                  {translate(`dn_i${item.id}_desc`, item.desc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}