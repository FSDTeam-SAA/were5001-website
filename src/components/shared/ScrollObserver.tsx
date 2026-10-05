"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
  useEffect(() => {
    // Select all elements marked for scroll entrance animation
    const elements = document.querySelectorAll(".reveal-init");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            // Unobserve once revealed so it runs once smoothly
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
