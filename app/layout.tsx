import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton"; // 👈 1. Import component

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Trans Equality Trust (TET) | Sri Lanka",
  description: "Protecting the rights, safety, and well-being of the transgender community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-gradient-to-br from-sky-50/40 via-white to-pink-50/40 text-slate-800 antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          
          {/* 👈 2. Floating WhatsApp Icon */}
          <WhatsAppButton phoneNumber="94771234567" />
        </LanguageProvider>
      </body>
    </html>
  );
}