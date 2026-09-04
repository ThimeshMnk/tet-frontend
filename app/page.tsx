"use client";

import dynamic from 'next/dynamic';

// This handles the client-side rendering purely, eliminating lag and hydration errors
const HomeContent = dynamic(() => import('./HomeContent'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#fdfcf9]" />
});

export default function Page() {
  return <HomeContent />;
}