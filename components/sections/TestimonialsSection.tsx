"use client"

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    id: 1,
    quote: "We integrated their multi-modal APIs in weeks, not months. The accuracy of their decision engine has cut our data analysis overhead by over 60%.",
    name: 'Dr. Evelyn Reed',
    role: 'Head of Innovation, QuantumLeap',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    themeColor: '#8b5cf6',
  },
  {
    id: 2,
    quote: "The ethical guardrails were the deciding factor. In a highly regulated industry, Gradies provides the transparency we need to deploy AI confidently.",
    name: 'Marcus Chen',
    role: 'Lead AI Strategist, Nexus Financial',
    imageUrl: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=600&auto=format&fit=crop',
    themeColor: '#06b6d4',
  },
  {
    id: 3,
    quote: "As researchers, their open-source tools have been a game-changer. They are robust, well-documented, and have significantly sped up our work.",
    name: 'Prof. Alistair Finch',
    role: 'Director, Inst. for Advanced Computation',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
    themeColor: '#ec4899',
  },
]

export default function TestimonialsKinetic() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const progressBarRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex])

  const goto = (i) => {
    const clamped = Math.max(0, Math.min(i, testimonials.length - 1))
    setActiveIndex(clamped)

    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, { 
        scaleX: (clamped + 1) / testimonials.length, 
        duration: 0.8, 
        transformOrigin: 'left' 
      })
    }
  }

  const next = () => {
    if (activeIndex < testimonials.length - 1) {
      goto(activeIndex + 1)
    }
  }

  const prev = () => {
    if (activeIndex > 0) {
      goto(activeIndex - 1)
    }
  }

  useLayoutEffect(() => {
    if (!triggerRef.current || !sectionRef.current) return

    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top top',
      end: `+=${(testimonials.length - 1) * 100}%`,
      scrub: 1.2,
      pin: sectionRef.current,
      onUpdate: (self) => {
        const p = self.progress
        const idx = Math.min(testimonials.length - 1, Math.round(p * (testimonials.length - 1)))

        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, { scaleX: p, transformOrigin: 'left' })
        }

        setActiveIndex(idx)
      },
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    sectionRef.current.style.setProperty('--glow-color', testimonials[activeIndex].themeColor)
  }, [activeIndex])

  return (
    <div ref={triggerRef} aria-roledescription="testimonial carousel">
      <section ref={sectionRef} className="relative h-screen bg-slate-900 text-white overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[150px] opacity-30 transition-all duration-1000" 
          style={{ background: `var(--glow-color, ${testimonials[0].themeColor})` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 items-center gap-16">

          {/* LEFT: text area */}
          <div className="flex flex-col justify-center h-full">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={`quote-${testimonials[activeIndex].id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-3xl lg:text-4xl font-light leading-tight"
                >
                  "{testimonials[activeIndex].quote}"
                </motion.blockquote>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`meta-${testimonials[activeIndex].id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="mt-8"
                >
                  <p className="text-xl font-bold">{testimonials[activeIndex].name}</p>
                  <p className="text-slate-400">{testimonials[activeIndex].role}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <button 
                      onClick={prev} 
                      disabled={activeIndex === 0}
                      aria-label="Previous testimonial" 
                      className="px-3 py-2 rounded-lg bg-white/8 hover:bg-white/12 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ◀
                    </button>
                    <button 
                      onClick={next} 
                      disabled={activeIndex === testimonials.length - 1}
                      aria-label="Next testimonial" 
                      className="px-3 py-2 rounded-lg bg-white/8 hover:bg-white/12 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ▶
                    </button>

                    <div className="ml-4 text-sm text-slate-400">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: images with crossfade */}
          <div className="h-[70vh] w-full relative rounded-2xl overflow-hidden bg-slate-800/50">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? 'scale(1)' : 'scale(1.08)',
                  zIndex: activeIndex === i ? 2 : 1,
                  pointerEvents: activeIndex === i ? 'auto' : 'none'
                }}
              >
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.4))',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* bottom progress and dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-1/3 max-w-xs">
          <div className="relative w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              ref={progressBarRef} 
              className="absolute top-0 left-0 h-full bg-white rounded-full" 
              style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} 
            />
          </div>

          <div className="flex justify-between mt-3 items-center">
            <div className="flex gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goto(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === i ? 'scale-125' : 'scale-100'}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{ 
                    background: activeIndex === i ? testimonials[i].themeColor : 'rgba(255,255,255,0.2)' 
                  }}
                />
              ))}
            </div>

            <div className="text-xs text-slate-400 flex gap-1">
              {testimonials.map((t, i) => (
                <span 
                  key={t.id} 
                  className={`transition-colors duration-300 ${activeIndex >= i ? 'text-white' : 'text-slate-600'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sr-only" aria-live="polite">
          Showing testimonial {activeIndex + 1} of {testimonials.length}: {testimonials[activeIndex].name}
        </div>
      </section>
    </div>
  )
}