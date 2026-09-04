"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import FontSizeControl from "./FontSizeControl";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { locale, setLocale, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Projects", href: "/projects" },
    { name: "Events & Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
    { name: "Social Enterprise", href: "/booking" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-50/90 via-white/95 to-blue-50/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#f3f0ec]">
      <div className="h-[2px] w-full bg-pride opacity-80"></div>

      <div className="px-4 md:px-8 w-full">
        <div className="flex justify-between h-20 items-center">
          
          <Link href="/" className="flex-shrink-0">
            <Logo className="h-8 md:h-11 w-auto" />
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center flex-grow justify-center space-x-6 xl:space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8e7f71]">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div key={link.name} className="relative group" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                  <Link href={link.href} className="hover:text-[#1a365d] transition-colors flex items-center gap-1">
                    {link.name}
                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  </Link>
                  {/* Dropdown */}
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 pt-2 w-48">
                        <div className="bg-white shadow-xl rounded-xl py-2 border border-[#f3f0ec]">
                          <Link href="/services" className="block px-4 py-2 hover:bg-slate-50 text-[#1a365d]">Advocacy Services</Link>
                          <Link href="/volunteer" className="block px-4 py-2 hover:bg-slate-50 text-[#1a365d]">Volunteer</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.name} href={link.href} className="hover:text-[#1a365d] transition-colors whitespace-nowrap">
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <Link href="/donate" className="bg-[#1a365d] text-white text-[9px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:shadow-lg transition-all">
              {t('btn_donate', 'Donate')}
            </Link>
            <FontSizeControl />
          </div>

          <button className="lg:hidden p-2 text-[#1a365d]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} /></svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-b border-[#f3f0ec] overflow-hidden">
            <div className="flex flex-col p-6 space-y-4 text-[12px] font-bold uppercase tracking-widest text-[#1a365d]">
              {navLinks.map((link) => (
                <div key={link.name}>
                    <Link href={link.href} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</Link>
                    {link.hasDropdown && (
                        <div className="pl-4 pt-2 text-[#8e7f71] text-[10px]">
                            <Link href="/volunteer" className="block py-1">Volunteer</Link>
                        </div>
                    )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
  );
}