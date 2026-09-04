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

export default function BookingPage() {
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
      <section className="relative max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-24 min-h-[80vh] flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          variants={fadeInUp}
          className="w-full lg:w-1/2 flex flex-col items-start text-left z-20"
        >
          <span className="text-[#8e7f71] font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block border-l-2 border-[#1a365d] pl-4">
            {translate("bk_hero_label", "TET SOCIAL ENTERPRISE")}
          </span>
          <h1 className="font-serif text-6xl md:text-8xl text-[#1a365d] mb-6 leading-[0.9] tracking-tighter">
            {translate("bk_hero_title1", "TET")} <br />{" "}
            <span className="italic font-normal text-[#8e7f71]">
              {translate("bk_hero_title2", "Spaces.")}
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl font-serif text-[#1a365d]/70 italic mb-8 max-w-md">
            {translate(
              "bk_hero_sub",
              "A calm sanctuary for business, synergy, and meaningful community change.",
            )}
          </h2>
          <p className="max-w-md text-gray-500 leading-relaxed text-sm mb-10">
            {translate(
              "bk_hero_desc",
              "TET Spaces is an initiative established by the Trans Equality Trust.",
            )}
          </p>
          <div className="flex gap-6">
            <button className="bg-[#1a365d] text-white px-10 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase">
              {translate("bk_btn_discover", "Discover TET Spaces")}
            </button>
          </div>
        </motion.div>

        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[700px] mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute top-0 right-0 w-4/5 h-full rounded-t-full overflow-hidden shadow-2xl z-10"
          >
            <Image
              src={getImg(
                "bk_hero_main",
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
              )}
              fill
              alt="Venue"
              className="object-cover"
              unoptimized={!!previewData}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-[-5%] left-0 w-56 h-56 md:w-80 md:h-80 rounded-full border-[15px] border-[#fdfcf9] overflow-hidden shadow-2xl z-20"
          >
            <Image
              src={getImg(
                "bk_hero_sub",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
              )}
              fill
              alt="Detail"
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized={!!previewData}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-xl">
              <Image
                src={getImg(
                  "bk_phi_img",
                  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
                )}
                fill
                alt="Interior"
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized={!!previewData}
              />
            </div>
          </div>
          <motion.div {...fadeInUp} className="w-full md:w-1/2">
            <h3 className="font-serif text-4xl md:text-5xl text-[#1a365d] mb-8 leading-tight">
              {translate("bk_phi_title1", "More than a venue.")} <br />{" "}
              <span className="italic font-normal text-[#8e7f71]">
                {translate("bk_phi_title2", "A space for possibility.")}
              </span>
            </h3>
            <div className="space-y-6 text-gray-500 text-base leading-relaxed">
              <p>
                {translate(
                  "bk_phi_p1",
                  "TET Spaces provides professional venue services...",
                )}
              </p>
              <p>
                {translate(
                  "bk_phi_p2",
                  "Every rupee spent contributes to the community...",
                )}
              </p>
            </div>
            <div className="mt-12 p-8 bg-[#fdfcf9] rounded-3xl border border-[#f3f0ec]">
              <p className="font-serif italic text-[#1a365d] text-lg">
                &quot;
                {translate(
                  "bk_phi_quote",
                  "TET was created in response to the barriers...",
                )}
                &quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE SPACES (CIRCLES) */}
      <section className="py-24 text-center px-6">
        <div className="max-w-4xl mx-auto mb-24 italic font-serif text-3xl text-[#1a365d] border-t border-b border-[#f3f0ec] py-12">
          {translate(
            "bk_spaces_quote",
            "Every booking at TET contributes to this vision.",
          )}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Defined Categories for better structure */}
          {[
            {
              id: 1,
              key: "meeting",
              title: "Meeting Rooms",
              img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
            },
            {
              id: 2,
              key: "event",
              title: "Event Halls",
              img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=80",
            },
            {
              id: 3,
              key: "studio",
              title: "Creative Studios",
              img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
            },
            {
              id: 4,
              key: "lounge",
              title: "Social Lounge",
              img: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a",
            },
          ].map((space) => (
            <div
              key={space.id}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl relative mb-8">
                <Image
                  src={getImg(
                    `bk_space_${space.key}_img`, // Dynamic key based on category
                    space.img, // Default image per category
                  )}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  alt={space.title}
                  className="object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  unoptimized={!!previewData}
                />
              </div>
              <span className="text-[9px] font-bold text-[#8e7f71] uppercase tracking-[0.25em] mb-2">
                {translate(`bk_space_${space.key}_cat`, space.title)}
              </span>
              <h4 className="font-serif text-2xl italic text-[#1a365d]">
                {translate(`bk_space_${space.key}_title`, space.title)}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
