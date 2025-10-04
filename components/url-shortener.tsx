"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Copy, Check } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

interface URLShortenerProps {
  onUrlShortened: (url: ShortenedURL) => void;
}

export function URLShortener({ onUrlShortened }: URLShortenerProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateShortId = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) return;
    
    // Ajouter https:// si l'URL ne commence pas par http:// ou https://
    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl;
    }

    if (!isValidUrl(fullUrl)) {
      alert("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const shortId = generateShortId();
    const shortUrl = `${window.location.origin}/${shortId}`;
    
    const newShortenedUrl: ShortenedURL = {
      id: shortId,
      originalUrl: fullUrl,
      shortUrl: shortUrl,
      createdAt: new Date()
    };
    
    onUrlShortened(newShortenedUrl);
    setUrl("");
    setIsLoading(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="h-5 w-5" />
          URL Shortener
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="url-input">URL to Shorten</FieldLabel>
              <div className="flex gap-2">
                <Input
                  id="url-input"
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !url.trim()}>
                  {isLoading ? "Shortening..." : "Shorten"}
                </Button>
              </div>
              <FieldDescription>
                Enter a valid URL to create a shortened version
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
