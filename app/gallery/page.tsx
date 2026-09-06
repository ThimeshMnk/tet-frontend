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

interface EventItem {
  id: number;
  defTitle: string;
  defCategory: string;
  defDate: string;
  defLocation: string;
  defExcerpt: string;
  defFullStory: string;
  defImg: string;
  gallery: string[];
}

export default function GalleryPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
  const data = previewData || initialData;

  // Selected event for inner detail view
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "TET_LIVE_PREVIEW") setPreviewData(event.data.state);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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

  // 6 Curated Events
  const eventsList: EventItem[] = [
    {
      id: 1,
      defCategory: "Community Dialogue",
      defDate: "OCT 14, 2026",
      defLocation: "Colombo, Sri Lanka",
      defTitle: "Voices of Hope: National Transgender Symposium",
      defExcerpt: "Over 120 grassroots organizers gathered in Colombo to discuss affirmative healthcare access and constitutional protection.",
      defFullStory: "The National Transgender Symposium united transgender activists, medical professionals, and human rights lawyers from across Sri Lanka. Key discussion tracks included safe shelter networks, addressing workplace harassment, and drafting legal reform recommendations to eliminate discriminatory laws.",
      defImg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
      gallery: [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
      ]
    },
    {
      id: 2,
      defCategory: "Youth & Empowerment",
      defDate: "SEP 28, 2026",
      defLocation: "Kandy Safe House",
      defTitle: "Peer Circles: Creative Expression & Mental Health",
      defExcerpt: "A safe weekend retreat focusing on art therapy, trauma healing, and peer mentorship for trans youth.",
      defFullStory: "Led by certified counseling liaisons, this workshop provided a non-judgmental sanctuary for gender-diverse youth. Participants engaged in art therapy, storytelling circles, and psycho-social coping strategies, culminating in a collective community mural.",
      defImg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      gallery: [
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
        "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8"
      ]
    },
    {
      id: 3,
      defCategory: "Advocacy & Law",
      defDate: "AUG 19, 2026",
      defLocation: "Galle Heritage Hall",
      defTitle: "Legal Rights & Anti-Discrimination Training",
      defExcerpt: "Training community paralegals to navigate police arbitrary detentions and legal gender recognition paperwork.",
      defFullStory: "This legal education summit equipped community members with critical knowledge regarding fundamental rights under the Constitution of Sri Lanka, safe reporting protocols, and legal identity card (NIC) gender change procedures.",
      defImg: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8",
      gallery: [
        "https://images.unsplash.com/photo-1450133064473-71024230f91b",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
      ]
    },
    {
      id: 4,
      defCategory: "Social Enterprise",
      defDate: "JUL 30, 2026",
      defLocation: "TET Innovation Hub",
      defTitle: "Digital Skills & Freelance Career Bootcamp",
      defExcerpt: "A 4-week vocational technology workshop providing IT skills, graphic design, and freelance career paths.",
      defFullStory: "To foster financial independence, TET partnered with ethical tech firms to offer hands-on training in digital design, coding fundamentals, and remote client management, enabling graduates to secure dignified online employment.",
      defImg: "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998"
      ]
    },
    {
      id: 5,
      defCategory: "Solidarity Gathering",
      defDate: "JUN 18, 2026",
      defLocation: "Negombo Coastline",
      defTitle: "Pride Solidarity Walk & Community Day",
      defExcerpt: "Celebrating transgender pride, identity visibility, and mutual aid along the western coast.",
      defFullStory: "Over 200 community members and allies gathered for a joyful day of music, shared meals, and solidarity speeches celebrating the resilience, beauty, and ongoing struggle of Sri Lanka's transgender community.",
      defImg: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
      gallery: [
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
      ]
    },
    {
      id: 6,
      defCategory: "Healthcare Workshop",
      defDate: "MAY 12, 2026",
      defLocation: "Jaffna Community Clinic",
      defTitle: "Hormone Therapy & Safe Healthcare Forum",
      defExcerpt: "Sensitizing medical professionals and providing free health consultations for transgender individuals.",
      defFullStory: "In collaboration with sensitized physicians, TET hosted a consultation clinic providing blood checkups, affirmative hormone therapy counseling, and psychological wellness assessments in an environment free of stigma.",
      defImg: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
      ]
    }
  ];

  // Social Share Handlers
  const handleShare = (platform: "facebook" | "whatsapp" | "twitter" | "linkedin" | "copy") => {
    if (!selectedEvent) return;
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/gallery?event=${selectedEvent.id}` : "";
    const shareText = `${selectedEvent.defTitle} - Trans Equality Trust Sri Lanka`;

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "whatsapp") {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "linkedin") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#f8fbff] text-slate-800 selection:bg-pink-100 selection:text-sky-900 min-h-screen overflow-x-hidden">
      
      {/* 1. VISUAL STORYTELLING & EVENTS SECTION */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sky-800 font-bold tracking-[0.3em] text-[11px] uppercase mb-4 px-4 py-1.5 bg-sky-100/80 rounded-full border border-sky-200 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
              {translate("gl_events_tag", "COMMUNITY HAPPENINGS • EVENTS & ARCHIVES")}
            </span>

            <h1 className="font-serif text-4xl md:text-6xl font-bold text-sky-950 mb-4 tracking-tight">
              {translate("gl_gallery_title", "Visual Storytelling")} <br />
              <span className="text-pride-gradient italic font-normal font-playfair">
                &amp; Community Events
              </span>
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {translate(
                "gl_gallery_desc",
                "Explore our ongoing gatherings, workshops, and milestones. Click on any event card to read full details and share it to your social media."
              )}
            </p>
          </div>

          {/* 2. EVENT CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {eventsList.map((event, i) => {
              const imgSrc = getImg(`gl_img${event.id}_src`, event.defImg);
              const title = translate(`gl_event_${event.id}_title`, event.defTitle);
              const category = translate(`gl_event_${event.id}_cat`, event.defCategory);
              const date = translate(`gl_event_${event.id}_date`, event.defDate);
              const excerpt = translate(`gl_event_${event.id}_desc`, event.defExcerpt);

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedEvent(event)}
                  className="group bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-sky-200/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Event Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-sky-50">
                      <Image
                        src={imgSrc}
                        fill
                        alt={title}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized={!!previewData}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-sky-950/60 via-transparent to-transparent"></div>

                      {/* Date & Category Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-900 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-sky-200">
                          {category}
                        </span>
                        <span className="text-[10px] font-black text-pink-700 bg-pink-50/95 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200">
                          {date}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white text-xs font-semibold flex items-center gap-1.5 opacity-90">
                        <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.defLocation}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-7">
                      <h3 className="font-serif text-xl font-bold text-sky-950 mb-2.5 leading-snug group-hover:text-sky-700 transition-colors">
                        {title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Link */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-sky-50 text-[11px] font-bold">
                    <span className="text-pink-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read Details &amp; Share →
                    </span>
                    <span className="text-slate-400">TET Archive</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EVENT INNER DETAILS & SOCIAL MEDIA PUBLISH MODAL */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-sky-950/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-sky-200 overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-pink-500 hover:text-white text-sky-900 border border-sky-200 flex items-center justify-center transition-all shadow-md font-bold text-sm cursor-pointer"
                aria-label="Close Event Modal"
              >
                ✕
              </button>

              {/* Modal Banner Image */}
              <div className="relative h-64 md:h-80 w-full overflow-hidden bg-sky-100">
                <Image
                  src={getImg(`gl_img${selectedEvent.id}_src`, selectedEvent.defImg)}
                  fill
                  alt={selectedEvent.defTitle}
                  className="object-cover"
                   sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950/70 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-pink-500 text-white px-3 py-1 rounded-full shadow-sm inline-block mb-2">
                    {selectedEvent.defCategory}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight">
                    {selectedEvent.defTitle}
                  </h2>
                </div>
              </div>

              {/* Inner Details Content */}
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs">
                  <div className="flex items-center gap-2 text-sky-950 font-bold">
                    <span>📅</span>
                    <span>{selectedEvent.defDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sky-950 font-bold">
                    <span>📍</span>
                    <span>{selectedEvent.defLocation}</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
                    Official TET Event
                  </div>
                </div>

                {/* Full Event Description */}
                <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <p>{selectedEvent.defFullStory}</p>
                  <p>{selectedEvent.defExcerpt}</p>
                </div>

                {/* Additional Event Photos */}
                {selectedEvent.gallery.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block mb-3">
                      Event Photo Gallery
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedEvent.gallery.map((gImg, gIdx) => (
                        <div key={gIdx} className="relative h-32 md:h-40 rounded-2xl overflow-hidden border border-sky-100">
                          <Image src={gImg} fill alt="Event Gallery" className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SOCIAL MEDIA PUBLISH & SHARE SECTION */}
                <div className="pt-6 border-t border-sky-100">
                  <span className="text-xs font-black uppercase tracking-wider text-sky-950 block mb-3">
                    📢 Share &amp; Publish this Event
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    {/* Facebook */}
                    <button
                      onClick={() => handleShare("facebook")}
                      className="px-4 py-2.5 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>FB</span>
                      <span>Share</span>
                    </button>

                    {/* WhatsApp */}
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>WA</span>
                      <span>WhatsApp</span>
                    </button>

                    {/* X (Twitter) */}
                    <button
                      onClick={() => handleShare("twitter")}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>X</span>
                      <span>Post</span>
                    </button>

                    {/* LinkedIn */}
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="px-4 py-2.5 rounded-xl bg-[#0a66c2] hover:bg-[#095196] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                    >
                      <span>IN</span>
                      <span>LinkedIn</span>
                    </button>

                    {/* Copy Link */}
                    <button
                      onClick={() => handleShare("copy")}
                      className="px-4 py-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 text-xs font-bold transition-all border border-sky-200 flex items-center gap-1.5 ml-auto"
                    >
                      {copiedLink ? (
                        <span className="text-emerald-700 font-black">Link Copied! ✓</span>
                      ) : (
                        <span>🔗 Copy Link</span>
                      )}
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