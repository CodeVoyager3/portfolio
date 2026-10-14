"use client";

import { motion } from "framer-motion";

interface SpotifyEqualizerProps {
  isPlaying?: boolean;
  barColor?: string;
  size?: "sm" | "md";
}

export function SpotifyEqualizer({
  isPlaying = true,
  barColor = "bg-[#1DB954]",
  size = "md",
}: SpotifyEqualizerProps) {
  const heights = [
    [0.3, 1, 0.4, 0.85, 0.3],
    [0.7, 0.3, 0.95, 0.45, 0.7],
    [0.25, 0.85, 0.4, 1, 0.25],
    [0.8, 0.35, 1, 0.5, 0.8],
  ];

  const durations = [1.1, 0.85, 1.3, 0.95];

  const barWidth = size === "sm" ? "w-[2px]" : "w-[3px]";
  const containerHeight = size === "sm" ? "h-3" : "h-4";

  return (
    <div className={`flex items-end gap-[2px] ${containerHeight} px-0.5`} aria-hidden="true">
      {heights.map((keyframes, idx) => (
        <motion.span
          key={idx}
          className={`${barWidth} rounded-full ${barColor}`}
          initial={{ height: "30%" }}
          animate={
            isPlaying
              ? {
                  height: keyframes.map((h) => `${Math.round(h * 100)}%`),
                }
              : { height: "25%" }
          }
          transition={
            isPlaying
              ? {
                  duration: durations[idx],
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "reverse",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}
