"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const RAW_API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://web-production-3c6bc.up.railway.app";
const API_BASE = RAW_API_BASE.replace(/\/+$/, "");

export type TrilingualTranslations = Record<string, string>;
export type SettingValue = string | TrilingualTranslations;
export type SettingsMap = Record<string, SettingValue | undefined>;

interface LanguageContextType {
  locale: string;
  setLocale: (lang: string) => void;
  data: SettingsMap;
  isPreview: boolean;
  t: (key: string, fallback?: string) => string;
  getAsset: (keyOrPath: SettingValue | null | undefined, fallback?: string) => string;
  getAssetUrl: (keyOrPath: SettingValue | null | undefined, fallback?: string) => string; // 👈 Add this
}
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<string>("en");
  const [initialData, setInitialData] = useState<SettingsMap>({});
  const [previewData, setPreviewData] = useState<SettingsMap | null>(null);

  // 1. Fetch initial settings on initial client mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/settings`);
        if (!response.ok) throw new Error("Settings fetch failed");
        const json = await response.json();
        setInitialData(json as SettingsMap);
      } catch (err) {
        console.error("API Settings Fetch Error:", err);
      }
    };
    fetchSettings();
  }, []);

  // 2. Global Livewire live-preview message listener
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "TET_LIVE_PREVIEW") {
        setPreviewData(event.data.state);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Priority merge: preview state overrides saved state
  const mergedData = useMemo<SettingsMap>(() => {
    return { ...initialData, ...(previewData || {}) };
  }, [initialData, previewData]);

  // 3. Centralized translation reader
  const t = useCallback(
    (key: string, fallback: string = ""): string => {
      const val = mergedData[key];
      if (val === undefined || val === null || val === "") return fallback;

      if (typeof val === "object") {
        return val[locale] || val["en"] || fallback;
      }

      return String(val);
    },
    [mergedData, locale]
  );

  // 4. Centralized asset resolver for setting keys, full URLs, blobs, or storage paths
  // Unified Asset Resolver
  const getAsset = useCallback(
    (keyOrPath: SettingValue | null | undefined, fallback: string = ""): string => {
      if (!keyOrPath) return fallback;

      let target: SettingValue | undefined = keyOrPath;

      // Check if keyOrPath is a key in settings
      if (typeof keyOrPath === "string") {
        if (keyOrPath in mergedData) {
          target = mergedData[keyOrPath];
        } else if (!keyOrPath.includes("/") && !keyOrPath.includes(".")) {
          // It's a key name (e.g. 'hero_image_main') that doesn't exist yet in the DB -> return fallback!
          return fallback;
        }
      }

      // If target is empty, null, or undefined -> return fallback
      if (!target) return fallback;

      let finalPath = "";
      if (typeof target === "object") {
        finalPath = target[locale] || target["en"] || Object.values(target)[0] || "";
      } else {
        finalPath = String(target).trim();
      }

      if (!finalPath) return fallback;

      // Handle full URLs, Livewire preview temporary URLs, and blob paths
      if (
        finalPath.startsWith("http://") ||
        finalPath.startsWith("https://") ||
        finalPath.startsWith("blob:") ||
        finalPath.includes("livewire")
      ) {
        return finalPath;
      }

      const cleanPath = finalPath.replace(/^\/+/, "");
      const normalizedPath = cleanPath.startsWith("storage/")
        ? cleanPath.replace(/^storage\//, "")
        : cleanPath;

      return `${API_BASE}/storage/${normalizedPath}`;
    },
    [mergedData, locale]
  );

 // 2. In the Provider return value, alias getAssetUrl to getAsset:
  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        data: mergedData,
        isPreview: Boolean(previewData),
        t,
        getAsset,
        getAssetUrl: getAsset, // 👈 Add this line (points to the same resolver)
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};