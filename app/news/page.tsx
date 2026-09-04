"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const categories = [
  "All",
  "Advocacy",
  "Healthcare",
  "Empowerment",
  "Institutional",
];

// Standard Feed (Non-manageable via Landing CMS - usually handled by Post CRUD)
const posts = [
  {
    title: "Healthcare Sensitization Workshops",
    cat: "Healthcare",
    date: "Aug 24, 2026",
    excerpt:
      "A look into our recent workshops designed to eliminate medical mistreatment.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
  },
  {
    title: "Economic Resilience Forum",
    cat: "Empowerment",
    date: "Aug 02, 2026",
    excerpt:
      "Bridging the gap between marginalized communities and stable employment.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
  },
  {
    title: "Consortium Project Update",
    cat: "Institutional",
    date: "July 15, 2026",
    excerpt: "Finalizing drafts proposing protections for community members.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
  },
];

export default function NewsPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<
    string,
    string | Record<string, string>
  > | null>(null);
  const [activeCat, setActiveCat] = useState("All");

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
    <div className="bg-[#fdfcf9] min-h-screen selection:bg-[#e8d5c4]">
      {/* 1. HEADER */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto border-b border-[#f3f0ec] pb-12">
          <motion.div
            initial="initial"
            animate="whileInView"
            variants={fadeInUp}
          >
            <span className="text-[#8e7f71] font-bold text-[10px] tracking-[0.4em] uppercase mb-4 block">
              {translate("nw_hero_label", "Journal & Media Center")}
            </span>
            <h1 className="font-serif text-6xl md:text-8xl text-[#1a365d] mb-6 italic tracking-tight">
              {translate("nw_hero_title", "The Journal.")}
            </h1>
            <p className="text-gray-500 max-w-xl leading-relaxed text-sm italic">
              {translate(
                "nw_hero_desc",
                "Insights into the systemic fight for equality, community resilience stories, and official institutional announcements.",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY NAV */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCat === cat ? "bg-[#1a365d] text-white shadow-lg" : "bg-white text-[#8e7f71] border border-[#f3f0ec] hover:border-[#1a365d]/30"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED POST */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="group flex flex-col lg:flex-row bg-white rounded-[4rem] overflow-hidden border border-[#f3f0ec] shadow-sm hover:shadow-xl transition-all duration-700">
            <div className="w-full lg:w-3/5 relative h-[400px] lg:h-[600px] overflow-hidden">
              <Image
                src={getImg(
                  "nw_feat_img",
                  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
                )}
                fill
                alt="Featured"
                loading="eager"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                unoptimized={!!previewData}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute top-8 left-8 bg-[#d88998] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {translate("nw_feat_badge", "Featured Story")}
              </div>
            </div>
            <div className="w-full lg:w-2/5 p-12 md:p-20 flex flex-col justify-center">
              <span className="text-[#8e7f71] font-bold text-[10px] uppercase tracking-widest mb-4 block">
                {translate("nw_feat_cat", "Advocacy")} •{" "}
                {translate("nw_feat_date", "Sept 12, 2026")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-8 leading-tight">
                {translate(
                  "nw_feat_title",
                  "National Appeal Against Illegal Detentions Submitted",
                )}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-10">
                {translate(
                  "nw_feat_excerpt",
                  "TET leads a coalition of human rights groups to address the systemic harassment of transgender individuals.",
                )}
              </p>
              <span className="text-[#1a365d] font-black text-[10px] uppercase tracking-[0.3em] border-b border-[#1a365d]/20 pb-1 group-hover:border-[#1a365d] transition-all self-start cursor-pointer">
                {translate("nw_feat_btn", "Read Investigation")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE FEED (Looping secondary posts) */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {posts.map((post, i) => (
            <motion.div
              key={i}
              initial="initial"
              whileInView="whileInView"
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col group"
            >
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-lg border-[12px] border-white transition-all duration-500 group-hover:shadow-2xl mb-8">
                <Image
                  src={post.img}
                  fill
                  alt="Post"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <span className="text-[#d88998] font-bold text-[9px] uppercase tracking-widest mb-3 block">
                {post.cat} • {post.date}
              </span>
              <h3 className="font-serif text-2xl text-[#1a365d] leading-tight mb-4 group-hover:text-[#d88998] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PRESS CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto bg-[#334155] rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8d5c4]/5 rounded-full blur-[80px]"></div>
          <div className="relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl italic mb-6">
              {translate("nw_press_title", "Press & Inquiries.")}
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm leading-relaxed mb-10">
              {translate(
                "nw_press_desc",
                "For official statements, interview requests with Kasuni Mayadunna, or partnership details, please contact our media desk.",
              )}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href={`mailto:${translate("nw_press_email", "media@transequalitytrust.lk")}`}
                className="bg-white text-[#334155] px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#e8d5c4] transition-all"
              >
                {translate("nw_press_btn1", "Email Media Desk")}
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                {translate("nw_press_btn2", "View Press Kit")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
