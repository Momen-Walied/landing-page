"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- small logo ---------- */
const BreezeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2.75L13.75 10.25L21.25 12L13.75 13.75L12 21.25L10.25 13.75L2.75 12L10.25 10.25L12 2.75Z"
      stroke="#F97A53"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- product data ---------- */
const PRODUCTS = [
  {
    id: 1,
    title: "Literature Review Agent",
    description: "Searches and synthesizes across papers with grounded citations to accelerate reviews.",
    image: "/placeholder-user.jpg",
    action: "Generate review",
  },
  {
    id: 2,
    title: "Paper Reading Agent",
    description: "Understands academic PDFs — methods, datasets, limitations — and links references.",
    image: "/placeholder-logo.png",
    action: "Upload paper",
  },
  {
    id: 3,
    title: "Citation & QA Agent",
    description: "Answers questions with sources and exports BibTeX for your library manager.",
    image: "/placeholder-user.jpg",
    action: "Ask a question",
    badge: "Beta",
  },
  {
    id: 4,
    title: "Data Extraction Agent",
    description: "Extracts tables, figures and numeric results from PDFs into clean CSV/JSON.",
    image: "/placeholder-logo.png",
    action: "Extract data",
  },
  {
    id: 5,
    title: "Edu Assistant",
    description: "Creates lesson plans, assessments and study guides aligned to syllabus material.",
    image: "/placeholder-user.jpg",
    action: "Create materials",
    badge: "New",
  },
];

export default function ProductsSection() {
  const [current, setCurrent] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  // preload
  useEffect(() => {
    PRODUCTS.forEach((p) => {
      const img = new window.Image();
      img.src = p.image;
    });
  }, []);

  // autoplay
  useEffect(() => {
    if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    autoplayRef.current = window.setInterval(() => {
      if (!paused && !isAnimating) {
        setCurrent((c) => (c + 1) % PRODUCTS.length);
      }
    }, 5000);
    return () => autoplayRef.current && window.clearInterval(autoplayRef.current);
  }, [paused, isAnimating]);

  const lockAndRun = (fn: () => void) => {
    if (isAnimating) return;
    setIsAnimating(true);
    fn();
    setTimeout(() => setIsAnimating(false), 520);
  };

  const next = () => lockAndRun(() => setCurrent((c) => (c + 1) % PRODUCTS.length));
  const prev = () => lockAndRun(() => setCurrent((c) => (c - 1 + PRODUCTS.length) % PRODUCTS.length));

  const n = PRODUCTS.length;
  const prevIndex = (current - 1 + n) % n;
  const nextIndex = (current + 1) % n;

  const cardVisual = (i: number) => {
    if (i === current)
      return "bg-gradient-to-b from-[#171228] to-[#24143A] border border-[#F97A53]/30 shadow-[0_24px_60px_rgba(249,122,83,0.25)]";
    if (i === prevIndex || i === nextIndex)
      return "bg-gradient-to-b from-[#151122]/90 to-[#1c1533]/80 border border-transparent shadow-sm";
    return "bg-transparent pointer-events-none opacity-0";
  };

  return (
    <section
      className="py-24 sm:py-32 overflow-hidden relative"
      style={{
        background: "linear-gradient(180deg,#0D0D1A 0%, #1a0f2e 50%, #24143A 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-12 items-start mb-14">
          <div className="space-y-6">
            <div className="bg-[#F97A53]/10 p-3.5 rounded-2xl shadow-sm w-fit border border-[#F97A53]/30">
              <BreezeIcon />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Built-in AI agents that{" "}
              <span className="bg-gradient-to-r from-[#F97A53] via-[#F97316] to-[#9241F9] bg-clip-text text-transparent">
                work for you 24/7
              </span>
              .
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-400">
            Gradies’s autonomous research agents operate like a digital research army — analyzing data, generating insights, and simplifying what’s hard to understand.
            </p>
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#F97A53] to-[#F97316] text-white font-semibold hover:opacity-90 transition">
              Explore Breeze Agents
            </button>
          </div>
        </div>

        {/* carousel */}
        <div
          className="relative h-[520px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="relative flex items-center justify-center w-full max-w-6xl mx-auto"
            style={{ perspective: 1200, perspectiveOrigin: "center center" }}
          >
            {PRODUCTS.map((p, i) => {
              let animateProps: any = { x: "0%", rotateY: 0, scale: 1, opacity: 1, zIndex: 30 };
              if (i === current) animateProps = { x: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 30 };
              else if (i === prevIndex) animateProps = { x: "-60%", rotateY: 20, scale: 0.86, opacity: 0.9, zIndex: 20 };
              else if (i === nextIndex) animateProps = { x: "60%", rotateY: -20, scale: 0.86, opacity: 0.9, zIndex: 20 };
              else {
                const side = i < current ? -1 : 1;
                animateProps = { x: `${side * 120}%`, rotateY: side * -40, scale: 0.7, opacity: 0, zIndex: 10 };
              }

              return (
                <motion.div
                  key={p.id}
                  initial={false}
                  animate={animateProps}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                  className={`absolute inset-0 m-auto w-[90%] max-w-[440px] h-[480px] origin-center flex justify-center`}
                  style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
                >
                  <div
                    className={`${cardVisual(i)} w-full h-full rounded-3xl flex flex-col justify-between p-6`}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      backdropFilter: i !== current ? "blur(8px)" : undefined,
                    }}
                  >
                    <div className="flex-grow">
                      <div className="rounded-2xl overflow-hidden mb-6 bg-[#1b152c] h-[248px] flex items-center justify-center">
                        <Image
                          src={p.image}
                          alt={p.title}
                          width={900}
                          height={720}
                          className="w-full h-full object-cover opacity-90"
                        />
                      </div>

                      {p.badge && (
                        <p className="text-center mb-2">
                          <span className="bg-[#9241F9]/20 text-[#caa9ff] text-xs font-semibold px-2.5 py-1 rounded-full">
                            {p.badge}
                          </span>
                        </p>
                      )}

                      <h3 className="text-2xl font-semibold text-white text-center mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-400 text-center leading-relaxed">{p.description}</p>
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        className="text-[#F97A53] font-bold hover:text-[#ff9e7a] transition-colors relative inline-flex items-center gap-2"
                        aria-label={p.action}
                      >
                        <span>{p.action}</span>
                        <span
                          aria-hidden
                          style={{
                            display: "block",
                            height: 3,
                            width: 36,
                            background: "linear-gradient(90deg,#F97A53,#F97316,#9241F9)",
                            borderRadius: 4,
                            marginLeft: 8,
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* controls */}
          <button
            aria-label="Previous slide"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1b152c]/80 border border-[#F97A53]/20 hover:bg-[#24143A] shadow-md z-40"
          >
            <ChevronLeft className="text-[#F97A53]" />
          </button>

          <button
            aria-label="Next slide"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#1b152c]/80 border border-[#F97A53]/20 hover:bg-[#24143A] shadow-md z-40"
          >
            <ChevronRight className="text-[#F97A53]" />
          </button>
        </div>

        {/* pagination */}
        <div className="mt-10 flex justify-center items-center gap-3">
          {PRODUCTS.map((_, i) => {
            const active = i === current;
            return (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => !isAnimating && setCurrent(i)}
                className={`transition-all duration-200 ${
                  active
                    ? "w-10 h-10 rounded-full bg-[#F97A53]/10 border border-[#F97A53]/40 flex items-center justify-center"
                    : "w-3 h-3 rounded-full bg-gray-600 hover:bg-[#F97A53]/60"
                }`}
              >
                {active && <div className="w-2 h-2 rounded-full bg-[#F97A53]" />}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
