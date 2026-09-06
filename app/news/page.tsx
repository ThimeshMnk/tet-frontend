"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
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
  "Field Aid",
  "Healthcare",
  "Empowerment",
  "Advocacy",
  "Safe Spaces",
];

interface ActivityItem {
  id: number;
  title: string;
  cat: string;
  date: string;
  location: string;
  excerpt: string;
  fullStory: string;
  img: string;
}

const dailyActivities: ActivityItem[] = [
  {
    id: 1,
    title: "Healthcare Sensitization & Hospital Outreach",
    cat: "Healthcare",
    date: "Today • Aug 24, 2026",
    location: "Colombo General Hospital Area",
    excerpt: "Conducted medical orientation sessions for outpatient staff to eliminate stigma against transgender patients.",
    fullStory: "Our field team visited outpatient facilities to provide staff with respectful interaction guidelines, hormone care referrals, and legal identity verification protocols, ensuring transgender patients receive affirmative and dignified care.",
    img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Economic Resilience & Small Business Grants",
    cat: "Empowerment",
    date: "Aug 20, 2026",
    location: "Kandy District Centre",
    excerpt: "Disbursed micro-grants and financial literacy tools to 12 trans-led micro enterprises and freelancers.",
    fullStory: "Through our economic recovery fund, 12 beneficiaries received seed micro-grants for baking, tailoring, and freelance tech equipment, accompanied by one-on-one bookkeeping coaching.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Emergency Crisis Intervention & Shelter Distribution",
    cat: "Field Aid",
    date: "Aug 15, 2026",
    location: "Galle Safe Space Hub",
    excerpt: "Assisted three displaced trans youth with urgent housing aid, nutrition rations, and psycho-social checkups.",
    fullStory: "Responding to emergency hotline calls, our rapid response coordinators safely transferred three at-risk community members into temporary shelter and connected them with affirmative counselors.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Legal Identity Paperwork & NIC Clinic",
    cat: "Advocacy",
    date: "Aug 10, 2026",
    location: "Negombo Community Hall",
    excerpt: "Assisted 24 community members in submitting official legal gender and name change applications.",
    fullStory: "Our legal aid officers reviewed birth certificates, medical certificates, and DS paperwork to streamline name and gender marker corrections on National Identity Cards without arbitrary harassment.",
    img: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    title: "Safe Youth Peer Circle & Healing Workshop",
    cat: "Safe Spaces",
    date: "Aug 05, 2026",
    location: "TET Colombo Studio",
    excerpt: "Held a closed peer-mentorship circle focusing on resilience, self-acceptance, and mental wellness.",
    fullStory: "Led by trans peer leaders, 30 young participants shared personal journeys, participated in grounding exercises, and built support bonds in a 100% confidential and loving environment.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    title: "Nutritional Rations & Community Care Drive",
    cat: "Field Aid",
    date: "July 28, 2026",
    location: "Ratnapura Outskirts",
    excerpt: "Distributed monthly food rations and hygiene care packs to elderly and vulnerable community elders.",
    fullStory: "TET volunteers packed and transported dry food rations, sanitary packages, and basic medicine to elder transgender members who face social isolation and reduced employment opportunities.",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80",
  },
];

export default function NewsPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
  const [activeCat, setActiveCat] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const data = previewData || initialData;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TET_LIVE_PREVIEW") setPreviewData(event.data.state);
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
    if (typeof path === "string" && (path.includes("livewire") || path.startsWith("blob:"))) return path;
    return getAssetUrl(path, fallback);
  };

  // Filter activities
  const filteredActivities = activeCat === "All"
    ? dailyActivities
    : dailyActivities.filter((a) => a.cat.toLowerCase() === activeCat.toLowerCase());

  // Share to Facebook function
  const shareToFacebook = (activity: ActivityItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/news?activity=${activity.id}`
      : "https://transequalitytrust.lk/news";
    
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(activity.title + " - Trans Equality Trust Daily Activities")}`;
    window.open(fbUrl, "_blank", "width=600,height=500");
  };

  // Share to WhatsApp
  const shareToWhatsApp = (activity: ActivityItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/news?activity=${activity.id}`
      : "https://transequalitytrust.lk/news";
    const msg = `*${activity.title}*\n${activity.excerpt}\nRead more: ${shareUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Copy link
  const copyLink = (activity: ActivityItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = typeof window !== "undefined"
      ? `${window.location.origin}/news?activity=${activity.id}`
      : "https://transequalitytrust.lk/news";
    navigator.clipboard.writeText(shareUrl);
    setCopiedId(activity.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#f8fbff] min-h-screen text-slate-800 selection:bg-pink-100 selection:text-sky-900 pb-24">
      
      {/* 1. HEADER */}
      <section className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto border-b border-sky-100 pb-10 text-center md:text-left">
          <motion.div initial="initial" animate="whileInView" variants={fadeInUp}>
            <span className="text-sky-800 font-bold text-[11px] tracking-[0.3em] uppercase mb-4 px-3.5 py-1.5 bg-sky-100/80 rounded-full border border-sky-200 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              {translate("act_hero_label", "GRASSROOTS IN ACTION • DAILY FIELD UPDATES")}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-sky-950 mb-4 tracking-tight">
              {translate("act_hero_title1", "Daily")}{" "}
              <span className="text-pride-gradient italic font-normal font-playfair">
                {translate("act_hero_title2", "Activities.")}
              </span>
            </h1>
            <p className="text-slate-600 max-w-2xl text-sm md:text-base leading-relaxed">
              {translate(
                "act_hero_desc",
                "Real-time updates, field visits, community support sessions, and grassroots interventions happening across Sri Lanka. Share these stories directly to Facebook to spread awareness."
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCat === cat
                  ? "bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-md shadow-pink-200/60 scale-105"
                  : "bg-white text-slate-600 border border-sky-200/80 hover:border-pink-300 hover:text-sky-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DAILY ACTIVITIES GRID */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredActivities.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial="initial"
              whileInView="whileInView"
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedActivity(activity)}
              className="group bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-sky-200/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Photo & Category Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky-50">
                  <Image
                    src={getImg(`act_${activity.id}_img`, activity.img)}
                    fill
                    alt={activity.title}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-900 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-sky-200">
                      {activity.cat}
                    </span>
                    <span className="text-[10px] font-bold text-pink-700 bg-pink-50/95 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200">
                      {activity.date}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-white text-xs font-semibold flex items-center gap-1.5 opacity-90">
                    <span>📍</span>
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-7">
                  <h3 className="font-serif text-xl font-bold text-sky-950 mb-2.5 leading-snug group-hover:text-sky-700 transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {activity.excerpt}
                  </p>
                </div>
              </div>

              {/* SOCIAL POST SHARING BAR (Facebook, WhatsApp, Copy) */}
              <div className="p-6 pt-3 border-t border-sky-50 flex items-center justify-between bg-sky-50/30">
                <span className="text-[11px] font-bold text-pink-600 group-hover:underline">
                  View Full Details →
                </span>

                {/* Share Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Share on Facebook */}
                  <button
                    type="button"
                    onClick={(e) => shareToFacebook(activity, e)}
                    title="Share as Facebook Post"
                    className="flex items-center gap-1 bg-[#1877f2] hover:bg-[#166fe5] text-white px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Post</span>
                  </button>

                  {/* Share on WhatsApp */}
                  <button
                    type="button"
                    onClick={(e) => shareToWhatsApp(activity, e)}
                    title="Share on WhatsApp"
                    className="p-1.5 rounded-full bg-[#25d366] hover:bg-[#20bd5a] text-white shadow-sm transition-all"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                    </svg>
                  </button>

                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={(e) => copyLink(activity, e)}
                    title="Copy Link"
                    className="p-1.5 rounded-full bg-white hover:bg-sky-100 text-sky-800 border border-sky-200 shadow-sm transition-all text-xs"
                  >
                    {copiedId === activity.id ? "✓" : "🔗"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. ACTIVITY DETAIL MODAL */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-sky-950/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-sky-200 overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-pink-500 hover:text-white text-sky-900 border border-sky-200 flex items-center justify-center transition-all shadow-md font-bold text-sm cursor-pointer"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative h-64 w-full bg-sky-100">
                <Image
                  src={selectedActivity.img}
                  fill
                  alt={selectedActivity.title}
                  className="object-cover"
                   sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-500 text-white px-3 py-1 rounded-full shadow-sm inline-block mb-2">
                    {selectedActivity.cat}
                  </span>
                  <h2 className="font-serif text-2xl font-bold leading-tight">
                    {selectedActivity.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs">
                  <div className="font-bold text-sky-950">📅 {selectedActivity.date}</div>
                  <div className="font-bold text-sky-950">📍 {selectedActivity.location}</div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                    TET Field Report
                  </div>
                </div>

                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>{selectedActivity.fullStory}</p>
                  <p>{selectedActivity.excerpt}</p>
                </div>

                {/* Facebook & Social Sharing Bar */}
                <div className="pt-6 border-t border-sky-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-950">
                    Publish / Share Update:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => shareToFacebook(selectedActivity)}
                      className="px-4 py-2 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={() => shareToWhatsApp(selectedActivity)}
                      className="px-4 py-2 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}