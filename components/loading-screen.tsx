"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Words that reflect the developer's portfolio identity
const WORDS = ["Build", "Ship", "Inspire"];
const TOTAL_DURATION = 2700;
const WORD_DURATION = 900;

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev >= WORDS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, WORD_DURATION);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const rawProgress = (elapsed / TOTAL_DURATION) * 100;
      const newProgress = Math.min(rawProgress, 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          onCompleteRef.current();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-9999"
      style={{
        backgroundColor: "var(--background)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Top-left: name label */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 flex flex-col gap-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span
          className="text-xs md:text-sm uppercase tracking-[0.3em]"
          style={{ color: "var(--muted-foreground)" }}
        >
          Portfolio
        </span>
        <span
          className="text-xs tracking-wide"
          style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
        >
          Amritesh Kumar Rai
        </span>
      </motion.div>

      {/* Center: rotating words */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-(family-name:--font-instrument-serif) italic"
            style={{ color: "var(--foreground)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
        <motion.span
          className="text-xs md:text-sm tracking-[0.25em] uppercase"
          style={{ color: "var(--muted-foreground)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Loading your experience
        </motion.span>
      </div>

      {/* Bottom-right: counter */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-(family-name:--font-instrument-serif) tabular-nums select-none"
        style={{ color: "var(--foreground)", opacity: 0.12 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {Math.round(progress).toString().padStart(3, "0")}
      </motion.div>

      {/* Bottom-left: progress percentage */}
      <motion.div
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-xs tabular-nums"
        style={{ color: "var(--muted-foreground)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {Math.round(progress)}%
      </motion.div>

      {/* Progress bar at bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: "var(--border)" }}
      >
        <motion.div
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, var(--primary) 0%, #818cf8 100%)",
            boxShadow: "0 0 8px color-mix(in srgb, var(--primary) 40%, transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
