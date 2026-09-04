"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useLanguage } from "./context/LanguageContext";

interface HomeContentProps {
  customTitle?: string;
}

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Curated high-quality institutional images for the slider
const impactData = [
  {
    cat: "Legal",
    title: "Human Rights Appeal",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
  },
  {
    cat: "Policy",
    title: "Consortium Meeting",
    img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
  },
  {
    cat: "Community",
    title: "Safe-Space Unity",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
  },
  {
    cat: "Health",
    title: "Recovery Pathways",
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",
  },
  {
    cat: "Education",
    title: "Vocational Skills",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
  },
  {
    cat: "Inclusion",
    title: "Workplace Training",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
  {
    cat: "Advocacy",
    title: "Global Representation",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  },
  {
    cat: "Unity",
    title: "Community Support",
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",
  },
];

export default function HomeContent({ customTitle }: HomeContentProps) {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000 })],
  );
  const [scrollProgress, setScrollProgress] = useState(0);

  // State for Admin Live Preview using strict Record type
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
    if (key === "hero_title_1" && customTitle) return customTitle;
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
    ) {
      return path;
    }
    // Note: getAssetUrl is handled correctly in LanguageContext
    return getAssetUrl(path as string, fallback);
  };

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setScrollProgress(
      Math.max(0, Math.min(1, emblaApi.scrollProgress())) * 100,
    );
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const t = setTimeout(onScroll, 100);
    emblaApi.on("scroll", onScroll);
    return () => clearTimeout(t);
  }, [emblaApi, onScroll]);

  return (
    <div className="w-full bg-[#fdfcf9] text-[#2c3e50] selection:bg-[#e8d5c4] overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-32 flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="w-full lg:w-1/2"
        >
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-2 border-[#1a365d] pl-4">
            {translate("hero_top_label", "TRANS EQUALITY TRUST • SRI LANKA")}
          </span>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#1a365d] mb-6 leading-[1.1] tracking-tighter">
            {translate("hero_title_1", "Protecting")} <br />
            <span className="italic font-normal text-pride-gradient">
              {translate("hero_title_2", "Rights & Hope.")}
            </span>
          </h1>

          <p className="max-w-md text-gray-500 leading-relaxed text-sm md:text-base mb-10 italic">
            {translate(
              "hero_description",
              "Dedicated to protecting the safety and well-being of over 5,000 transgender individuals through systemic advocacy.",
            )}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/donate"
              className="bg-[#1a365d] text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest hover:shadow-xl transition-all uppercase"
            >
              {translate("btn_support", "Support Us")}
            </Link>
            <Link
              href="/about"
              className="border border-[#1a365d] text-[#1a365d] px-8 py-3 rounded-full text-[10px] font-bold tracking-widest hover:bg-[#f3f0ec] transition-all uppercase"
            >
              {translate("btn_mission", "Our Mission")}
            </Link>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 relative h-[450px] md:h-[650px]">
          <div className="absolute top-10 right-0 w-4/5 h-full bg-pride-line opacity-10 blur-[100px] rounded-full animate-pulse"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 right-0 w-4/5 h-full rounded-t-full overflow-hidden shadow-2xl"
          >
            <Image
              /* RESTORED: photo-1573496359142-b8d87734a5a2 */
              src={getImg(
                "hero_image_main",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
              )}
              fill
              alt="Advocacy Header"
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={!!previewData}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-10 left-0 w-1/2 h-1/2 rounded-full border-[12px] border-[#fdfcf9] overflow-hidden shadow-xl z-10"
          >
            <Image
              /* RESTORED: photo-1529156069898-49953e39b3ac */
              src={getImg(
                "hero_image_sub",
                "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80",
              )}
              fill
              alt="Community Support"
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized={!!previewData}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. REAL-WORLD IMPACT */}
      <section className="py-24 bg-[#F8F4FF] overflow-hidden rounded-[4rem] md:rounded-[6rem] mx-4 md:mx-10 shadow-sm border border-blue-50/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <motion.h2
                variants={fadeInUp}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl text-[#1a365d] font-bold italic tracking-tight"
              >
                {translate("impact_title", "Real-World Impact")}
              </motion.h2>
              <p className="text-blue-400 mt-4 text-[9px] font-bold uppercase tracking-[0.4em]">
                {translate(
                  "impact_label",
                  "Documenting Change • 08 Core Pillars",
                )}
              </p>
            </div>
            <Link
              href="/news"
              className="text-[10px] font-bold text-[#4A235A] underline tracking-[0.2em] uppercase hover:text-[#d88998] transition-all"
            >
              {translate("view_journal", "View All Journal")}
            </Link>
          </div>

          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {impactData.map((item, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_85%] md:flex-[0_0_48%] lg:flex-[0_0_23.5%] min-w-0"
                  >
                    <motion.div
                      whileHover={{ y: -10 }}
                      className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[8px] border-white shadow-xl bg-white transition-all"
                    >
                      <Image
                        src={`${item.img}?auto=format&fit=crop&q=80`}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a365d]/90 via-transparent flex flex-col justify-end p-8">
                        <span className="text-pink-300 text-[8px] font-bold uppercase tracking-[0.25em] mb-1">
                          {item.cat}
                        </span>
                        <h3 className="text-white font-serif text-xl font-bold leading-tight">
                          {item.title}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. IMPACT STATS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center group p-10 rounded-[3rem] bg-[#FFF1F5] border border-pink-50 transition-colors"
            >
              <h3 className="font-serif text-5xl text-[#d88998] mb-2">
                {translate(
                  `stat_${i}_val`,
                  i === 1 ? "5,000+" : i === 2 ? "30%" : "Policy",
                )}
              </h3>
              <p className="font-bold text-[#d88998] text-[9px] tracking-[0.3em] uppercase mb-4">
                {translate(
                  `stat_${i}_label`,
                  i === 1
                    ? "Community Scope"
                    : i === 2
                      ? "Recovery Aid"
                      : "Advocacy",
                )}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed italic">
                {translate(
                  `stat_${i}_desc`,
                  "Institutional support provided across the Sri Lankan trans community.",
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. STORYTELLING SECTION */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="w-full md:w-1/2 relative h-[450px] md:h-[600px] group">
            <div className="absolute -inset-6 bg-[#f3f0ec] rounded-[4rem] -rotate-3"></div>
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src={getImg(
                  "story_image",
                  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80",
                )}
                fill
                alt="Breaking Systemic Barriers"
                className="object-cover opacity-90"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={!!previewData}
              />
              <a
                href={translate("story_video_url", "#")}
                target="_blank"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#1a365d] border-b-[12px] border-b-transparent ml-2"></div>
                </div>
              </a>
            </div>
          </div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-full md:w-1/2"
          >
            <span className="text-pink-500 font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">
              {translate("story_label", "Our Advocacy")}
            </span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1a365d] font-bold leading-tight italic mb-8">
              {translate("story_title", "Breaking Systemic Barriers.")}
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10 italic">
              {translate(
                "story_description",
                "Isolation traps many in addiction. TET acts as the family support system these individuals lack—stopping illegal detentions and providing safe recovery paths.",
              )}
            </p>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-[#1a365d]">
                  {translate("story_stat_val", "25-30%")}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  {translate("story_stat_label", "Addiction Rate")}
                </span>
              </div>
              <Link
                href="/services"
                className="bg-[#1a365d] text-white px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase"
              >
                {translate("explore_services", "Explore Services")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
