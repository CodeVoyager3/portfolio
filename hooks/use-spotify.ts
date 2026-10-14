"use client";

import { useState, useEffect, useCallback } from "react";
import type { SpotifyTrackResponse } from "@/app/api/spotify/route";

export function useSpotify(pollIntervalMs = 7000) {
  const [data, setData] = useState<SpotifyTrackResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const fetchSpotify = useCallback(async (demoMode = isDemo) => {
    try {
      const url = demoMode ? "/api/spotify?demo=true" : "/api/spotify";
      const res = await fetch(url, { cache: "no-store" });
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
  }, [isDemo]);

  // Initial fetch and polling
  useEffect(() => {
    fetchSpotify(isDemo);

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchSpotify(isDemo);
      }
    }, pollIntervalMs);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchSpotify(isDemo);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchSpotify, isDemo, pollIntervalMs]);

  const toggleDemo = () => {
    setIsDemo((prev) => {
      const next = !prev;
      fetchSpotify(next);
      return next;
    });
  };

  return {
    data,
    isPlaying: Boolean(data?.isPlaying),
    isLoading,
    error,
    isDemo,
    toggleDemo,
    refresh: () => fetchSpotify(isDemo),
  };
}
