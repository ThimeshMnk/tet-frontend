"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";



const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function VolunteerPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
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
    <div className="w-full bg-[#fdfcf9] text-[#2c3e50] selection:bg-[#e9d5ff] overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-32 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="w-full lg:w-1/2 flex flex-col items-start text-left z-20"
        >
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-2 border-[#7c3aed] pl-4">
            {translate("v_hero_label", "COMMUNITY & COLLECTIVE ACTION")}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#1a365d] mb-6 leading-[1.1] tracking-tighter">
            {translate("v_hero_title1", "Join the")} <br />
            <span className="italic font-normal text-pride-gradient">
              {translate("v_hero_title2", "Movement.")}
            </span>
          </h1>
          <p className="max-w-md text-gray-500 leading-relaxed text-sm md:text-base italic mb-10">
            {translate(
              "v_hero_desc",
              "Lend your expertise to help us protect over 5,000 community members. We bridge the gap between systemic barriers and human dignity.",
            )}
          </p>
          <div className="flex gap-6">
            <a
              href="#register"
              className="bg-[#1a365d] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-widest hover:shadow-xl transition-all uppercase shadow-md"
            >
              {translate("v_hero_btn1", "Volunteer Registry")}
            </a>
            <button className="text-[#7c3aed] font-bold text-[10px] uppercase tracking-widest border-b border-[#7c3aed]/20 hover:border-[#7c3aed] pb-1 transition-all">
              {translate("v_hero_btn2", "Why We Need You")}
            </button>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 relative h-[450px] md:h-[650px]">
          <div className="absolute top-10 right-0 w-4/5 h-full bg-purple-200/30 blur-[100px] rounded-full animate-pulse"></div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 right-0 w-full h-full rounded-t-full overflow-hidden shadow-2xl"
          >
            <Image
              src={getImg(
                "v_hero_img",
                "https://images.unsplash.com/photo-1531482615713-2afd69097998",
              )}
              fill
              alt="Community"
              className="object-cover"
              priority
               sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized={!!previewData}
            />
            <div className="absolute inset-0 bg-purple-900/10 mix-blend-multiply"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. AREAS OF IMPACT */}
      <section className="py-32 bg-[#f5f3ff]/50 rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-10 shadow-sm border border-purple-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-4 italic">
              {translate("v_exp_title", "Areas of Expertise")}
            </h2>
            <p className="text-[#8e7f71] text-[10px] font-bold uppercase tracking-[0.3em]">
              {translate(
                "v_exp_label",
                "Where your skills drive systemic change",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                id: 1,
                defIcon: "⚖️",
                defTitle: "Legal Counsel",
                defDesc:
                  "Assisting with constitutional rights and illegal detention appeals.",
              },
              {
                id: 2,
                defIcon: "🩺",
                defTitle: "Health & Well-being",
                defDesc:
                  "Clinical or peer support for rehabilitation programs.",
              },
              {
                id: 3,
                defIcon: "💻",
                defTitle: "Digital Advocacy",
                defDesc:
                  "Digital literacy and design to amplify community voices.",
              },
              {
                id: 4,
                defIcon: "🎪",
                defTitle: "Event Synergy",
                defDesc:
                  "Organizing safe-space gatherings and social enterprise events.",
              },
            ].map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[3rem] border border-purple-100/50 text-center flex flex-col items-center group transition-all"
              >
                <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all">
                  {translate(`v_exp_${role.id}_icon`, role.defIcon)}
                </div>
                <h3 className="font-serif text-xl text-[#1a365d] mb-4">
                  {translate(`v_exp_${role.id}_title`, role.defTitle)}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed italic">
                  {translate(`v_exp_${role.id}_desc`, role.defDesc)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. REGISTRY FORM */}
      <section id="register" className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[4rem] overflow-hidden shadow-2xl border border-purple-50 flex flex-col lg:flex-row-reverse">
          <div className="w-full lg:w-3/5 p-12 md:p-20">
            <h3 className="font-serif text-3xl md:text-4xl text-[#1a365d] mb-10 tracking-tight">
              {translate("v_form_title", "Volunteer Registry.")}
            </h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  className="w-full border-b border-purple-100 py-4 outline-none text-sm"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  className="w-full border-b border-purple-100 py-4 outline-none text-sm"
                  placeholder="hello@humanity.lk"
                />
              </div>
              <div className="pt-6">
                <button className="bg-[#1a365d] text-white px-12 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {translate("v_form_btn", "Submit Application")}
                </button>
              </div>
            </form>
          </div>

          <div className="hidden lg:block w-2/5 relative">
            <Image
              src={getImg(
                "v_form_img",
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
              )}
              fill
              alt="Unity"
              className="object-cover"
               sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized={!!previewData}
            />
            <div className="absolute inset-0 bg-[#7c3aed]/10 backdrop-blur-[1px]"></div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER QUOTE */}
      <section className="py-24 px-6 text-center border-t border-purple-50">
        <div className="max-w-2xl mx-auto">
          <span className="text-4xl text-[#7c3aed]/40 mb-6 block font-serif">
            &quot;
          </span>
          <p className="font-serif text-2xl md:text-3xl text-[#1a365d] italic mb-6 leading-relaxed">
            {translate(
              "v_footer_quote",
              "Collective strength is the only path toward systemic equality. Your time is an investment in human dignity.",
            )}
          </p>
          <p className="text-[9px] font-bold text-[#8e7f71] uppercase tracking-[0.4em]">
            {translate("v_footer_cite", "Trans Equality Trust Leadership")}
          </p>
        </div>
      </section>
    </div>
  );
}
