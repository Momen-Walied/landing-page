"use client"

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import debounce from "lodash/debounce"
import { Particles } from "@tsparticles/react"
import { loadFull } from "tsparticles"

// ---------- Sample Data ----------
const RESEARCH_PAPERS = [
  {
    id: "neural-architecture",
    title: "Advanced Neural Architecture for Multi-Modal AI Systems",
    authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Aisha Patel"],
    journal: "Nature Machine Intelligence",
    year: 2024,
    category: "Neural Networks",
    impact: "High Impact",
    citations: 247,
    abstract:
      "We present a novel neural architecture that enables seamless integration of text, vision, and audio modalities, achieving state-of-the-art performance across multiple benchmarks.",
    tags: ["Multi-Modal", "Deep Learning", "Architecture"],
    downloadUrl: "#",
    githubUrl: "https://github.com/Gradies/neural-arch",
  },
  // Add other papers as before
]

const OPEN_SOURCE_PROJECTS = [
  {
    id: "Gradies-core",
    name: "Gradies Core",
    description: "The foundational framework powering Gradies's intelligent systems.",
    language: "Python",
    stars: 12400,
    forks: 2100,
    contributors: 89,
    lastUpdate: "2 days ago",
    license: "MIT",
    tags: ["AI Framework", "Core", "Foundation"],
    githubUrl: "https://github.com/Gradies/core",
  },
  // Add other projects as before
]

const LATEST_RESEARCHERS = [
    { id: "r1", name: "Dr. Ahmed Hassan", role: "Lead Researcher — Autonomous Systems", lastActive: "Oct 1, 2025" },
    { id: "r2", name: "Dr. Lisa Wang", role: "Senior Scientist — Multi-modal AI", lastActive: "Sep 28, 2025" },
    { id: "r3", name: "Dr. Sarah Chen", role: "Research Fellow — Neural Architecture", lastActive: "Sep 20, 2025" },
    { id: "r4", name: "Dr. Maria Santos", role: "Ethics Lead", lastActive: "Sep 18, 2025" },
  ]

// Particle options for wow factor - stars theme for AI/space feel
const particleOptions = {
  preset: "stars",
  particles: {
    number: {
      value: 100
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 2,
      random: true
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true
    }
  },
  background: {
    color: {
      value: "transparent" // To blend with section gradient
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse"
      },
      onClick: {
        enable: true,
        mode: "push"
      }
    },
    modes: {
      repulse: {
        distance: 200,
        duration: 0.4
      },
      push: {
        quantity: 4
      }
    }
  },
  detectRetina: true
}

// ----------------- Utilities & Icons -----------------
function IconGitHub() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.2-3.37-1.2-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.34 1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.38.1 2.63.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor" /></svg>
}

function IconStar() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor" /></svg>
}

function IconClose() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function IconDownload() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function IconSearch() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 1 0-10.606 7.5 7.5 0 0 1 0 10.606z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

function initials(name = "") {
  const parts = name.split(" ")
  return (parts[0]?.[0] || "") + (parts[1]?.[0] || "")
}

// Modal variants for smoother animation
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 100 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, scale: 0.8, y: 100, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

// ----------------- Main Component -----------------
export default function ResearchAndOpenSourceSection() {
  const [activeTab, setActiveTab] = useState<"research" | "opensource">("research")
  const [query, setQuery] = useState("")
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"citations" | "stars" | "year">("citations")
  const [selectedItem, setSelectedItem] = useState<any | null>(null)
  const [particlesLoaded, setParticlesLoaded] = useState(false)
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    searchRef.current?.focus()
  }, [])

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine)
    setParticlesLoaded(true)
  }, [])

  const debouncedSetQuery = useMemo(() => debounce(setQuery, 300), [])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    ;[...RESEARCH_PAPERS, ...OPEN_SOURCE_PROJECTS].forEach((item: any) => item.tags?.forEach((t: string) => tags.add(t)))
    return Array.from(tags)
  }, [])

  const filteredPapers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return RESEARCH_PAPERS.filter((p) => {
      const matchQ = q === "" || [p.title, p.abstract, p.authors.join(" "), p.tags.join(" ")].join(" ").toLowerCase().includes(q)
      const matchTag = !tagFilter || p.tags.includes(tagFilter)
      return matchQ && matchTag
    }).sort((a, b) => {
      if (sortBy === "year") return b.year - a.year
      return b.citations - a.citations
    })
  }, [query, tagFilter, sortBy])

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return OPEN_SOURCE_PROJECTS.filter((p) => {
      const matchQ = q === "" || [p.name, p.description, p.tags.join(" ")].join(" ").toLowerCase().includes(q)
      const matchTag = !tagFilter || p.tags.includes(tagFilter)
      return matchQ && matchTag
    }).sort((a, b) => b.stars - a.stars)
  }, [query, tagFilter, sortBy])

  const handleTagClick = (tag: string) => {
    setTagFilter(tag === tagFilter ? null : tag)
  }

  const closeModal = () => setSelectedItem(null)

  return (
    <section className="relative bg-gradient-to-tr from-[#040b1e] via-[#051022] to-[#061125] py-24 overflow-hidden">
      {/* Particle Background for Wow Factor */}
      {particlesLoaded && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
          className="absolute inset-0 pointer-events-none"
        />
      )}

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[1000px] h-[1000px] bg-gradient-radial from-cyan-400/5 to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/3 w-[1000px] h-[1000px] bg-gradient-radial from-purple-400/5 to-transparent blur-3xl animate-pulse-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 leading-tight">
            AI Innovation Hub
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
            Discover groundbreaking research, open-source tools, and the brilliant minds advancing Gradies. Search, filter, and dive deep into the future of intelligent systems.
          </p>
        </motion.div>

        {/* Researchers Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex overflow-x-auto gap-4 mb-8 py-4 scrollbar-hide"
        >
          {LATEST_RESEARCHERS.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="flex-shrink-0 w-64 p-4 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/40 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                  {initials(r.name)}
                </div>
                <div>
                  <p className="text-white font-semibold">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.role}</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-500">Last active: {r.lastActive}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls: Tabs, Search, Sort, Tags */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/40 mb-8 shadow-2xl"
        >
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex gap-2">
              <button
                onClick={() => { setActiveTab("research"); setSortBy("citations") }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === "research" ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-md" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"}`}
              >
                Research Papers
              </button>
              <button
                onClick={() => { setActiveTab("opensource"); setSortBy("stars") }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === "opensource" ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-md" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"}`}
              >
                Open Source Projects
              </button>
            </div>
            <input
              ref={searchRef}
              onChange={(e) => debouncedSetQuery(e.target.value)}
              placeholder="Search by title, author, tag..."
              className="flex-1 bg-slate-800/50 border border-slate-700/40 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-500 focus:border-cyan-500 outline-none transition-all"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800/50 border border-slate-700/40 rounded-lg px-4 py-2 text-slate-200 focus:border-purple-500 outline-none transition-all"
            >
              <option value="citations">Most Impactful</option>
              <option value="year">Newest First</option>
            </select>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => handleTagClick(t)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${tagFilter === t ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"}`}
              >
                {t}
              </button>
            ))}
            {tagFilter && (
              <button onClick={() => setTagFilter(null)} className="px-3 py-1 rounded-full text-sm bg-red-900/50 text-red-300 hover:bg-red-800/50">
                Clear Filter
              </button>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* List Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "research" ? (
                <motion.div 
                  key="research"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredPapers.map((paper, i) => (
                    <motion.div
                      key={paper.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                      onClick={() => setSelectedItem({ ...paper, type: 'paper' })}
                      className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/40 cursor-pointer transition-all"
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{paper.title}</h3>
                      <p className="text-sm text-slate-400 mb-4">{paper.authors.join(", ")} • {paper.year}</p>
                      <p className="text-sm text-slate-300 line-clamp-4 mb-4">{paper.abstract}</p>
                      <div className="flex flex-wrap gap-2">
                        {paper.tags.map((t) => (
                          <span key={t} className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-200">{t}</span>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-sm text-slate-400">{paper.impact}</span>
                        <span className="text-lg font-bold text-white">{paper.citations} Citations</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="opensource"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" }}
                      onClick={() => setSelectedItem({ ...project, type: 'project' })}
                      className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl border border-slate-700/40 cursor-pointer transition-all"
                    >
                      <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                      <p className="text-sm text-slate-300 line-clamp-3 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((t) => (
                          <span key={t} className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-200">{t}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">{project.language} • {project.license}</span>
                        <div className="flex items-center gap-2">
                          <IconStar />
                          <span className="text-lg font-bold text-white">{project.stars.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">Updated {project.lastUpdate}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-6 lg:sticky lg:top-20 lg:self-start"
          >
            <div className="p-6 bg-gradient-to-br from-cyan-800/20 to-purple-800/20 rounded-xl border border-cyan-600/30 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  className="w-16 h-16 rounded-full bg-black/30 flex items-center justify-center text-4xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🧠
                </motion.div>
                <div>
                  <h4 className="text-lg font-bold text-white">Gradies Brain</h4>
                  <p className="text-xs text-slate-300">Next-gen autonomous AI core</p>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-4">Revolutionizing decision-making with multi-modal intelligence and ethical safeguards.</p>
              <div className="flex gap-3">
                <a href="#" className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition">Explore</a>
                <a href="#" className="px-4 py-2 border border-white/30 text-white rounded-lg hover:border-white/50 transition">Docs</a>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/40 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4">Ecosystem Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-cyan-300">50+</p>
                  <p className="text-xs text-slate-400">Papers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-300">25+</p>
                  <p className="text-xs text-slate-400">Projects</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-300">2.5k+</p>
                  <p className="text-xs text-slate-400">Citations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-300">200+</p>
                  <p className="text-xs text-slate-400">Contributors</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/40 shadow-xl">
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-cyan-600/50 text-white rounded-lg hover:bg-cyan-600 transition">Browse All Research</button>
                <button className="w-full px-4 py-2 bg-purple-600/50 text-white rounded-lg hover:bg-purple-600 transition">Explore Repos</button>
                <button className="w-full px-4 py-2 bg-slate-800/50 text-slate-300 rounded-lg hover:bg-slate-700 transition">Subscribe</button>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="relative bg-slate-900/90 p-8 rounded-2xl border border-slate-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              >
                <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10">
                  <IconClose />
                </button>
                {selectedItem.type === 'paper' ? (
                  <>
                    <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 rounded-t-2xl -m-8 -mt-8 mb-4 relative">
                      <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-4">{selectedItem.authors.join(", ")} • {selectedItem.journal} • {selectedItem.year}</p>
                    <p className="text-base text-slate-300 mb-6">{selectedItem.abstract}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedItem.tags.map((t: string) => (
                        <span key={t} className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-200">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-4 mb-4">
                      <a href={selectedItem.downloadUrl} className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition flex items-center gap-2">
                        <IconDownload /> Download PDF
                      </a>
                      <a href={selectedItem.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
                        <IconGitHub /> Code
                      </a>
                    </div>
                    <a href={`https://www.google.com/search?q=${encodeURIComponent(selectedItem.title)}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center gap-2">
                      <IconSearch /> Learn More
                    </a>
                    <p className="mt-4 text-sm text-slate-400">Impact: {selectedItem.impact} • Citations: {selectedItem.citations}</p>
                  </>
                ) : (
                  <>
                    <div className="bg-gradient-to-r from-cyan-600 to-purple-600 p-4 rounded-t-2xl -m-8 -mt-8 mb-4 relative">
                      <h3 className="text-2xl font-bold text-white">{selectedItem.name}</h3>
                    </div>
                    <p className="text-base text-slate-300 mb-6">{selectedItem.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedItem.tags.map((t: string) => (
                        <span key={t} className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-200">{t}</span>
                      ))}
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-sm text-slate-400">{selectedItem.language} • {selectedItem.license} • Contributors: {selectedItem.contributors}</span>
                      <div className="flex items-center gap-2">
                        <IconStar />
                        <span className="text-lg font-bold text-white">{selectedItem.stars.toLocaleString()}</span>
                        <span className="text-sm text-slate-400">• {selectedItem.forks.toLocaleString()} Forks</span>
                      </div>
                    </div>
                    <a href={selectedItem.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:from-cyan-700 hover:to-purple-700 transition flex items-center gap-2 justify-center mb-4">
                      <IconGitHub /> View on GitHub
                    </a>
                    <a href={`https://www.google.com/search?q=${encodeURIComponent(selectedItem.name + " github")}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition flex items-center gap-2">
                      <IconSearch /> Learn More
                    </a>
                    <p className="mt-4 text-sm text-slate-400">Last updated: {selectedItem.lastUpdate}</p>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 text-center text-sm text-slate-500"
        >
          Powered by Gradies • Contribute on GitHub • Updated as of {new Date().toLocaleDateString()}
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}