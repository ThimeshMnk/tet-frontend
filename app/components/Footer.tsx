"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-[#ebf6ff] via-[#d8efff] to-[#c5e6ff] pt-20 pb-12 border-t-2 border-sky-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Identity & Socials */}
          <div className="space-y-6">
            <Link href="/">
              <Logo className="h-10 w-auto" />
            </Link>
            <p className="text-sky-900/85 text-sm leading-relaxed italic">
              {t('footer_desc', 'Sri Lanka’s leading advocacy group protecting the rights, safety, and choice of the transgender community.')}
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "LN"].map((soc) => (
                <div
                  key={soc}
                  className="w-9 h-9 rounded-full bg-white border border-sky-300 flex items-center justify-center text-[10px] font-bold text-sky-700 hover:text-white hover:bg-sky-500 hover:border-sky-500 transition-all cursor-pointer shadow-sm shadow-sky-200/50"
                >
                  {soc}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Organization Navigation */}
          <div>
            <h4 className="text-sky-950 font-black text-[11px] uppercase tracking-[0.25em] mb-6">
              {t('footer_head_org', 'Organization')}
            </h4>
            <ul className="space-y-3.5 text-[13px] text-sky-900 font-semibold">
              <li>
                <Link href="/about" className="hover:text-pink-600 transition-colors">
                  {t('nav_about', 'About TET')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-pink-600 transition-colors">
                  {t('nav_services', 'Our Services')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-pink-600 transition-colors">
                  {t('nav_projects', 'Advocacy Projects')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-pink-600 transition-colors">
                  {t('nav_news', 'Media Center')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Initiatives & Impact */}
          <div>
            <h4 className="text-sky-950 font-black text-[11px] uppercase tracking-[0.25em] mb-6">
              {t('footer_head_init', 'Initiatives')}
            </h4>
            <ul className="space-y-3.5 text-[13px] text-sky-900 font-semibold">
              <li>
                <Link href="/booking" className="hover:text-pink-600 transition-colors">
                  {t('nav_booking', 'TET Spaces (Social Enterprise)')}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-pink-600 transition-colors">
                  {t('footer_legal_manual', 'Legal Rights Manual')}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-pink-600 transition-colors">
                  {t('nav_volunteer', 'Volunteer Registry')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-pink-600 transition-colors">
                  {t('nav_contact', 'Emergency Hotline')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support Card */}
          <div className="bg-white/90 backdrop-blur-sm p-7 rounded-[1.75rem] border-2 border-sky-200 shadow-md shadow-sky-300/40">
            <h4 className="text-sky-950 font-black text-[11px] uppercase tracking-[0.25em] mb-3">
              {t('footer_head_support', 'Support Our Work')}
            </h4>
            <p className="text-sky-900/80 text-xs mb-6 leading-relaxed">
              {t('footer_support_text', 'Your contribution directly funds 24/7 legal aid and rehabilitation paths.')}
            </p>
            <Link
              href="/donate"
              className="block w-full text-center bg-gradient-to-r from-sky-400 to-pink-400 hover:from-sky-500 hover:to-pink-500 text-white font-black text-[10px] uppercase tracking-widest py-3.5 rounded-xl shadow-md shadow-sky-300/50 hover:shadow-pink-300/60 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {t('btn_donate', 'Make a Donation')}
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 border-t border-sky-300/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sky-800 text-[10px] font-bold uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} {t('footer_copy', 'Trans Equality Trust Sri Lanka.')}
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.15em] text-sky-800">
            <Link href="/privacy" className="hover:text-pink-600 transition-colors">
              {t('footer_privacy', 'Privacy Policy')}
            </Link>
            <Link href="/terms" className="hover:text-pink-600 transition-colors">
              {t('footer_terms', 'Terms & Conditions')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}