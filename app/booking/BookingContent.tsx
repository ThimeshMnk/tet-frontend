"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BookingPage() {
  const { locale, data: initialData, getAssetUrl } = useLanguage();
  const [previewData, setPreviewData] = useState<Record<string, string | Record<string, string>> | null>(null);
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

  return (
    <div className="w-full bg-[#f8fbff] text-slate-800 selection:bg-pink-100 selection:text-sky-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-28 text-center">
        <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={fadeInUp}>
          <span className="text-sky-800 font-bold tracking-[0.3em] text-[11px] uppercase mb-4 px-4 py-1.5 bg-sky-100/80 rounded-full border border-sky-200 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            {translate("se_hero_badge", "TET SOCIAL ENTERPRISES • SELF-SUSTAINING BUSINESSES")}
          </span>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-sky-950 mb-6 tracking-tight leading-tight">
            {translate("se_hero_title1", "Purpose-Driven")}{" "}
            <span className="text-pride-gradient italic font-normal font-playfair">
              {translate("se_hero_title2", "Enterprises.")}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed mb-10">
            {translate(
              "se_hero_desc",
              "Our businesses fund our community mission. 100% of the proceeds generated from hall bookings, daily care center services, and condom sales directly fund legal defense, shelter, and medical support for transgender individuals."
            )}
          </p>

          {/* Quick Anchor Navigation */}
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#hall-booking" className="px-5 py-2.5 rounded-full bg-white border border-sky-200 text-sky-900 text-xs font-bold hover:border-pink-300 hover:shadow-sm transition-all">
              🏛️ Hall Booking
            </a>
          
            <a href="#condom-business" className="px-5 py-2.5 rounded-full bg-white border border-pink-200 text-pink-700 text-xs font-bold hover:bg-pink-50 hover:shadow-sm transition-all">
              🛡️ Safe Products (Condoms)
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. BUSINESS 1: HALL & VENUE BOOKING */}
      <section id="hall-booking" className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl md:rounded-[3.5rem] p-8 md:p-16 border border-sky-200/80 shadow-md flex flex-col lg:flex-row items-center gap-12">
          
          <div className="w-full lg:w-1/2 relative h-[380px] md:h-[500px] rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-sky-100 shadow-xl border-4 border-white">
            <Image
              src={getImg("se_hall_img", "https://images.unsplash.com/photo-1517457373958-b7bdd4587205")}
              fill
              alt="TET Hall Booking"
              className="object-cover"
              unoptimized={!!previewData}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-950/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-sky-950 border border-sky-200">
              📍 Capacity: 50 – 200 Guests
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="text-sky-800 font-bold tracking-[0.25em] text-[10px] uppercase mb-2 px-3 py-1 bg-sky-50 rounded-full border border-sky-200">
              {translate("se_hall_tag", "VENUE HIRE • SOCIAL ENTERPRISE")}
            </span>

            <h2 className="font-serif text-3xl md:text-5xl font-bold text-sky-950 mb-4 leading-tight">
              {translate("se_hall_title1", "TET Event Halls &")} <br />
              <span className="text-pride-gradient italic font-normal">
                {translate("se_hall_title2", "Space Booking.")}
              </span>
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {translate(
                "se_hall_desc",
                "Looking for a professional, inclusive venue for corporate meetings, workshops, art exhibitions, or civil celebrations? Our spaces offer full audiovisual setups, high-speed Wi-Fi, air conditioning, and flexible seating layouts."
              )}
            </p>

            {/* Hall Features Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8 text-xs">
              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100">
                <span className="font-bold text-sky-950 block">🔊 Audio / Visual Equipment</span>
                <span className="text-slate-500 text-[11px]">HD Projectors &amp; PA Sound Setup</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100">
                <span className="font-bold text-sky-950 block">☕ Kitchen &amp; Catering Access</span>
                <span className="text-slate-500 text-[11px]">Tea, coffee &amp; dining service prep</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100">
                <span className="font-bold text-sky-950 block">♿ Accessible &amp; Safe Space</span>
                <span className="text-slate-500 text-[11px]">Zero-discrimination guarantee</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100">
                <span className="font-bold text-sky-950 block">🏷️ Competitive Rates</span>
                <span className="text-slate-500 text-[11px]">Hourly, half-day &amp; full-day packages</span>
              </div>
            </div>

            <Link
              href="/contact?subject=HallBooking"
              className="bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md shadow-pink-200/50 hover:scale-105 active:scale-95 transition-all"
            >
              {translate("se_hall_btn", "Check Hall Availability & Pricing")}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS 2: DAILY CARE CENTER */}
      {/* <section id="daily-care" className="py-20 bg-gradient-to-b from-[#ebf6ff]/70 via-white to-[#fdf2f8]/70 border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-pink-600 font-bold uppercase text-[10px] tracking-[0.25em] block mb-2">
              {translate("se_care_tag", "COMPASSIONATE COMMUNITY SERVICES")}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-sky-950 mb-4">
              {translate("se_care_title1", "TET Daily")} {" "}
              <span className="text-pride-gradient italic font-normal">
                {translate("se_care_title2", "Care Center.")}
              </span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {translate(
                "se_care_desc",
                "Our daily care center provides daytime care, elderly respite, and inclusive child supervision. Staffed by trained and certified community caregivers in a warm, dignified, and loving environment."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Daytime Child Supervision",
                desc: "Secure, creative, and joyful care for children while parents are at work. Includes educational playtime and nutritious snacks.",
                icon: "🎨",
                tag: "Child Day Care",
              },
              {
                title: "Senior & Elder Respite Care",
                desc: "Companionship, gentle recreational exercises, and medication assistance for elders who need daytime attention in a respectful space.",
                icon: "👵",
                tag: "Elder Care",
              },
              {
                title: "Certified Community Caregivers",
                desc: "Every caregiver on our team has completed verified first-aid, nutrition, and respectful caregiving certifications.",
                icon: "❤️",
                tag: "Certified Team",
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="bg-white/95 p-8 rounded-3xl border border-sky-200/80 shadow-sm hover:shadow-lg hover:border-pink-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl mb-4 block">{srv.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200 inline-block mb-3">
                    {srv.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-sky-950 mb-3">{srv.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-6 mt-4 border-t border-sky-50 text-[11px] font-bold text-sky-700">
                  Daily &amp; Monthly Packages Available
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact?subject=DailyCareInquiry"
              className="inline-block bg-white border border-sky-300 hover:border-pink-400 text-sky-900 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-sky-50 transition-all"
            >
              {translate("se_care_btn", "Enroll / Inquire About Day Care Services")}
            </Link>
          </div>
        </div>
      </section> */}

      {/* 4. BUSINESS 3: CONDOM & SEXUAL HEALTH PRODUCTS */}
      <section id="condom-business" className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl md:rounded-[3.5rem] p-8 md:p-16 border-2 border-pink-200 shadow-xl overflow-hidden relative">
          
          <div className="max-w-2xl mb-12 text-left">
            <span className="text-pink-600 font-bold uppercase text-[10px] tracking-[0.25em] block mb-2">
              {translate("se_prod_tag", "SEXUAL HEALTH & WELLNESS ENTERPRISE")}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-sky-950 mb-4">
              {translate("se_prod_title1", "Affordable Protection.")} <br />
              <span className="text-pride-gradient italic font-normal font-playfair">
                {translate("se_prod_title2", "Condom & Wellness Products.")}
              </span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {translate(
                "se_prod_desc",
                "TET operates a social marketing business supplying certified, premium-grade condoms and barrier protection products. We provide high-quality, discreetly packaged safe sex essentials at accessible prices while funding free community HIV/STI screening."
              )}
            </p>
          </div>

          {/* Product Items Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                id: 1,
                title: "Ultra-Thin Sensitive Latex Condoms",
                desc: "Internationally ISO 4074 certified latex condoms designed for maximum sensitivity, durability, and reliable protection.",
                specs: "Box of 3 • Packs of 12",
                badge: "Top Seller",
                price: "LKR 450 / pack",
                icon: "🛡️",
              },
              {
                id: 2,
                title: "Extra-Lubricated Barrier Protection",
                desc: "Pre-lubricated with non-sticky, skin-safe formula providing frictionless comfort and tear-resistance.",
                specs: "Packs of 12 • Bulk 50s",
                badge: "High Durability",
                price: "LKR 550 / pack",
                icon: "💧",
              },
              {
                id: 3,
                title: "Community Safe-Sex Wellness Kits",
                desc: "Includes 6 condoms, 3 water-based lubricant sachets, and trilingual sexual health education guides.",
                specs: "Full Wellness Kit",
                badge: "Inclusive Kit",
                price: "LKR 750 / kit",
                icon: "🎁",
              },
            ].map((prod) => (
              <div
                key={prod.id}
                className="bg-gradient-to-b from-sky-50/50 to-pink-50/30 p-7 rounded-3xl border border-sky-100 flex flex-col justify-between hover:border-pink-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{prod.icon}</span>
                    <span className="text-[10px] font-bold text-pink-700 bg-pink-100 px-3 py-1 rounded-full uppercase">
                      {prod.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-sky-950 mb-2">{prod.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed mb-4">{prod.desc}</p>
                  <div className="text-[11px] font-semibold text-sky-800 mb-1">{prod.specs}</div>
                </div>

                <div className="pt-4 border-t border-sky-200/60 flex items-center justify-between">
                  <span className="text-sm font-black text-sky-950">{prod.price}</span>
                  <Link
                    href="/contact?subject=ProductOrder"
                    className="text-[10px] font-bold text-pink-600 hover:text-pink-700 uppercase"
                  >
                    Order Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Business Features Pill Bar */}
          <div className="p-6 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <span>📦</span> 100% Discreet Islandwide Delivery
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <span>🏢</span> Bulk Supplies for NGOs, Clinics &amp; Hospitality
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <span>🧪</span> International Quality ISO Tested
            </div>
            <div>
              <Link
                href="/contact?subject=BulkCondomOrders"
                className="bg-gradient-to-r from-sky-500 to-pink-500 text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-105 transition-all inline-block"
              >
                {translate("se_prod_btn", "Inquire for Bulk Orders")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ETHICAL REINVESTMENT CTA */}
      {/* <section className="pb-24 px-6 text-center">
        <div className="max-w-3xl mx-auto p-10 bg-sky-950 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3 italic">
            Empowering Transgender Dignity Through Social Business
          </h3>
          <p className="text-sky-100 text-xs md:text-sm leading-relaxed mb-6">
            When you hire our halls, place a child in our care center, or purchase our health products, you create stable employment and sustain human rights advocacy in Sri Lanka.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-sky-400 to-pink-400 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-md hover:scale-105 transition-all"
          >
            Partner With Our Enterprises
          </Link>
        </div>
      </section> */}
    </div>
  );
}