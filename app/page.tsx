"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("./HomeContent"), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#fdfcf9]" />,
});

export default function Page() {
  return <HomeContent />;
}