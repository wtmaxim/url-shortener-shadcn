"use client";

import { useState, useEffect } from "react";

export interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

const STORAGE_KEY = "shortened-urls";

export function useURLStorage() {
  const [urls, setUrls] = useState<ShortenedURL[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les URLs depuis le localStorage au montage
  useEffect(() => {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') {
      setIsLoaded(true);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        const parsedUrls = JSON.parse(stored).map((url: any) => ({
          ...url,
          createdAt: new Date(url.createdAt)
        }));
        setUrls(parsedUrls);
      }
    } catch (error) {
      console.error("Error loading URLs:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sauvegarder les URLs dans le localStorage à chaque changement
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
      } catch (error) {
        console.error("Error saving URLs:", error);
      }
    }
  }, [urls, isLoaded]);

  const addUrl = (url: ShortenedURL) => {
    setUrls(prev => [url, ...prev]);
  };

  const deleteUrl = (id: string) => {
    setUrls(prev => prev.filter(url => url.id !== id));
  };

  const clearAllUrls = () => {
    setUrls([]);
  };

  return {
    urls,
    addUrl,
    deleteUrl,
    clearAllUrls,
    isLoaded
  };
}
