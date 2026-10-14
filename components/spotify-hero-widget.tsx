"use client";

import { FaSpotify } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { SpotifyEqualizer } from "./spotify-equalizer";
import type { SpotifyTrackResponse } from "@/app/api/spotify/route";

interface SpotifyHeroWidgetProps {
  data: SpotifyTrackResponse | null;
  isPlaying: boolean;
  isLoading: boolean;
}

export function SpotifyHeroWidget({
  data,
  isPlaying,
  isLoading,
}: SpotifyHeroWidgetProps) {
  // If actively playing
  if (isPlaying && data) {
    return (
      <a
        href={data.songUrl || "https://open.spotify.com"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl bg-white/75 dark:bg-[#0b0f1a]/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#1DB954]/50 dark:hover:border-[#1DB954]/50 shadow-sm hover:shadow-[0_4px_20px_rgba(29,185,84,0.15)] transition-all duration-300 max-w-[270px] sm:max-w-[320px]"
      >
        {/* Album Cover */}
        <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-800 border border-black/5 dark:border-white/10 group-hover:scale-105 transition-transform duration-300">
          {data.albumImageUrl ? (
            <img
              src={data.albumImageUrl}
              alt={data.album || "Album cover"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#1DB954]/10 text-[#1DB954]">
              <FaSpotify className="text-xl" />
            </div>
          )}
          {/* Overlay arrow badge on cover */}
          <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <HiArrowUpRight className="text-white text-sm" />
          </div>
        </div>

        {/* Song Info */}
        <div className="flex flex-col min-w-0 pr-1">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#1DB954] tracking-wider uppercase">
              Listening Now
            </span>
            <SpotifyEqualizer isPlaying={true} size="sm" />
          </div>

          <p className="text-xs sm:text-[13px] font-medium text-neutral-900 dark:text-neutral-100 truncate group-hover:text-[#1DB954] transition-colors">
            {data.title || "Unknown Track"}
          </p>

          <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
            {data.artist || "Unknown Artist"}
          </p>
        </div>

        {/* Spotify Icon */}
        <div className="shrink-0 ml-auto pl-1">
          <FaSpotify className="text-[#1DB954] text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(29,185,84,0.4)] group-hover:scale-110 transition-transform duration-200" />
        </div>
      </a>
    );
  }

  // If recently played
  if (data?.isRecentlyPlayed && data.title) {
    return (
      <a
        href={data.songUrl || "https://open.spotify.com"}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl bg-white/60 dark:bg-[#0b0f1a]/60 backdrop-blur-md border border-neutral-200/70 dark:border-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs transition-all duration-300 max-w-[260px] sm:max-w-[300px]"
      >
        {data.albumImageUrl ? (
          <img
            src={data.albumImageUrl}
            alt={data.album || "Album cover"}
            className="w-8 h-8 rounded-lg object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <FaSpotify className="text-neutral-400 text-base" />
        )}

        <div className="flex flex-col min-w-0 pr-1">
          <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
            Last played
          </span>
          <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
            {data.title}
          </p>
        </div>

        <FaSpotify className="shrink-0 ml-auto text-neutral-400 group-hover:text-[#1DB954] text-base transition-colors" />
      </a>
    );
  }

  // Offline / Not Playing State
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-[#0b0f1a]/60 backdrop-blur-md border border-neutral-200/60 dark:border-neutral-800/60 text-neutral-500 dark:text-neutral-400 text-xs">
      <FaSpotify className="text-neutral-400 text-sm" />
      <span className="text-[11px] font-medium">Spotify offline</span>
    </div>
  );
}
