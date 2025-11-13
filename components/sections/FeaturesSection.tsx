"use client"

import { useRef, useLayoutEffect, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { hubCards } from "@/lib/data" // Import data
import HubCard from "./HubCard" // Import the updated HubCard

// Your original GSAP logic remains the same.
// No changes are needed here.

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const resizeObsRef = useRef(null)

  // ... (all of your useLayoutEffect and useEffect hooks for GSAP remain unchanged)
  // PASTE ALL YOUR ORIGINAL HOOKS HERE

  // --- START of hooks to paste ---
  useLayoutEffect(() => {
    // don't run on server
    if (typeof window === "undefined") return

    // Important: make sure no ancestor of leftRef has `overflow` other than visible, or has transform/filter
    // If you get weird behavior re-check global/container CSS for `transform`, `filter`, or `overflow: hidden`.
    const sectionEl = sectionRef.current
    const leftEl = leftRef.current
    const rightEl = rightRef.current
    if (!sectionEl || !leftEl || !rightEl) return

    // Compute and set a safe minHeight for the section so the sticky left element
    // has the expected scrollable area (prevents layout collapse / flicker).
    const computeSectionMinHeight = () => {
      // rightEl.scrollHeight is the vertical size of the cards/content
      const rightScrollHeight = rightEl.scrollHeight || rightEl.getBoundingClientRect().height
      const viewportH = window.innerHeight || 800
      // Add padding to ensure stable scroll area
      const padding = 160
      const min = Math.max(rightScrollHeight + padding, viewportH + padding)
      sectionEl.style.minHeight = `${Math.ceil(min)}px`

      // small performance tip: force a refresh for ScrollTrigger if present (safe guard)
      if (window.gsap && window.gsap.ScrollTrigger) {
        window.gsap.ScrollTrigger.refresh()
      }
    }

    // run once after paint
    requestAnimationFrame(computeSectionMinHeight)

    // Observe right + left for size changes (content could change dynamically)
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(computeSectionMinHeight)
    })
    ro.observe(rightEl)
    ro.observe(leftEl)
    resizeObsRef.current = ro

    // cleanup
    return () => {
      try {
        ro.disconnect()
      } catch (e) {}
      // Remove minHeight so we don't persist style across navigations
      if (sectionEl) sectionEl.style.minHeight = ""
    }
  }, [])

  useLayoutEffect(() => {
    // GSAP animations for the right cards and subtle left parallax (non-pin).
    // Keep animations scoped and lightweight.
    if (typeof window === "undefined") return

    let ctx
    let ScrollTrigger
    ;(async () => {
      try {
        const gsapModule = await import("gsap")
        const ScrollTriggerModule = await import("gsap/ScrollTrigger")
        const gsap = gsapModule.default || gsapModule
        ScrollTrigger = ScrollTriggerModule.ScrollTrigger || ScrollTriggerModule.default
        gsap.registerPlugin(ScrollTrigger)

        ctx = gsap.context(() => {
          // Right cards: staggered fade-up as they enter viewport
          gsap.utils.toArray(".hub-card").forEach((el, i) => {
            gsap.fromTo(
              el,
              { y: 30, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: "power3.out",
                delay: i * 0.04,
                scrollTrigger: {
                  trigger: el,
                  start: "top 92%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          })

          // Subtle parallax on the left column (no pin): scrubbed small movement
          gsap.to(leftRef.current, {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.3,
            },
          })
        }, sectionRef)
      } catch (err) {
        console.error("GSAP animation load failed:", err)
      }
    })()

    // cleanup
    return () => {
      try {
        ctx?.revert()
        if (ScrollTrigger) {
          // don't kill all globally, just refresh/cleanup
          // ScrollTrigger.getAll()?.forEach(t => t.kill()) // avoided intentionally
        }
      } catch (e) {}
    }
  }, [])

  // safety cleanup on unmount (disconnect ResizeObserver if not cleaned)
  useEffect(() => {
    return () => {
      if (resizeObsRef.current) {
        try { resizeObsRef.current.disconnect() } catch (e) {}
      }
    }
  }, [])
  // --- END of hooks to paste ---

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#0D0D1A] via-[#1a0f2e] to-[#24143A]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24">
        <div className="grid lg:grid-cols-[45%_55%] gap-12 items-start">
          {/* LEFT (sticky) */}
          <aside
            ref={leftRef}
            className="sticky top-28 self-start h-fit transform-gpu will-change-transform"
            style={{ zIndex: 10 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="pr-4"
            >
              {/* Your original left-side content */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Research AI</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Accelerate scientific discovery.{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Gradies research agents
                </span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-md">
                Agents specialized in academic papers and education — reading PDFs, synthesizing with grounded citations, extracting data, and generating learning materials. Reliable sources and exports built-in (BibTeX, CSV, JSON).
              </p>
              <div className="flex gap-4 flex-wrap mb-10">
                <a
                  href="/early-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg hover:opacity-95 transition"
                >
                  Explore our solutions
                </a>
                <a
                  href="/early-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/5 transition"
                >
                  See capabilities
                </a>
              </div>
            </motion.div>
          </aside>

          {/* RIGHT (scrolling cards) */}
          <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hubCards.map((hub) => (
              <HubCard key={hub.id} hub={hub} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}