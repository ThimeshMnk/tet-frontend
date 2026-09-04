"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};

export default function AboutPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
  const data = previewData || initialData;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TET_LIVE_PREVIEW') {
        setPreviewData(event.data.state);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const translate = (key: string, fallback: string) => {
    const val = data[key];
    if (!val) return fallback;
    return typeof val === 'object' ? (val[locale] || fallback) : val;
  };

  const getImg = (key: string, fallback: string) => {
    const path = data[key];
    if (!path) return fallback;
    if (typeof path === 'string' && (path.includes('livewire') || path.startsWith('blob:'))) return path;
    return getAssetUrl(path, fallback);
  };

  return (
    <div className="w-full bg-[#fdfcf9] text-[#2c3e50] selection:bg-[#e8d5c4] overflow-x-hidden">
      
      {/* 1. HERO */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-32 flex flex-col items-center text-center">
        <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp} viewport={{ once: true }}>
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
            {translate('about_hero_label', 'OUR HISTORY • OUR MISSION')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1a365d] mb-6 italic tracking-tight">
            {translate('about_hero_title', 'Advocating for Dignity.')}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed text-sm md:text-base">
            {translate('about_hero_description', 'TET is a pioneering social enterprise and advocacy organization in Sri Lanka dedicated to the empowerment of the transgender community. We work towards a society where every person can live with dignity, safety, equality, and freedom.')}
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl h-[300px] md:h-[500px] mt-16 rounded-t-full overflow-hidden shadow-2xl border-b-8 border-[#1a365d]">
           <Image 
             src={getImg('about_hero_image', 'https://images.unsplash.com/photo-1573164713988-8665fc963095')} 
             fill alt="Advocacy" className="object-cover" priority unoptimized={!!previewData}
           />
        </div>
      </section>

      {/* 2. VISION & MISSION */}
      <section className="py-32 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial="initial" whileInView="whileInView" variants={fadeInUp} viewport={{ once: true }}
          className="bg-white p-12 md:p-16 rounded-[3rem] border border-[#f3f0ec] shadow-sm"
        >
          <span className="text-4xl mb-6 block">👁️</span>
          <h2 className="font-serif text-3xl text-[#1a365d] mb-6">{translate('about_vision_title', 'Our Vision')}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {translate('about_vision_text', 'We envision a future where gender identity is no longer a barrier to human rights, healthcare, or employment. Our goal is to foster a Sri Lankan society that celebrates diversity and ensures total legal and social inclusion for all.')}
          </p>
        </motion.div>

        <motion.div 
          initial="initial" whileInView="whileInView" variants={fadeInUp} viewport={{ once: true }}
          className="bg-white p-12 md:p-16 rounded-[3rem] border border-[#f3f0ec] shadow-sm"
        >
          <span className="text-4xl mb-6 block">🎯</span>
          <h2 className="font-serif text-3xl text-[#1a365d] mb-6">{translate('about_mission_title', 'Our Mission')}</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            {translate('about_mission_text', 'To empower the transgender community through economic opportunities, legislative advocacy, and social support. We provide a platform for voices that have been silenced, creating sustainable change through education and social enterprise.')}
          </p>
        </motion.div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-24 bg-[#f3f0ec] rounded-[4rem] mx-4 md:mx-10 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-[#1a365d] mb-16 italic">{translate('about_values_main_title', 'Our Core Values')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: 1, title: 'Inclusion', desc: 'Ensuring that every individual, regardless of their background, has a seat at the table.' },
              { id: 2, title: 'Integrity', desc: 'Operating with transparency and honesty in all our advocacy and business efforts.' },
              { id: 3, title: 'Resilience', desc: 'Standing firm in the face of systemic challenges to secure a better tomorrow.' },
              { id: 4, title: 'Empowerment', desc: 'Providing the tools and resources necessary for our community to lead independent lives.' }
            ].map((val) => (
              <motion.div 
                key={val.id} 
                initial="initial" whileInView="whileInView" variants={fadeInUp} viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-1 h-12 bg-[#d88998]/30 mb-6"></div>
                <h3 className="font-serif text-xl text-[#1a365d] mb-3">{translate(`about_value_${val.id}_title`, val.title)}</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">
                  {translate(`about_value_${val.id}_text`, val.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-[#f3f0ec] flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-2/5 h-[400px] lg:h-[600px] relative">
             <Image 
                src={getImg('about_leader_image', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2')} 
                fill alt="Leader" className="object-cover" unoptimized={!!previewData} 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
          </div>
          <div className="w-full lg:w-3/5 p-12 md:p-20">
            <span className="text-[#8e7f71] font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">{translate('about_leader_label', 'Leadership Spotlight')}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-2">{translate('about_leader_name', 'Kasuni Mayadunna')}</h2>
            <p className="text-[#d88998] font-serif italic mb-8">{translate('about_leader_role', 'Executive Director')}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              {translate('about_leader_bio', 'Kasuni Mayadunna is a visionary advocate for transgender rights in Sri Lanka. Under her leadership, TET has evolved from a small collective into a robust social enterprise. She is dedicated to creating institutional change that addresses the economic disparities and social stigma faced by the trans community.')}
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                <div>
                    <p className="text-3xl font-serif text-[#1a365d]">{translate('about_leader_stat1_val', '5,000+')}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{translate('about_leader_stat1_label', 'Lives Impacted')}</p>
                </div>
                <div>
                    <p className="text-3xl font-serif text-[#1a365d]">{translate('about_leader_stat2_val', '24/7')}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{translate('about_leader_stat2_label', 'Crisis Support')}</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARTNERSHIPS */}
      <section className="py-24 text-center px-6">
        <div className="max-w-4xl mx-auto border-t border-b border-[#f3f0ec] py-12 italic font-serif text-2xl text-[#1a365d]">
           {translate('about_partner_quote', 'Collaborating for Systemic Change.')}
        </div>
        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-8 mb-12">{translate('about_partner_label', 'Strategic Partners')}</p>
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24">
           <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-2xl mb-4 border border-[#f3f0ec]">🤝</div>
              <span className="font-serif text-[#1a365d] text-lg italic">{translate('about_partner_1_name', 'Health Lanka')}</span>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Community Outreach</p>
           </div>
           <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center text-2xl mb-4 border border-[#f3f0ec]">🏛️</div>
              <span className="font-serif text-[#1a365d] text-lg italic">{translate('about_partner_2_name', 'Nuravi Foundation')}</span>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Legal & Policy Advocacy</p>
           </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto bg-[#1a365d] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl mb-6 italic">Join our journey towards equality.</h2>
            <p className="text-white/70 text-sm mb-10 max-w-xl mx-auto">
              Your support helps us provide safe spaces, job training, and legal assistance to those who need it most.
            </p>
            <button className="bg-[#d88998] hover:bg-[#c47a88] transition-colors text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase">
              Get Involved
            </button>
          </div>
          {/* Subtle decorative circle */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}