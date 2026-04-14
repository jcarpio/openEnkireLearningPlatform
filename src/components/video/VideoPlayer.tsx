"use client";

import { useState } from "react";
import { Play, Lock, CheckCircle } from "lucide-react";
import type { VideoProvider } from "@/lib/types";
import { getYouTubeEmbedUrl, getCloudflareStreamUrl } from "@/lib/utils";

interface VideoPlayerProps {
  provider: VideoProvider;
  videoId: string;
  title: string;
  requiresCompletion?: boolean;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function VideoPlayer({
  provider, videoId, title,
  requiresCompletion = false,
  onComplete,
  isCompleted = false,
}: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [watched, setWatched] = useState(isCompleted);

  function getEmbedUrl(): string {
    switch (provider) {
      case "youtube":    return getYouTubeEmbedUrl(videoId) + "&autoplay=1";
      case "cloudflare": return getCloudflareStreamUrl(videoId);
      case "bunny":      return `https://iframe.mediadelivery.net/embed/${videoId}?autoplay=true`;
      default:           return "";
    }
  }

  function handleMarkComplete() {
    setWatched(true);
    onComplete?.();
  }

  return (
    <div className="space-y-4">
      {/* Video */}
      <div className="video-container" style={{ borderRadius: "0.75rem", overflow: "hidden" }}>
        {!playing ? (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
            style={{
              background: "linear-gradient(135deg, #1b1b2e, #2d1b69)",
              cursor: "pointer", border: "none"
            }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                 style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" }}>
              <Play size={32} fill="white" color="white" style={{ marginLeft: "4px" }} />
            </div>
            <p className="text-white font-semibold text-base">{title}</p>
            <p className="text-white/60 text-sm">
              {provider === "youtube" ? "YouTube" : provider === "cloudflare" ? "Cloudflare Stream" : "Bunny.net"} · Click para reproducir
            </p>
          </button>
        ) : (
          <iframe
            src={getEmbedUrl()}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title}
          />
        )}
      </div>

      {/* Provider badge */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
          {provider === "youtube" && (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0000">
                <path d="M23.5 6.5s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.8 2.2 12 2.2 12 2.2s-4.8 0-7.3.2c-.6.1-1.9.1-3 1.3C.8 4.5.5 6.5.5 6.5S.2 8.8.2 11v2.1c0 2.2.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.2 21.8 12 21.8 12 21.8s4.8 0 7.3-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5V11c0-2.2-.3-4.5-.3-4.5zM9.7 15.5v-7.8l8.1 3.9-8.1 3.9z"/>
              </svg>
              Alojado en YouTube
            </>
          )}
          {provider === "cloudflare" && (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f38020">
                <path d="M16.5 15.5c.4-1.4-.1-2.1-1.5-2.1l-7.5.1c-.1 0-.2-.1-.1-.2.1-.1.2-.2.3-.1l7.5-.1c1.9 0 2.7-1.3 3-2.6l.3-1c.3-1.3-.5-2.4-1.8-2.4H5.5c-1.3 0-2.5 1-2.8 2.3L1.5 15c-.3 1.3.5 2.3 1.8 2.3h12.7c.3 0 .5-.2.5-.5v-.3z"/>
              </svg>
              Cloudflare Stream — protegido
            </>
          )}
          {provider === "bunny" && (
            <>
              🐰 Bunny.net Stream — protegido
            </>
          )}
        </div>

        {/* Mark complete button */}
        {requiresCompletion && !watched && playing && (
          <button onClick={handleMarkComplete} className="btn btn-primary btn-s">
            <CheckCircle size={14} />
            Marcar como visto
          </button>
        )}
        {watched && (
          <div className="flex items-center gap-1.5 text-sm font-semibold"
               style={{ color: "var(--color-success)" }}>
            <CheckCircle size={16} />
            Vídeo completado
          </div>
        )}
      </div>

      {/* YouTube privacy note */}
      {provider === "youtube" && (
        <div className="text-xs p-3 rounded-lg" style={{ background: "var(--color-bg)", color: "var(--color-text-muted)" }}>
          💡 <strong>Nota:</strong> Este vídeo usa YouTube Privacy-Enhanced Mode (youtube-nocookie.com).
          Para mayor protección, considera migrar a <strong>Cloudflare Stream</strong> o <strong>Bunny.net</strong>.
        </div>
      )}
    </div>
  );
}
