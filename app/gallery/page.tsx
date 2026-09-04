"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};

export default function GalleryPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
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

  const getImg = (key: string, fallback: string) => {
    const path = data[key];
    if (!path) return fallback;
    if (typeof path === 'string' && (path.includes('livewire') || path.startsWith('blob:'))) return path;
    return getAssetUrl(path, fallback);
  };

  return (
    <div className="w-full bg-[#fdfcf9] text-[#2c3e50] selection:bg-[#e8d5c4] overflow-x-hidden">
      
      {/* 1. HERO */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp}>
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block">
            {translate('gl_hero_label', 'MEDIA CENTER • CHRONICLES')}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1a365d] mb-6 italic tracking-tight">
            {translate('gl_hero_title', 'Moments of Change.')}
          </h1>
          <p className="max-w-xl mx-auto text-gray-400 leading-relaxed text-sm italic">
            {translate('gl_hero_desc', 'Documenting our journey through advocacy workshops, safe-space gatherings, and the stories of resilience within our community.')}
          </p>
        </motion.div>
      </section>

      {/* 2. UPCOMING EVENTS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-16 border-b border-[#f3f0ec] pb-6 flex justify-between items-baseline">
           <h2 className="font-serif text-3xl text-[#1a365d]">
            {translate('gl_event_title', 'Engagement')} <span className="italic font-normal">& Events</span>
           </h2>
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            {translate('gl_event_label', 'Mark your calendar')}
           </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Event 1 */}
          <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp} className="bg-white p-8 md:p-12 rounded-[3rem] border border-[#f3f0ec] shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center justify-center min-w-[100px] h-[100px] rounded-full border border-[#e8d5c4] text-[#1a365d]">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e7f71]">{translate('gl_ev1_month', 'Oct')}</span>
                 <span className="font-serif text-4xl font-bold leading-none">{translate('gl_ev1_day', '12')}</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl text-[#1a365d] mb-2">{translate('gl_ev1_title', 'Legal Rights & Advocacy Workshop')}</h3>
                <p className="text-[#d88998] text-[10px] font-bold uppercase tracking-widest mb-4">{translate('gl_ev1_loc', 'TET Community Hall, Colombo 05')}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{translate('gl_ev1_desc', 'An intensive session educating the community on constitutional rights and handling illegal detentions.')}</p>
                <button className="mt-6 text-[10px] font-bold text-[#1a365d] underline uppercase tracking-widest hover:text-[#d88998] transition-colors">Register Attendance</button>
              </div>
          </motion.div>

          {/* Event 2 */}
          <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp} transition={{delay: 0.1}} className="bg-white p-8 md:p-12 rounded-[3rem] border border-[#f3f0ec] shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center justify-center min-w-[100px] h-[100px] rounded-full border border-[#e8d5c4] text-[#1a365d]">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#8e7f71]">{translate('gl_ev2_month', 'Nov')}</span>
                 <span className="font-serif text-4xl font-bold leading-none">{translate('gl_ev2_day', '05')}</span>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl text-[#1a365d] mb-2">{translate('gl_ev2_title', 'Rehabilitation Circle: Pathways to Hope')}</h3>
                <p className="text-[#d88998] text-[10px] font-bold uppercase tracking-widest mb-4">{translate('gl_ev2_loc', 'Serenity Studio / Online')}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{translate('gl_ev2_desc', 'A safe, peer-led space for members navigating addiction and seeking community-based support.')}</p>
                <button className="mt-6 text-[10px] font-bold text-[#1a365d] underline uppercase tracking-widest hover:text-[#d88998] transition-colors">Register Attendance</button>
              </div>
          </motion.div>
        </div>
      </section>

      {/* 3. PHOTO GALLERY */}
     <section className="py-24 px-6 bg-white rounded-t-[4rem] md:rounded-t-[6rem] shadow-sm">
        {/* Added 'max-w-7xl mx-auto' to ensure it centers and aligns with your other sections */}
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
             <h2 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-4">
                {translate('gl_gallery_title', 'Visual Storytelling')}
             </h2>
             <div className="h-px w-20 bg-[#e8d5c4] mx-auto"></div>
          </div>

          {/* 
            1. Added 'justify-items-center' to ensure the grid items center themselves.
            2. Added 'mx-auto' to the grid container.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 justify-items-center mx-auto">
            {[
              { id: 1, fallbackImg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", fallbackAlt: "Community Unity" },
              { id: 2, fallbackImg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac", fallbackAlt: "Collaborative Workshop" },
              { id: 3, fallbackImg: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8", fallbackAlt: "Leadership Summit" },
              { id: 4, fallbackImg: "https://images.unsplash.com/photo-1511632765486-a01980e01a18", fallbackAlt: "Safe Space Gathering" },
              { id: 5, fallbackImg: "https://images.unsplash.com/photo-1573164713988-8665fc963095", fallbackAlt: "Advocacy Campaign" },
              { id: 6, fallbackImg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", fallbackAlt: "Vocational Training" }
            ].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                // Added max-w-sm to ensure cards don't stretch too wide on huge screens
                className="group relative aspect-[4/3] w-full max-w-sm rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] bg-[#f3f0ec]"
              >
                <Image 
                  src={getImg(`gl_img${img.id}_src`, img.fallbackImg)} 
                  fill alt={translate(`gl_img${img.id}_alt`, img.fallbackAlt)} 
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                  unoptimized={!!previewData}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#1a365d]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px]">
                   <span className="text-white font-serif text-xl italic border-b border-white/40 pb-1 px-4 text-center">
                    {translate(`gl_img${img.id}_alt`, img.fallbackAlt)}
                   </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOOTER CTA */}
      <section className="py-32 px-6 text-center">
         <motion.div initial="initial" whileInView="whileInView" variants={fadeInUp} className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl text-[#1a365d] mb-8 italic">
                {translate('gl_footer_title', 'Be part of the next chapter.')}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
                {translate('gl_footer_desc', 'We are always looking for community volunteers and photographers to help us document the fight for equality in Sri Lanka.')}
            </p>
            <div className="flex justify-center gap-6">
               <button className="bg-[#1a365d] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-widest hover:shadow-xl transition-all uppercase">
                {translate('gl_footer_btn1', 'Join the Team')}
               </button>
               <button className="border border-[#1a365d] text-[#1a365d] px-10 py-4 rounded-full text-[10px] font-bold tracking-widest hover:bg-[#f3f0ec] transition-all uppercase">
                {translate('gl_footer_btn2', 'Submit Media')}
               </button>
            </div>
         </motion.div>
      </section>
    </div>
  );
}