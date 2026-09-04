"use client";
import { useSearchParams } from 'next/navigation';
import HomeContent from '../HomeContent';

export default function PreviewPage() {
    const searchParams = useSearchParams();
    
    // Get text from URL query parameters sent by Laravel
    const title = searchParams.get('title') || "Protecting Rights & Hope.";

    return (
        <div className="preview-mode">
            {/* We pass the 'title' into HomeContent as a prop */}
            <HomeContent customTitle={title} />
        </div>
    );
}