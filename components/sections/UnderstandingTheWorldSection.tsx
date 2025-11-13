"use client"

import { useRef, useMemo, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars, Float } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import * as THREE from "three"

// Animated starfield with rotation
function AnimatedStars() {
  const starsRef = useRef()
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0004
      starsRef.current.rotation.y += 0.0002
      starsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.01
    }
  })
  return (
    <Stars
      ref={starsRef}
      radius={60}
      depth={70}
      count={8000}
      factor={5}
      saturation={0}
      fade
      speed={1.2}
    />
  )
}

// Neural network particles with connections
function NeuralParticles() {
  const particlesRef = useRef()
  const particleCount = 100
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = []
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      })
    }
    
    return { positions, velocities }
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particles.velocities[i].x
        positions[i * 3 + 1] += particles.velocities[i].y
        positions[i * 3 + 2] += particles.velocities[i].z
        
        // Boundary check - wrap around
        if (Math.abs(positions[i * 3]) > 15) particles.velocities[i].x *= -1
        if (Math.abs(positions[i * 3 + 1]) > 10) particles.velocities[i].y *= -1
        if (Math.abs(positions[i * 3 + 2]) > 7.5) particles.velocities[i].z *= -1
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a855f7"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Pulsing energy rings
function EnergyRings() {
  const rings = useRef([])
  
  useFrame((state) => {
    rings.current.forEach((ring, i) => {
      if (ring) {
        const time = state.clock.elapsedTime
        ring.scale.x = 1 + Math.sin(time * 0.5 + i * 2) * 0.3
        ring.scale.y = 1 + Math.sin(time * 0.5 + i * 2) * 0.3
        ring.rotation.z = time * 0.1 * (i % 2 === 0 ? 1 : -1)
        ring.material.opacity = 0.2 + Math.sin(time * 0.8 + i) * 0.1
      }
    })
  })

  return (
    <>
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          ref={(el) => (rings.current[i] = el)}
          position={[0, 0, -5 + i * 2]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[3 + i * 1.5, 0.05, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? "#8b5cf6" : i === 1 ? "#a78bfa" : "#c4b5fd"}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  )
}

// Floating data symbols
function DataSymbols() {
  const symbols = ['01', '∑', 'AI', '∞', '{}', '◊', 'λ', 'π']
  const meshRefs = useRef([])

  useFrame((state) => {
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y = Math.sin(state.clock.elapsedTime * 0.5 + i) * 2
        mesh.rotation.y = state.clock.elapsedTime * 0.3
      }
    })
  })

  return (
    <>
      {symbols.map((symbol, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={2}>
          <mesh
            ref={(el) => (meshRefs.current[i] = el)}
            position={[
              Math.cos((i / symbols.length) * Math.PI * 2) * 8,
              0,
              Math.sin((i / symbols.length) * Math.PI * 2) * 8,
            ]}
          >
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshBasicMaterial
              color="#e9daff"
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

// Typewriter effect with cursor
function TypewriterText({ delay = 0 }) {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "We started by understanding — text, sound, vision, and context."

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayText(fullText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setShowCursor(false)
        }
      }, 50)
      return () => clearInterval(interval)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <span>
      {displayText}
      {showCursor && <span className="opacity-100">|</span>}
    </span>
  )
}

export default function UnderstandingTheWorldSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 1.05])
  const glowIntensity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden text-center"
    >
      {/* Deep space background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0118] to-[#1a0b2e]" />

      {/* Three.js Canvas - Neural network and particles */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <AnimatedStars />
          <NeuralParticles />
          <EnergyRings />
          <DataSymbols />
          <ambientLight intensity={0.2} />
        </Canvas>
      </div>

      {/* Radial glow effect */}
      <motion.div 
        style={{ opacity: glowIntensity }}
        className="absolute inset-0 z-[1]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/30 rounded-full blur-[100px]" />
      </motion.div>

      {/* Floating particle overlay */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, scale }} 
        className="relative z-10 max-w-6xl mx-auto px-6"
      >
        {/* Main Headline with Typewriter */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-8"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-300 drop-shadow-[0_0_35px_rgba(147,112,255,0.5)]">
            <TypewriterText delay={500} />
          </span>
        </motion.h2>

        {/* Subtitle with stagger animation */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1.5 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-xl sm:text-2xl text-purple-200/90 max-w-3xl mx-auto leading-relaxed font-light">
            From raw data to intelligent understanding
          </p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 1 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-300/80 max-w-2xl mx-auto"
          >
            <span className="text-purple-300 font-semibold">Gradies</span> processes language, audio, and visual information to build context-aware intelligence that powers every solution we create.
          </motion.p>
        </motion.div>

        {/* Feature pills */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 6, duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {["Natural Language", "Computer Vision", "Audio Processing", "Contextual AI"].map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6.5 + i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 backdrop-blur-sm"
            >
              <span className="text-purple-200 font-medium text-sm">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 1, 0.3],
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-purple-400/30 blur-xl"
          />
          <ChevronDown 
            size={44} 
            className="relative text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]" 
          />
        </div>
        <p className="text-xs text-purple-300/70 mt-2 font-medium tracking-wider text-center -translate-x-9">
            SCROLL TO EXPLORE
        </p>

      </motion.div>

      {/* Edge vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-[3] bg-gradient-to-b from-black/40 via-transparent to-black/60" />
    </motion.section>
  )
}