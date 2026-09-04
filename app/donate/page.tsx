"use client";

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function DonatePage() {
  const { locale, data: initialData } = useLanguage();
const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);  const [selectedAmount, setSelectedAmount] = useState('5000');

  const data = previewData || initialData;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TET_LIVE_PREVIEW') setPreviewData(event.data.state);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const translate = (key: string, fallback: string) => {
    const val = data[key];
    if (!val) return fallback;
    return typeof val === 'object' ? (val[locale] || fallback) : val;
  };

  return (
    <div className="w-full bg-[#fdfcf9] text-[#2c3e50] selection:bg-[#e8d5c4] overflow-x-hidden min-h-screen">
      
      {/* 1. HERO: Institutional Header */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp}>
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
            {translate('dn_hero_label', 'TRANS EQUALITY TRUST • INVEST IN CHANGE')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1a365d] mb-6 italic tracking-tight">
            {translate('dn_hero_title', 'Invest in Equality.')}
          </h1>
          <p className="max-w-xl mx-auto text-gray-500 leading-relaxed text-sm md:text-base italic">
            {translate('dn_hero_desc', 'Your financial support directly enables 24/7 legal intervention, medical safe-access, and rehabilitation pathways for the community.')}
          </p>
        </motion.div>
      </section>

      {/* 2. DONATION INTERFACE: Structured Card */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp} className="bg-white rounded-[4rem] shadow-xl border border-[#f3f0ec] overflow-hidden">
          
          <div className="bg-[#334155] p-10 md:p-14 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8d5c4]/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            <h2 className="font-serif text-3xl md:text-4xl mb-4 italic relative z-10">
                {translate('dn_desk_title', 'Contribution Desk')}
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto opacity-80 relative z-10">
                {translate('dn_desk_desc', 'Select an amount to fund specific advocacy programs and emergency services.')}
            </p>
          </div>

          <div className="p-10 md:p-16">
            <form className="space-y-12">
              
              {/* Amount Selection */}
              <div>
                <label className="text-[10px] font-bold text-[#8e7f71] uppercase tracking-[0.3em] mb-8 block text-center">
                    {translate('dn_desk_amt_label', 'Select Amount (LKR)')}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['1000', '5000', '10000', '25000'].map((amt) => (
                    <button key={amt} type="button" onClick={() => setSelectedAmount(amt)} className={`py-5 rounded-2xl font-serif text-xl transition-all border ${selectedAmount === amt ? 'bg-[#1a365d] text-white border-[#1a365d] shadow-lg scale-105' : 'bg-transparent text-[#1a365d] border-[#f3f0ec] hover:border-[#d88998]'}`}>
                      {amt}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <input type="number" placeholder="Enter Custom Amount" className="w-full max-w-sm text-center border-b border-gray-100 py-4 focus:border-[#d88998] outline-none bg-transparent text-sm italic" />
                </div>
              </div>

              {/* Personal Info Group - RESTORED */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                   <h4 className="text-[10px] font-bold text-[#1a365d] uppercase tracking-widest border-b border-[#f3f0ec] pb-2">
                    {translate('dn_id_title', 'Donor Identity')}
                   </h4>
                   <div className="space-y-6">
                      <input type="text" placeholder="Full Name" className="w-full border-b border-gray-100 py-3 focus:border-[#d88998] outline-none text-sm" />
                      <input type="email" placeholder="Email Address" className="w-full border-b border-gray-100 py-3 focus:border-[#d88998] outline-none text-sm" />
                   </div>
                   <div className="flex items-center gap-3">
                      <input type="checkbox" id="anon" className="w-4 h-4 accent-[#1a365d]" />
                      <label htmlFor="anon" className="text-xs text-gray-400 italic">{translate('dn_id_anon', 'I prefer to remain an anonymous donor')}</label>
                   </div>
                </div>

                <div className="space-y-8">
                   <h4 className="text-[10px] font-bold text-[#1a365d] uppercase tracking-widest border-b border-[#f3f0ec] pb-2">
                    {translate('dn_pay_title', 'Payment Preference')}
                   </h4>
                   <div className="space-y-4">
                      <label className="flex items-center gap-4 p-4 rounded-2xl border border-[#f3f0ec] hover:bg-[#fdfcf9] cursor-pointer transition-colors group">
                        <input type="radio" name="pay" defaultChecked className="accent-[#1a365d]" />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-[#1a365d]">{translate('dn_pay_opt1', 'Credit / Debit Card')}</span>
                      </label>
                      <label className="flex items-center gap-4 p-4 rounded-2xl border border-[#f3f0ec] hover:bg-[#fdfcf9] cursor-pointer transition-colors group">
                        <input type="radio" name="pay" className="accent-[#1a365d]" />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-[#1a365d]">{translate('dn_pay_opt2', 'Direct Bank Transfer')}</span>
                      </label>
                   </div>
                </div>
              </div>

              {/* Action Section - RESTORED BADGES */}
              <div className="pt-10 border-t border-[#f3f0ec] text-center">
                 <button className="bg-[#1a365d] text-white px-16 py-5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:shadow-2xl active:scale-95 transition-all">
                    {translate('dn_desk_btn', 'Donate LKR')} {selectedAmount} {locale === 'en' ? 'Now' : ''}
                 </button>
                 <div className="mt-8 flex justify-center items-center gap-6 opacity-40">
                    <span className="text-[8px] font-bold uppercase tracking-widest">{translate('dn_badge1', 'SSL Encrypted')}</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-[8px] font-bold uppercase tracking-widest">{translate('dn_badge2', 'Verified NGO')}</span>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <span className="text-[8px] font-bold uppercase tracking-widest">{translate('dn_badge3', 'Confidential')}</span>
                 </div>
              </div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* 3. TRANSPARENCY SECTION */}
      <section className="py-24 bg-[#f3f0ec] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-20">
              <h3 className="font-serif text-3xl md:text-4xl text-[#1a365d] mb-4 italic">
                {translate('dn_imp_title', 'Where your investment goes.')}
              </h3>
              <p className="text-[10px] font-bold text-[#8e7f71] uppercase tracking-[0.3em]">
                {translate('dn_imp_label', 'Institutional Accountability')}
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                { id: 1, val: "40%", title: "Legal Aid", desc: "Direct representation for community members facing unlawful detentions." },
                { id: 2, val: "35%", title: "Health & Rehab", desc: "Safe healthcare access and specialized addiction recovery support." },
                { id: 3, val: "25%", title: "Advocacy", desc: "Strategic policy drafting and national government sensitization." }
              ].map((item) => (
                <div key={item.id} className="space-y-4">
                   <span className="font-serif text-5xl text-[#1a365d]">{translate(`dn_i${item.id}_val`, item.val)}</span>
                   <h4 className="font-bold text-[#8e7f71] text-[10px] uppercase tracking-widest">{translate(`dn_i${item.id}_title`, item.title)}</h4>
                   <p className="text-gray-500 text-xs leading-relaxed max-w-xs mx-auto italic">{translate(`dn_i${item.id}_desc`, item.desc)}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}