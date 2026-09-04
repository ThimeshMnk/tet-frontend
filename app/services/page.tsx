"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";

export default function ServicesPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
  // Combine Data: Priority to Live Preview state, then Initial API data
  const data = previewData || initialData;

  const serviceFallbackImages = {
  1: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f", // Legal Aid & Human Rights
  2: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d", // Healthcare Access
  3: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2", // Mental Health Counseling
  4: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac", // Community Support
  5: "https://images.unsplash.com/photo-1552664730-d307ca884978", // Employment & Skills Development
  6: "https://images.unsplash.com/photo-1521791136064-7986c2920216", // Crisis Assistance
};



  // Listen for 'postMessage' from the Laravel Admin Panel for Real-time Editing
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TET_LIVE_PREVIEW') {
        setPreviewData(event.data.state);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // --- HELPERS ---

  // Dynamic Text Helper (Handles Objects from DB and Strings from Live Preview)
  const translate = (key: string, fallback: string) => {
    const val = data[key];
    if (!val) return fallback;
    return typeof val === 'object' ? (val[locale] || fallback) : val;
  };

  // Dynamic Image Helper (Handles Storage paths and Livewire temporary URLs)
  const getImg = (key: string, fallback: string) => {
    const path = data[key];
    if (!path) return fallback;

    // Check if it's a Livewire temporary/preview URL
    if (typeof path === 'string' && (path.includes('livewire') || path.startsWith('blob:'))) {
        return path;
    }
    return getAssetUrl(path, fallback);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      
      {/* 1. HERO: Institutional & Bold */}
      <section className="relative bg-slate-950 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
  src={getImg(
    'service_hero_bg',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18'
  )}
  fill
  alt="Background"
  className="object-cover"
  unoptimized={!!previewData}
  sizes='(max-width: 768px) 100vw, 50vw'
/>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4 block">
                {translate('s_hero_label', 'Our Essential Services')}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                {translate('s_hero_title', 'Comprehensive Support for the Transgender Community.')}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                {translate('s_hero_desc', 'TET provides a critical support infrastructure in Sri Lanka. From legal defense to clinical rehabilitation, we exist to dismantle systemic barriers and protect human dignity.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES GRID: 6 Manageable Cards */}
       <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { id: 1, title: 'Legal Aid & Human Rights', tag: 'Legal' },
            { id: 2, title: 'Medical Healthcare Access', tag: 'Healthcare' },
            { id: 3, title: 'Mental Health & Counseling', tag: 'Wellness' },
            { id: 4, title: 'Community Support & Safety', tag: 'Advocacy' },
            { id: 5, title: 'Employment & Skills Training', tag: 'Growth' },
            { id: 6, title: 'Crisis Intervention', tag: 'Emergency' },
          ].map((service) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: service.id * 0.1 }}
              className="bg-white group rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={getImg(
                    `service_${service.id}_img`,
                    serviceFallbackImages[service.id as keyof typeof serviceFallbackImages]
                  )}
                  fill
                  alt={translate(`service_${service.id}_title`, service.title)}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized={!!previewData}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {translate(`service_${service.id}_tag`, service.tag)}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {translate(`service_${service.id}_title`, service.title)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {translate(`service_${service.id}_desc`, 'Our specialized team provides immediate intervention and support ensuring fundamental rights are upheld.')}
                </p>
                <Link href="/contact" className="text-blue-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  {translate('btn_request', 'Request Assistance')} <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PROCESS: Modern Horizontal Structure */}
      <section className="py-32 bg-[#334155] text-white rounded-t-[4rem] md:rounded-t-[6rem] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[#e8d5c4] font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">
                {translate('s_process_label', 'Standard Protocol')}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 italic tracking-tight">
                {translate('s_process_title', 'How we provide support.')}
              </h2>
              <div className="h-px w-20 bg-[#e8d5c4]/30 mx-auto mb-8"></div>
              <p className="text-slate-300 text-sm leading-relaxed px-4 opacity-80">
                {translate('s_process_desc', 'Every intervention is guided by a strict confidentiality framework. Our methodology ensures that your safety is prioritized.')}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="hidden md:block absolute top-16 left-0 w-full h-[1px] bg-slate-500/30 -z-0"></div>
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-28 h-28 rounded-full bg-[#3e4a5b] border border-slate-500/50 flex items-center justify-center mb-10 shadow-2xl transition-all duration-500 group-hover:border-[#e8d5c4] group-hover:scale-105">
                  <span className="font-serif text-4xl text-[#e8d5c4] italic">0{i}</span>
                </div>
                <h4 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">
                  {translate(`s_proc_${i}_title`, 'Intake & Triage')}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed px-6 opacity-70 group-hover:opacity-100 transition-opacity">
                  {translate(`s_proc_${i}_text`, 'Fill out our secure intake form or call the hotline. Our case workers assess urgency immediately.')}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <Link href="/contact" className="inline-block group relative">
                <div className="absolute -inset-1 bg-[#e8d5c4] rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
                <button className="relative bg-white text-[#334155] px-12 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#e8d5c4] transition-all shadow-xl">
                  {translate('btn_get_assistance', 'Get Assistance Now')}
                </button>
             </Link>
          </div>
        </div>
      </section>

      {/* 4. EMERGENCY CTA: Crisis Response */}
      <section className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto relative group">
          <div className="relative overflow-hidden bg-[#334155] rounded-[3.5rem] p-10 md:p-24 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
            <div className="relative z-10 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="inline-block px-5 py-2 rounded-full bg-[#e8d5c4]/10 border border-[#e8d5c4]/20 text-[#e8d5c4] text-[9px] font-bold uppercase tracking-[0.3em] mb-8">
                  {translate('s_emergency_badge', 'Crisis Response Protocol Active')}
                </span>
                <h2 className="font-serif text-4xl md:text-6xl text-white font-bold italic mb-6 leading-tight">
                  {translate('s_emergency_title', 'Immediate Threat to Safety?')}
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed opacity-90">
                  {translate('s_emergency_desc', 'Our specialized team is available 24/7 for direct legal intervention at police stations and safe healthcare access.')}
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <Link 
                    href={`tel:${translate('s_emergency_phone', '+94112345678')}`} 
                    className="group w-full md:w-auto bg-white text-[#334155] hover:bg-[#e8d5c4] px-12 py-6 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-95"
                  >
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </div>
                    <span className="tracking-tight">Call Hotline: {translate('s_emergency_phone', '+94 11 234 5678')}</span>
                  </Link>
                  <Link href="/contact" className="w-full md:w-auto border-2 border-white/20 text-white hover:border-[#e8d5c4] hover:text-[#e8d5c4] px-12 py-6 rounded-full font-bold text-lg transition-all">
                    {translate('btn_emergency_msg', 'Emergency Message')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}