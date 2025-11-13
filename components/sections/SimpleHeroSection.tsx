"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Company logos data - easy to add more companies
const companyLogos = [
  {
    name: "Microsoft",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 23 23" fill="currentColor">
        <path d="M0 0h11v11H0V0zm12 0h11v11H12V0zM0 12h11v11H0V12zm12 0h11v11H12V12z"/>
      </svg>
    )
  },
  {
    name: "Google",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
  },
  {
    name: "Amazon",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.156.615-4.83.615-3.268 0-6.306-.756-9.116-2.268-.44-.236-.81-.46-1.11-.67-.3-.21-.445-.41-.43-.61.015-.2.09-.32.225-.41l-.226.09z"/>
        <path d="M18.78 16.06c-.36-.43-.95-.64-1.77-.64-.51 0-.96.15-1.35.44-.39.29-.68.7-.87 1.22-.19.52-.28 1.1-.28 1.73 0 .63.09 1.21.28 1.73.19.52.48.93.87 1.22.39.29.84.44 1.35.44.82 0 1.41-.21 1.77-.64.36-.43.54-1.04.54-1.83v-1.64c0-.79-.18-1.4-.54-1.83z"/>
      </svg>
    )
  },
  {
    name: "Meta",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: "Tesla",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5.362L2.636 8.182v8.727h2.727V9.818L12 7.636l6.636 2.182v7.091h2.728V8.182L12 5.362zM12 0L0 4.364v15.272h5.455V24h2.727v-4.364h7.636V24h2.727v-4.364H24V4.364L12 0z"/>
      </svg>
    )
  },
  {
    name: "Apple",
    logo: (
      <svg className="h-6 w-auto" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
      </svg>
    )
  }
]

export default function IntelligentHorizonHero() {
  const [userCount, setUserCount] = useState(50)

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3))
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4C3B7B] via-[#3E2F63] to-black"></div>

      {/* Half-Moon / Crescent Glow */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <mask id="crescent-mask">
              {/* White canvas = visible */}
              <rect width="100%" height="100%" fill="white" />

              {/* Outer ellipse cuts out the black arc */}
              <ellipse cx="50%" cy="75%" rx="80%" ry="30%" fill="black" />

              {/* Inner ellipse restores part = crescent effect */}
              <ellipse cx="55%" cy="75%" rx="70%" ry="28%" fill="white" />
            </mask>
          </defs>

          {/* Apply mask */}
          <rect width="100%" height="100%" fill="black" mask="url(#crescent-mask)" />
        </svg>

        {/* Glowing gradient aligned with crescent */}
        <div
  className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[160%] h-[45%] 
             bg-[radial-gradient(ellipse_at_50%_0%,_rgba(233,218,255,0.25)_0%,_rgba(168,85,247,0.1)_30%,_rgba(0,0,0,0)_70%)]
             opacity-80 blur-3xl"
  aria-hidden="true"
></div>

      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between p-8 sm:p-12 md:p-12">
        {/* Headline */}        
        <div className="max-w-3xl pt-16 sm:pt-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Gradies <br />
            <span className="text-xl lg:text-6xl text-purple-300">
            Intelligence that evolves with you
              </span>
          </h1>
          <p className="mt-20 text-lg lg:text-xl text-gray-200 max-w-2xl leading-8 font-normal">

          We build AI-driven research ecosystems that empower scientists and innovators to think, discover, and create faster.
          Gradies combines intelligent agents, automation, and deep understanding of scientific knowledge — transforming research into a powerful, scalable, and insight-driven process.
          </p>
          <div className="mt-5 flex flex-wrap gap-4">  </div>
          <div className="mt-5 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-base font-semibold rounded-lg shadow-lg transition-all duration-300"
            >
              <a href="/early-access" target="_blank" rel="noopener noreferrer">
                Explore Our Solutions
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-400 text-gray-200 hover:bg-gray-800 px-8 py-3 text-base font-semibold rounded-lg transition-all duration-300"
            >
              See Our Products
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Trusted By - Animated Company Logos */}
            <div className="flex flex-col gap-4">
              <p className="text-xl text-gray-300 font-extrabold">
                Trusted by people works at
              </p>

              <div className="relative overflow-hidden w-full max-w-lg">
                <div className="flex animate-scroll gap-12 whitespace-nowrap">
                  {/* First set of logos */}
                  <div className="flex items-center gap-12 shrink-0">
                    {companyLogos.map((company, index) => (
                      <div 
                        key={`first-${index}`}
                        className="flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                        title={company.name}
                      >
                        {company.logo}
                      </div>
                    ))}
                  </div>
                  {/* Duplicate set for seamless loop */}
                  <div className="flex items-center gap-12 shrink-0">
                    {companyLogos.map((company, index) => (
                      <div 
                        key={`second-${index}`}
                        className="flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300"
                        title={company.name}
                      >
                        {company.logo}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-8 md:gap-16 text-center md:text-left">
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-white">3x Faster</p>
                <p className="text-sm text-gray-400 mt-1">Research & Data Processing</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-white">99.9%</p>
                <p className="text-sm text-gray-400 mt-1">Platform Uptime</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold text-white">AI-Powered</p>
                <p className="text-sm text-gray-400 mt-1">Automation & Insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
