"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function ProjectsPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<
    string,
    string | Record<string, string>
  > | null>(null);
  const data = previewData || initialData;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TET_LIVE_PREVIEW") {
        setPreviewData(event.data.state);
      }
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
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 md:pt-24 text-center">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={fadeInUp}
        >
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block">
            {translate("pj_hero_label", "STRATEGIC ADVOCACY • 2026 PORTFOLIO")}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-[#1a365d] mb-6 italic tracking-tight leading-tight">
            {translate("pj_hero_title", "Advocacy in Motion.")}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base italic">
            {translate(
              "pj_hero_desc",
              "Driving systemic change through targeted initiatives...",
            )}
          </p>
        </motion.div>
      </section>

      {/* 2. PROJECT 01 */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            variants={fadeInUp}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <span className="font-serif text-5xl text-[#e8d5c4] block mb-8 underline decoration-1">
              01
            </span>
            <span className="text-[#d88998] font-bold text-[10px] uppercase tracking-widest mb-4 block">
              {translate("pj1_cat", "Flagship Consortium")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-8 leading-tight">
              {translate("pj1_title1", "Sex Work Policy")} <br />{" "}
              <span className="italic font-normal">
                {translate("pj1_title2", "Consortium.")}
              </span>
            </h2>
            <div className="space-y-6 text-gray-500 text-sm leading-relaxed mb-10">
              <p>{translate("pj1_p1", "Paragraph 1 fallback...")}</p>
              <p>{translate("pj1_p2", "Paragraph 2 fallback...")}</p>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-[#f3f0ec] shadow-sm">
              <div className="flex justify-between items-end mb-4">
                <span className="text-[10px] font-bold text-[#1a365d] uppercase tracking-widest">
                  {translate("pj1_status_label", "Drafting Progress")}
                </span>
                <span className="font-serif text-[#d88998] italic">
                  {translate("pj1_status_val", "Active / Phase 02")}
                </span>
              </div>
              <div className="h-1 w-full bg-[#f3f0ec] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${translate("pj1_progress", "65")}%` }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-[#1a365d]"
                />
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative h-[450px] md:h-[650px] w-full rounded-t-full overflow-hidden shadow-2xl">
              <Image
                src={getImg(
                  "pj1_img",
                  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
                )}
                fill
                alt="Project"
                className="object-cover"
                unoptimized={!!previewData}
                 sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROJECT 02 */}
      <section className="py-24 bg-[#f3f0ec] rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-10 mb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border-[12px] border-white shadow-2xl">
              <Image
                src={getImg(
                  "pj2_img",
                  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
                )}
                fill
                alt="Impact"
                className="object-cover"
                unoptimized={!!previewData}
                 sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          </div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            variants={fadeInUp}
            className="w-full lg:w-1/2"
          >
            <span className="font-serif text-5xl text-[#e8d5c4] block mb-8 underline decoration-1">
              02
            </span>
            <span className="text-[#8e7f71] font-bold text-[10px] uppercase tracking-widest mb-4 block">
              {translate("pj2_cat", "Economic Development")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-8 leading-tight">
              {translate("pj2_title1", "Digital Literacy &")} <br />{" "}
              <span className="italic font-normal">
                {translate("pj2_title2", "Employment.")}
              </span>
            </h2>
            <p className="text-gray-500 text-sm mb-10">
              {translate("pj2_desc", "Description text...")}
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/40">
              <div>
                <p className="text-3xl font-serif text-[#1a365d]">
                  {translate("pj2_stat1_val", "150+")}
                </p>
                <p className="text-[9px] font-bold text-[#8e7f71] uppercase tracking-widest">
                  {translate("pj2_stat1_label", "Graduates")}
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#1a365d]">
                  {translate("pj2_stat2_val", "40%")}
                </p>
                <p className="text-[9px] font-bold text-[#8e7f71] uppercase tracking-widest">
                  {translate("pj2_stat2_label", "Placements")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
