"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Sub-component for each Project Card with 2-3 Image Gallery
function ProjectCard({
  project,
  translate,
  getImg,
  previewData,
}: {
  project: {
    id: number;
    defCat: string;
    defTitle1: string;
    defTitle2: string;
    defDesc: string;
    defStatus: string;
    defImages: string[];
  };
  translate: (key: string, fallback: string) => string;
  getImg: (key: string, fallback: string) => string;
  previewData: Record<string, string | Record<string, string>> | null;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Retrieve up to 3 dynamic images per project
  const images = [
    getImg(`pj_${project.id}_img1`, project.defImages[0]),
    getImg(`pj_${project.id}_img2`, project.defImages[1]),
    getImg(`pj_${project.id}_img3`, project.defImages[2]),
  ].filter(Boolean);

  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-white/95 backdrop-blur-sm rounded-3xl md:rounded-[2.5rem] border border-sky-200/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all flex flex-col overflow-hidden group"
    >
      {/* CARD IMAGE VIEWER (2-3 Photos) */}
      <div className="p-4 pb-0">
        <div className="relative h-64 sm:h-72 w-full rounded-2xl md:rounded-[1.75rem] overflow-hidden bg-sky-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImageIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={images[activeImageIndex] || project.defImages[0]}
                fill
                alt={translate(`pj_${project.id}_title1`, project.defTitle1)}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={!!previewData}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-sky-950/40 via-transparent to-transparent"></div>

          {/* Floating Status / Category Badge */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-900 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-sky-200">
              {translate(`pj_${project.id}_cat`, project.defCat)}
            </span>
          </div>

          <div className="absolute bottom-4 right-4">
            <span className="text-[10px] font-bold text-pink-700 bg-pink-50/90 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200">
              {translate(`pj_${project.id}_status`, project.defStatus)}
            </span>
          </div>
        </div>

        {/* Thumbnail Selector (2-3 Images) */}
        <div className="flex items-center gap-2.5 pt-3 pb-1 px-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
            Gallery:
          </span>
          {images.map((imgSrc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-12 w-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageIndex === idx
                  ? "border-pink-500 scale-105 shadow-md shadow-pink-200/50"
                  : "border-sky-100 opacity-60 hover:opacity-100 hover:border-sky-300"
              }`}
            >
              <Image
                src={imgSrc}
                fill
                alt={`Thumbnail ${idx + 1}`}
                className="object-cover"
                unoptimized={!!previewData}
                 sizes="(max-width: 768px) 50vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-7 md:p-8 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-sky-950 mb-3 leading-snug">
            {translate(`pj_${project.id}_title1`, project.defTitle1)}{" "}
            <span className="text-pride-gradient italic font-normal">
              {translate(`pj_${project.id}_title2`, project.defTitle2)}
            </span>
          </h3>

          <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6">
            {translate(`pj_${project.id}_desc`, project.defDesc)}
          </p>
        </div>

        <div className="pt-5 border-t border-sky-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-sky-700">
            TET Community Initiative
          </span>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-600 hover:text-pink-700 transition-colors uppercase tracking-wider"
          >
            Get Involved →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

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
    const val = data?.[key];
    if (!val) return fallback;
    return typeof val === "object" ? val[locale] || fallback : val;
  };

  const getImg = (key: string, fallback: string) => {
    const path = data?.[key];
    if (!path) return fallback;
    if (
      typeof path === "string" &&
      (path.includes("livewire") || path.startsWith("blob:"))
    ) {
      return path;
    }
    return getAssetUrl(path, fallback);
  };

  // Projects data with 3 images each
  const projectsList = [
    {
      id: 1,
      defCat: "Legal & Policy Advocacy",
      defTitle1: "Sex Work Policy",
      defTitle2: "Consortium",
      defDesc:
        "A multi-stakeholder advocacy alliance drafting constitutional reform papers and legal safeguards to eliminate arbitrary police detention and systemic discrimination.",
      defStatus: "Active / Phase 02",
      defImages: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
        "https://images.unsplash.com/photo-1450133064473-71024230f91b",
      ],
    },
    {
      id: 2,
      defCat: "Economic Empowerment",
      defTitle1: "Digital Literacy &",
      defTitle2: "Employment Paths",
      defDesc:
        "Vocational training bootcamps providing IT skills, resume building, and dignified corporate placement partnerships for transgender youth in Colombo and Kandy.",
      defStatus: "150+ Graduates",
      defImages: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
      ],
    },
    {
      id: 3,
      defCat: "Emergency Relief & Shelter",
      defTitle1: "TET Safe Spaces &",
      defTitle2: "Crisis Aid",
      defDesc:
        "Providing short-term transitional housing, food relief kits, and crisis mental health counseling for displaced and vulnerable transgender individuals nationwide.",
      defStatus: "24/7 Available",
      defImages: [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
        "https://images.unsplash.com/photo-1573164713988-8665fc963095",
        "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
      ],
    },
    {
      id: 4,
      defCat: "Health & Well-being",
      defTitle1: "Affirmative Healthcare",
      defTitle2: "Access Network",
      defDesc:
        "Bridging community members with sensitized medical practitioners, hormone therapy guidance, and confidential psychiatric counseling free of judgment.",
      defStatus: "Islandwide Support",
      defImages: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982",
      ],
    },
  ];

  return (
    <div className="w-full bg-[#f8fbff] text-slate-800 selection:bg-pink-100 selection:text-sky-900 overflow-x-hidden">
      
      {/* 1. HERO */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-28 text-center">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <span className="text-sky-800 font-bold tracking-[0.3em] text-[11px] uppercase mb-5 px-4 py-1.5 bg-sky-100/80 rounded-full border border-sky-200 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            {translate("pj_hero_label", "STRATEGIC ADVOCACY • OUR PROJECTS")}
          </span>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-sky-950 mb-6 tracking-tight">
            {translate("pj_hero_title1", "Advocacy in")}{" "}
            <span className="text-pride-gradient italic font-normal font-playfair">
              {translate("pj_hero_title2", "Action & Motion.")}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed">
            {translate(
              "pj_hero_desc",
              "Driving long-term systemic change, policy evolution, and economic independence for the transgender community across Sri Lanka.",
            )}
          </p>
        </motion.div>
      </section>

      {/* 2. PROJECT CARDS GRID (Services Style with 2-3 Images per Project) */}
      <section className="pb-28 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {projectsList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              translate={translate}
              getImg={getImg}
              previewData={previewData}
            />
          ))}
        </div>
      </section>

      {/* 3. CALL TO ACTION */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-sky-950 via-[#075985] to-sky-900 rounded-3xl md:rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 italic">
              Partner with our ongoing initiatives.
            </h2>
            <p className="text-sky-100 text-xs md:text-sm mb-8 max-w-xl mx-auto leading-relaxed">
              We collaborate with legal practitioners, community organizations, and international donors to expand these projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/volunteer"
                className="bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-white px-8 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest shadow-md shadow-pink-300/40 hover:scale-105 active:scale-95 transition-all"
              >
                Volunteer with a Project
              </Link>
              <Link
                href="/contact"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-3.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all"
              >
                Contact Project Leads
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}