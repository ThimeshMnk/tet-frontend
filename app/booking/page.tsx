"use client"; // This is the missing piece that fixes the Build Error

import dynamic from 'next/dynamic';

// Now Next.js allows ssr: false because this parent file is marked as a Client Component
const BookingContent = dynamic(() => import('./BookingContent'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-[#faf9f6]" />
});

export default function Page() {
  return <BookingContent />;
}