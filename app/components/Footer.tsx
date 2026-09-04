"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0f172a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Column 1: Identity & Socials */}
          <div className="space-y-8">
            <Link href="/">
              <Logo className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              {t('footer_desc', 'Sri Lanka’s leading advocacy group protecting the rights, safety, and choice of the transgender community.')}
            </p>
            <div className="flex gap-4">
              {["FB", "IG", "LN"].map((soc) => (
                <div
                  key={soc}
                  className="w-9 h-9 rounded-full border border-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-500 hover:text-white hover:border-white transition-all cursor-pointer"
                >
                  {soc}
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Organization Navigation */}
          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
              {t('footer_head_org', 'Organization')}
            </h4>
            <ul className="space-y-4 text-[13px] text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  {t('nav_about', 'About TET')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  {t('nav_services', 'Our Services')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  {t('nav_projects', 'Advocacy Projects')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">
                  {t('nav_news', 'Media Center')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Initiatives & Impact */}
          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-8">
              {t('footer_head_init', 'Initiatives')}
            </h4>
            <ul className="space-y-4 text-[13px] text-slate-400">
              <li>
                <Link href="/booking" className="hover:text-white transition">
                  {t('nav_booking', 'TET Spaces (Social Enterprise)')}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  {t('footer_legal_manual', 'Legal Rights Manual')}
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white transition">
                  {t('nav_volunteer', 'Volunteer Registry')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  {t('nav_contact', 'Emergency Hotline')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support Card */}
          <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.3em] mb-4">
              {t('footer_head_support', 'Support Our Work')}
            </h4>
            <p className="text-slate-400 text-xs mb-8 leading-relaxed">
              {t('footer_support_text', 'Your contribution directly funds 24/7 legal aid and rehabilitation paths.')}
            </p>
            <Link
              href="/donate"
              className="block w-full text-center bg-white text-[#0f172a] font-bold text-[10px] uppercase tracking-widest py-4 rounded-xl hover:bg-[#e8d5c4] transition-all"
            >
              {t('btn_donate', 'Make a Donation')}
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {t('footer_copy', 'Trans Equality Trust Sri Lanka.')}
          </p>
          <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <Link href="/privacy" className="hover:text-white transition">
              {t('footer_privacy', 'Privacy Policy')}
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              {t('footer_terms', 'Terms & Conditions')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}