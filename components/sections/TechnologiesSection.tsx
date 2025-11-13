"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

// Technology categories with clean structure
const TECH_CATEGORIES = [
  {
    id: "devops",
    title: "DevOps",
    technologies: [
      { name: "Docker", icon: "🐳" },
      { name: "Kubernetes", icon: "⚙️" },
      { name: "AWS", icon: "☁️" },
      { name: "Jenkins", icon: "🔧" }
    ]
  },
  {
    id: "ai",
    title: "AI",
    technologies: [
      { name: "Open AI", icon: "🌀" },
      { name: "Google Vertex", icon: "📊" },
      { name: "Llama", icon: "∞" },
      { name: "Lang Chain", icon: "🔗" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend",
    technologies: [
      { name: "React", icon: "⚛️" },
      { name: "Next.js", icon: "▲" },
      { name: "Vue.js", icon: "💚" },
      { name: "Angular", icon: "🅰️" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    technologies: [
      { name: "Node.js", icon: "🟢" },
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "Go", icon: "🔵" }
    ]
  },
  {
    id: "voice",
    title: "Voice",
    technologies: [
      { name: "Speech API", icon: "🎤" },
      { name: "Whisper", icon: "👂" },
      { name: "Azure Speech", icon: "🔊" },
      { name: "Google Speech", icon: "🗣️" }
    ]
  }
]

export default function TechnologiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [activeCategory, setActiveCategory] = useState("ai")

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

  const currentCategory = TECH_CATEGORIES.find(cat => cat.id === activeCategory)

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] py-24"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-white">Powering Innovation with Our</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-4xl mx-auto">
            We leverage cutting-edge technologies to craft exceptional solutions. Discover the tools and frameworks that fuel our development process and ensure your project's success.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
          {/* Left Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-2"
          >
            {TECH_CATEGORIES.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left px-6 py-4 text-lg font-medium transition-all duration-300 relative ${
                  activeCategory === category.id
                    ? 'text-purple-400'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                {category.title}
                {activeCategory === category.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 rounded-r" />
                )}
              </button>
            ))}
          </motion.div>

          {/* Right Content - Technology Icons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {currentCategory?.technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-20 h-20 mb-4 flex items-center justify-center text-4xl bg-slate-800/50 rounded-2xl group-hover:bg-purple-600/20 border border-slate-700/50 group-hover:border-purple-500/50 transition-all duration-300 group-hover:scale-110">
                  {tech.icon}
                </div>
                <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors duration-300">
                  {tech.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
