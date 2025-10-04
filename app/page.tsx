"use client";

import { URLShortener } from "@/components/url-shortener";
import { URLList } from "@/components/url-list";
import { useURLStorage } from "@/hooks/use-url-storage";

export default function Home() {
  const { urls, addUrl, deleteUrl, isLoaded } = useURLStorage();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              URL Shortener
            </h1>
            <p className="text-xl text-muted-foreground">
              A modern URL shortener built with shadcn/ui components
            </p>
          </div>

          {/* URL Shortener Form */}
          <URLShortener onUrlShortened={addUrl} />

          {/* URL List */}
          <URLList urls={urls} onDeleteUrl={deleteUrl} />
        </div>
      </div>
    </div>
  );
}
