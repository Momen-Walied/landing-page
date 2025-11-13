"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Ecosystem data
const ECOSYSTEM_STEPS = [
  {
    id: "discover",
    label: "Strategic Discovery",
    subtitle: "Comprehensive market research and product-market fit validation through data-driven insights",
    metrics: ["Market Research", "User Journey Mapping", "Competitive Intelligence"],
    color: "#1e40af",
    gradient: "linear-gradient(135deg, #1e40af, #1e3a8a)",
    enterpriseFeatures: ["Advanced Analytics Platform", "Stakeholder Workshop Facilitation", "Business Case Development"]
  },
  {
    id: "design",
    label: "System Architecture",
    subtitle: "Enterprise-grade system design with scalable infrastructure and security-first approach",
    metrics: ["Technical Architecture", "User Experience Design", "Technology Selection"],
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)",
    enterpriseFeatures: ["Cloud-Native Architecture", "Zero-Trust Security Model", "API-First Design"]
  },
  {
    id: "develop",
    label: "Rapid Development",
    subtitle: "High-velocity development cycles with continuous integration and automated testing",
    metrics: ["Development Velocity", "Code Coverage", "Release Frequency"],
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2, #0e7490)",
    enterpriseFeatures: ["Microservices Architecture", "Container Orchestration", "Automated CI/CD Pipelines"]
  },
  {
    id: "test",
    label: "Quality Engineering",
    subtitle: "Comprehensive testing strategy with automated quality gates and performance optimization",
    metrics: ["Test Automation", "Performance Benchmarks", "Security Compliance"],
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669, #047857)",
    enterpriseFeatures: ["End-to-End Test Automation", "Performance Load Testing", "Security Vulnerability Assessment"]
  },
  {
    id: "deliver",
    label: "Market Launch",
    subtitle: "Strategic market entry with comprehensive monitoring and growth optimization systems",
    metrics: ["System Reliability", "User Engagement", "Revenue Impact"],
    color: "#d97706",
    gradient: "linear-gradient(135deg, #d97706, #b45309)",
    enterpriseFeatures: ["Real-Time Monitoring", "Business Intelligence Dashboard", "Growth Analytics Platform"]
  },
]

export default function OurEcosystem() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (!isInView || !scrollContainerRef.current || !isAutoScrolling) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % ECOSYSTEM_STEPS.length
        
        // Smooth scroll to the next card
        if (scrollContainerRef.current) {
          const cardWidth = 320 + 24 // card width + gap
          scrollContainerRef.current.scrollTo({
            left: nextIndex * cardWidth,
            behavior: 'smooth'
          })
        }
        
        return nextIndex
      })
    }, 3000) // Auto-scroll every 3 seconds

    return () => clearInterval(interval)
  }, [isInView, isAutoScrolling])

  // Handle manual scroll and pause auto-scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current || isDragging) return
    
    // Pause auto-scroll when user manually scrolls
    setIsAutoScrolling(false)
    
    // Resume auto-scroll after 5 seconds of no interaction
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 5000)
    
    // Update current index based on scroll position
    const cardWidth = 320 + 24
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const newIndex = Math.round(scrollLeft / cardWidth)
    setCurrentIndex(newIndex)
  }

  // Drag handlers for mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return
    
    setIsDragging(true)
    setIsAutoScrolling(false)
    setDragStart({
      x: e.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft
    })
    
    // Add cursor style
    scrollContainerRef.current.style.cursor = 'grabbing'
    scrollContainerRef.current.style.userSelect = 'none'
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - dragStart.x) * 2 // Multiply by 2 for faster scrolling
    scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk
  }

  const handleMouseUp = () => {
    if (!scrollContainerRef.current) return
    
    setIsDragging(false)
    scrollContainerRef.current.style.cursor = 'grab'
    scrollContainerRef.current.style.userSelect = 'auto'
    
    // Resume auto-scroll after 3 seconds
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 3000)
    
    // Update current index based on final scroll position
    const cardWidth = 320 + 24
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const newIndex = Math.round(scrollLeft / cardWidth)
    setCurrentIndex(newIndex)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp()
    }
  }

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return
    
    setIsDragging(true)
    setIsAutoScrolling(false)
    const touch = e.touches[0]
    setDragStart({
      x: touch.pageX - scrollContainerRef.current.offsetLeft,
      scrollLeft: scrollContainerRef.current.scrollLeft
    })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    
    const touch = e.touches[0]
    const x = touch.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - dragStart.x) * 1.5 // Slightly less sensitive for touch
    scrollContainerRef.current.scrollLeft = dragStart.scrollLeft - walk
  }

  const handleTouchEnd = () => {
    if (!scrollContainerRef.current) return
    
    setIsDragging(false)
    
    // Resume auto-scroll after 3 seconds
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 3000)
    
    // Update current index based on final scroll position
    const cardWidth = 320 + 24
    const scrollLeft = scrollContainerRef.current.scrollLeft
    const newIndex = Math.round(scrollLeft / cardWidth)
    setCurrentIndex(newIndex)
  }

  // Layout effect for sticky positioning
  useEffect(() => {
    if (typeof window === "undefined") return

    const sectionEl = sectionRef.current
    const leftEl = leftRef.current
    const rightEl = rightRef.current
    if (!sectionEl || !leftEl || !rightEl) return

    const computeSectionMinHeight = () => {
      const rightScrollHeight = rightEl.scrollHeight || rightEl.getBoundingClientRect().height
      const viewportH = window.innerHeight || 800
      const padding = 160
      const min = Math.max(rightScrollHeight + padding, viewportH + padding)
      sectionEl.style.minHeight = `${Math.ceil(min)}px`
    }

    requestAnimationFrame(computeSectionMinHeight)

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(computeSectionMinHeight)
    })
    ro.observe(rightEl)
    ro.observe(leftEl)

    return () => {
      try {
        ro.disconnect()
      } catch (e) {}
      if (sectionEl) sectionEl.style.minHeight = ""
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .horizontal-scroll::-webkit-scrollbar {
          display: none;
        }
        .horizontal-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
          scroll-behavior: smooth;
        }
        .horizontal-scroll.dragging {
          scroll-behavior: auto;
          cursor: grabbing !important;
          user-select: none;
        }
        .horizontal-scroll:not(.dragging) {
          cursor: grab;
        }
      `}</style>
      <section
        ref={sectionRef}
        className="relative bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] py-24"
      >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ROW 1 - Header Content */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="text-sm font-medium text-slate-300 tracking-wide">
                ENTERPRISE DEVELOPMENT ECOSYSTEM
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto">
              Building MVPs is complex.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Our ecosystem makes it effortless.
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-3xl mx-auto">
              We transform your innovative ideas into market-ready solutions through our comprehensive development ecosystem. From strategic discovery to market launch, every step is optimized for success.
            </p>

            {/* Key Benefits - Horizontal Layout */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 max-w-4xl mx-auto">
              {[
                "Strategic market validation",
                "Enterprise-grade architecture", 
                "Rapid development cycles",
                "Comprehensive testing",
                "Successful market launch"
              ].map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/30 border border-slate-700/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                  <span className="text-slate-300 text-sm font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button 
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your MVP Journey
              </motion.button>
              <motion.button 
                className="px-8 py-3 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-800/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ROW 2 - Horizontal Scrolling Cards */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Horizontal Scroll Container */}
            <div 
              ref={scrollContainerRef}
              className={`flex gap-6 overflow-x-auto pb-6 horizontal-scroll ${isDragging ? 'dragging' : ''}`}
              onScroll={handleScroll}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {ECOSYSTEM_STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredCard(step.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative flex-shrink-0 w-80"
                >
                  <div
                    className="relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 cursor-pointer h-full"
                    style={{
                      background: hoveredCard === step.id 
                        ? `linear-gradient(135deg, ${step.color}15, rgba(15,23,42,0.9))`
                        : "linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.8))",
                      borderColor: hoveredCard === step.id ? `${step.color}60` : "rgba(148,163,184,0.1)",
                      boxShadow: hoveredCard === step.id 
                        ? `0 20px 40px ${step.color}30`
                        : "0 8px 32px rgba(0,0,0,0.2)"
                    }}
                  >
                    {/* Step Number & Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                        style={{ background: step.gradient }}
                      >
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 truncate">{step.label}</h3>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ background: step.color }}
                          />
                          <span className="text-xs text-slate-400">Phase {index + 1}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm line-clamp-3">
                      {step.subtitle}
                    </p>

                    {/* Metrics */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-400 mb-2">Key Metrics</h4>
                      <div className="flex flex-wrap gap-1">
                        {step.metrics.slice(0, 2).map((metric) => (
                          <span
                            key={metric}
                            className="px-2 py-1 rounded-full text-xs font-medium border"
                            style={{
                              background: `${step.color}15`,
                              borderColor: `${step.color}30`,
                              color: step.color,
                            }}
                          >
                            {metric}
                          </span>
                        ))}
                        {step.metrics.length > 2 && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-400 border border-slate-600/50">
                            +{step.metrics.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Enterprise Features Preview */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-400 mb-2">Enterprise Features</h4>
                      <div className="space-y-1">
                        {step.enterpriseFeatures.slice(0, 2).map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <div 
                              className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: step.color }}
                            />
                            <span className="text-xs text-slate-400 truncate">{feature}</span>
                          </div>
                        ))}
                        {step.enterpriseFeatures.length > 2 && (
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-slate-500 flex-shrink-0" />
                            <span className="text-xs text-slate-500">+{step.enterpriseFeatures.length - 2} more features</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}08, transparent)`,
                        opacity: hoveredCard === step.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Progress Indicator */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="w-3 h-3 rounded-full border-2 border-slate-700"
                        style={{ 
                          background: hoveredCard === step.id ? step.color : "transparent",
                          borderColor: hoveredCard === step.id ? step.color : "rgba(148,163,184,0.3)"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {ECOSYSTEM_STEPS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsAutoScrolling(false)
                    if (scrollContainerRef.current) {
                      const cardWidth = 320 + 24
                      scrollContainerRef.current.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                      })
                    }
                    // Resume auto-scroll after 5 seconds
                    setTimeout(() => setIsAutoScrolling(true), 5000)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            {/* Auto-scroll Control */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isAutoScrolling 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {isAutoScrolling ? '⏸️ Pause Auto-scroll' : '▶️ Resume Auto-scroll'}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section - Bottom Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 max-w-4xl mx-auto"
        >
          <h3 className="text-lg font-bold text-white mb-6 text-center">Proven Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "200+", label: "MVPs Delivered", color: "#1e40af" },
              { value: "99.2%", label: "Success Rate", color: "#7c3aed" },
              { value: "3.2x", label: "Faster Launch", color: "#0891b2" },
              { value: "24/7", label: "Support", color: "#059669" }
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div 
                  className="text-2xl font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  )
}
