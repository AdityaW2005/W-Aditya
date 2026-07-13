"use client"

import { useEffect, useState, useCallback, Suspense } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import AuroraBackground from "@/components/three/aurora-background"

function useTypewriter(texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [display, setDisplay] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplay(currentText.slice(0, charIndex + 1))
          setCharIndex((c) => c + 1)
          if (charIndex + 1 === currentText.length) {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          setDisplay(currentText.slice(0, charIndex - 1))
          setCharIndex((c) => c - 1)
          if (charIndex <= 1) {
            setIsDeleting(false)
            setTextIndex((i) => (i + 1) % texts.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return display
}

export default function HeroSection() {
  const subtitle = useTypewriter(
    [
      "Full Stack Developer",
      "Mobile App Developer",
      "Algorithmic Problem Solver",
    ],
    80,
    40,
    2000
  )

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleResumeDownload = useCallback(() => {
    window.open("/resume", "_blank", "noopener,noreferrer")
  }, [])

  const letterVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: 0.8 + i * 0.05,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    }),
  }

  const name = "W Aditya"

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
            style={{ background: "#0A0A0F" }}
          >
            <AuroraBackground />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(0, 245, 255, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(157, 0, 255, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(10, 10, 15, 0.9) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Name with split-letter animation */}
        <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 leading-tight flex justify-center flex-wrap perspective-[1000px]">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={`inline-block ${char === " " ? "w-4 md:w-6" : ""}`}
              style={{
                background: "linear-gradient(135deg, #00F5FF 0%, #9D00FF 50%, #00F5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* subtitle typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono text-[#8888A0] mb-4 h-10"
        >
          <span className="text-[#00F5FF]">&gt; </span>
          {subtitle}
          <span className="terminal-cursor" />
        </motion.div>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-[#8888A0] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionate Computer Science student specializing in Full Stack Development and Mobile App Development.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => scrollToSection("projects")}
            data-cursor="pointer"
            className="btn-magnetic group relative px-8 py-4 rounded-full font-mono text-sm tracking-wider
              bg-gradient-to-r from-[#00F5FF]/10 to-[#9D00FF]/10
              border border-[#00F5FF]/30 text-[#00F5FF]
              hover:border-[#00F5FF]/60 hover:text-[#F0F0F5]
              transition-all duration-300 glow-cyan"
          >
            <span className="relative z-10">{"{ View Work }"}</span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            data-cursor="pointer"
            className="btn-magnetic group relative px-8 py-4 rounded-full font-mono text-sm tracking-wider
              bg-gradient-to-r from-[#9D00FF]/10 to-[#00F5FF]/10
              border border-[#9D00FF]/30 text-[#9D00FF]
              hover:border-[#9D00FF]/60 hover:text-[#F0F0F5]
              transition-all duration-300 glow-violet"
          >
            <span className="relative z-10">contact()</span>
          </button>
          <button
            onClick={handleResumeDownload}
            data-cursor="pointer"
            className="btn-magnetic group relative px-8 py-4 rounded-full font-mono text-sm tracking-wider
              border border-[#555570]/30 text-[#8888A0]
              hover:border-[#F0F0F5]/30 hover:text-[#F0F0F5]
              transition-all duration-300"
          >
            <span className="relative z-10">download resume.pdf</span>
          </button>
        </motion.div>


      </div>
    </section>
  )
}
