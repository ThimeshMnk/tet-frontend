"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { locale, setLocale, t, getAssetUrl, isPreview, data } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const languages = [
    { code: "en", label: "EN", name: "English" },
    { code: "si", label: "සිං", name: "සිංහල" },
    { code: "ta", label: "தமி", name: "தமிழ்" },
  ];


  useEffect(() => {
    const handleDrawerMessage = (event: MessageEvent) => {
      if (event.data?.type === "TET_OPEN_NAV_DRAWER") {
        setIsMobileMenuOpen(true);
      }
      if (event.data?.type === "TET_CLOSE_NAV_DRAWER") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("message", handleDrawerMessage);
    return () => window.removeEventListener("message", handleDrawerMessage);
  }, []);
  
  const navLinks = [
    { name: t("nav_home", "Home"), href: "/" },
    { name: t("nav_about", "About"), href: "/about" },
    { name: t("nav_services", "Services"), href: "/services", hasDropdown: true },
    { name: t("nav_projects", "Projects"), href: "/projects" },
    { name: t("nav_gallery", "Events & Gallery"), href: "/gallery" },
    { name: t("nav_activities", "Activities"), href: "/news" },
    { name: t("nav_booking", "Social Enterprise"), href: "/booking" },
    { name: t("nav_contact", "Contact Us"), href: "/contact" },
  ];

  const customLogo = data?.["site_logo"];

  return (
    // 👇 Light Pink Theme Gradient & Border
    <nav className="bg-gradient-to-r from-pink-100/90 via-pink-50/95 to-rose-100/85 backdrop-blur-md sticky top-0 z-50 border-b border-pink-200/80 shadow-sm shadow-pink-100/50">
      {/* Pride accent top line */}
      <div className="h-[2.5px] w-full bg-pride opacity-90"></div>

      <div className="px-4 md:px-8 w-full">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO: Dynamic Uploaded Logo with Fallback to Logo Component */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            {customLogo ? (
              <div className="relative h-9 md:h-12 w-36 md:w-48">
                <Image
                  src={getAssetUrl(customLogo)}
                  fill
                  alt="Trans Equality Trust"
                  className="object-contain object-left"
                  priority
                  unoptimized={isPreview}
                />
              </div>
            ) : (
              <Logo className="h-8 md:h-11 w-auto" />
            )}
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center flex-grow justify-center space-x-5 xl:space-x-7 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-700">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div 
                  key={link.name} 
                  className="relative group" 
                  onMouseEnter={() => setIsServicesOpen(true)} 
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <Link 
                    href={link.href} 
                    className="hover:text-pink-600 transition-colors flex items-center gap-1 py-2"
                  >
                    {link.name}
                    <svg className="w-2.5 h-2.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 8 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 8 }} 
                        className="absolute top-full left-0 pt-1 w-52"
                      >
                        <div className="bg-white/95 backdrop-blur-md shadow-lg shadow-pink-200/50 rounded-2xl py-2 border border-pink-200">
                          <Link 
                            href="/services" 
                            className="block px-4 py-2 hover:bg-pink-50 text-slate-700 hover:text-pink-700 transition-colors text-[10px]"
                          >
                            {t("nav_drop_services", "Advocacy Services")}
                          </Link>
                          <Link 
                            href="/volunteer" 
                            className="block px-4 py-2 hover:bg-pink-50 text-slate-700 hover:text-pink-600 transition-colors text-[10px]"
                          >
                            {t("nav_drop_volunteer", "Volunteer")}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-pink-600 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* RIGHT ACTIONS: DONATE + TRILINGUAL SWITCHER */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* 3-Language Changer Pills */}
            <div className="flex items-center bg-white/90 border border-pink-200 rounded-full p-1 shadow-sm">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLocale(lang.code)}
                  title={lang.name}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase transition-all cursor-pointer ${
                    locale === lang.code
                      ? "bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-sm shadow-pink-200/50 scale-105"
                      : "text-slate-600 hover:text-pink-600"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Donate Button */}
            <Link 
              href={t("nav_donate_url", "/donate")} 
              className="bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full shadow-md shadow-pink-200/50 hover:shadow-sky-200/50 transition-all hover:scale-105 active:scale-95"
            >
              {t("btn_donate", "Donate")}
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button 
            className="lg:hidden p-2 text-slate-700 hover:text-pink-600 transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER (SOFT PINK THEME) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: "auto" }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden bg-gradient-to-b from-pink-50/98 to-white/98 backdrop-blur-md border-b border-pink-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 text-[12px] font-bold uppercase tracking-widest text-slate-700">
              
              <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Language:
                </span>
                <div className="flex gap-1.5 bg-white p-1 rounded-full border border-pink-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        locale === lang.code
                          ? "bg-gradient-to-r from-sky-400 to-pink-400 text-white shadow-sm"
                          : "text-slate-600"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-pink-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-4 pt-2 space-y-2 text-slate-500 text-[10px]">
                      <Link 
                        href="/volunteer" 
                        className="block hover:text-pink-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("nav_drop_volunteer", "Volunteer")}
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-2">
                <Link 
                  href={t("nav_donate_url", "/donate")} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center bg-gradient-to-r from-sky-400 to-pink-400 text-white py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md"
                >
                  {t("btn_donate", "Donate")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}