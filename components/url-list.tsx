"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Trash2, Calendar, Link, MoreHorizontal } from "lucide-react";
import { IconLink } from "@tabler/icons-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShortenedURL {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: Date;
}

interface URLListProps {
  urls: ShortenedURL[];
  onDeleteUrl: (id: string) => void;
}

export function URLList({ urls, onDeleteUrl }: URLListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  if (urls.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Shortened URLs</CardTitle>
        </CardHeader>
        <CardContent>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconLink className="h-12 w-12 text-muted-foreground" />
              </EmptyMedia>
              <EmptyTitle>No Shortened URLs</EmptyTitle>
              <EmptyDescription>
                You haven&apos;t shortened any URLs yet. Start by shortening your first URL above!
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex gap-2">
                <Button size="sm" disabled>
                  <Link className="h-4 w-4 mr-2" />
                  Shorten a URL
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Shortened URLs ({urls.length})</CardTitle>
        </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {urls.map((url) => (
            <Item variant="outline" key={url.id}>
              <ItemHeader>
                <ItemMedia>
                  <Link className="h-5 w-5 text-muted-foreground" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      ID: {url.id}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {formatDate(url.createdAt)}
                    </div>
                  </ItemTitle>
                  <ItemDescription>
                    <span className="block space-y-2">
                      <span className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Original:</span>
                        <span className="text-blue-600 hover:text-blue-800 hover:underline text-sm break-all">
                          <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {truncateUrl(url.originalUrl)}
                          </a>
                        </span>
                      </span>
                      
                      <span className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Short:</span>
                        <span className="inline-block">
                          <a
                            href={url.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {url.shortUrl}
                          </a>
                        </span>
                      </span>
                    </span>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <div className="flex items-center gap-2">
                    <ButtonGroup>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(url.originalUrl, `original-${url.id}`)}
                        className="h-6 px-2"
                      >
                        {copiedId === `original-${url.id}` ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(url.shortUrl, `short-${url.id}`)}
                        className="h-6 px-2"
                      >
                        {copiedId === `short-${url.id}` ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-6 px-2"
                      >
                        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </ButtonGroup>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-6 px-2">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => copyToClipboard(url.originalUrl, `original-${url.id}`)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Original URL
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => copyToClipboard(url.shortUrl, `short-${url.id}`)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Short URL
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Open Original URL
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => onDeleteUrl(url.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete URL
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </ItemActions>
              </ItemHeader>
            </Item>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
