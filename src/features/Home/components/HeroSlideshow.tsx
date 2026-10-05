"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Same 3 background images used on the client's previous site (secnx.com).
const SLIDES = [
  "/assets/slideshow/slide-1.jpg",
  "/assets/slideshow/slide-2.jpg",
  "/assets/slideshow/slide-3.jpg",
];

// Matches the old site's timing: every 5s the image fades out (1s),
// swaps, then fades back in (1s).
const INTERVAL_MS = 5000;
const FADE_MS = 1000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let swapTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setVisible(false);
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % SLIDES.length);
        setVisible(true);
      }, FADE_MS);
    }, INTERVAL_MS);

    return () => {
      clearInterval(interval);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-black" aria-hidden="true">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          preload={i === 0}
          sizes="100vw"
          className="object-cover object-top transition-opacity ease-linear"
          style={{
            opacity: i === index && visible ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
    </div>
  );
}
