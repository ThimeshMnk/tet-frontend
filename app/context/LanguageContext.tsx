"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://web-production-3c6bc.up.railway.app';

/**
 * 1. Define specific types instead of 'any'
 */
// Represents { en: "text", si: "text", ta: "text" }
type TrilingualTranslations = Record<string, string>;

// A value in our database is either a simple string (image path) 
// or an object containing translations
type SettingValue = string | TrilingualTranslations;

// The entire settings object is a map of keys to these values
interface SettingsMap {
    [key: string]: SettingValue | undefined;
}

interface LanguageContextType {
    locale: string;
    setLocale: (lang: string) => void;
    data: SettingsMap;
    t: (key: string, fallback: string) => string;
    getAssetUrl: (path: SettingValue | null | undefined, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocale] = useState('en');
    const [data, setData] = useState<SettingsMap>({});

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/settings`);
                if (!response.ok) throw new Error('Network response was not ok');
                const json = await response.json();
                setData(json as SettingsMap);
            } catch (err) {
                console.error("API Error:", err);
            }
        };
        fetchSettings();
    }, []);

    const t = useCallback((key: string, fallback: string): string => {
        const val = data[key];
        if (!val) return fallback;
        
        // If it's an object, get the translated string
        if (typeof val === 'object' && val !== null) {
            return val[locale] || val['en'] || fallback;
        }
        
        // If it's already a string, return it
        return val;
    }, [data, locale]);

    const getAssetUrl = useCallback((path: SettingValue | null | undefined, fallback: string = ''): string => {
        if (!path) return fallback;

        let finalPath: string = '';

        // If path is a translation object (accidental passing of text key)
        if (typeof path === 'object' && path !== null) {
            finalPath = path[locale] || Object.values(path)[0] || '';
        } else {
            finalPath = path;
        }

        if (!finalPath || typeof finalPath !== 'string') return fallback;

        if (finalPath.startsWith('http://') || finalPath.startsWith('https://') || finalPath.startsWith('blob:')) {
            return finalPath;
        }

        return `${API_BASE}/storage/${finalPath}`;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, data, t, getAssetUrl }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};