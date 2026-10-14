"use client";

import { useState, useEffect, useCallback } from "react";
import type { SpotifyTrackResponse } from "@/app/api/spotify/route";

export function useSpotify(pollIntervalMs = 7000) {
  const [data, setData] = useState<SpotifyTrackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSpotify = useCallback(async () => {
    try {
      const res = await fetch("/api/spotify", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch Spotify data: ${res.status}`);
      }
      const json: SpotifyTrackResponse = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch and polling
  useEffect(() => {
    fetchSpotify();

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchSpotify();
      }
    }, pollIntervalMs);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSpotify();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchSpotify, pollIntervalMs]);

  return {
    data,
    isPlaying: Boolean(data?.isPlaying),
    isLoading,
    error,
    refresh: fetchSpotify,
  };
}
