"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import FloatingOrbs from "@/components/floating-orbs"

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const paragraphVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="about" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <FloatingOrbs variant="cyan" />
      <div className="grid-bg absolute inset-0 opacity-50" />

      <div ref={ref} className="max-w-3xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="font-mono text-[#00F5FF]">/</span>about-me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-xl p-6 sm:p-10 relative overflow-hidden"
        >
          {/* Animated accent line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 w-[2px] animate-shimmer-line"
            style={{
              background: "linear-gradient(180deg, #00F5FF, #9D00FF, transparent)",
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-5 text-[#8888A0] leading-relaxed"
          >
            <motion.p variants={paragraphVariants}>
              I&apos;m a passionate Computer Science student specializing as a Full Stack Developer and Mobile App Developer.
              My expertise spans across web development with modern frameworks like React and Next.js, and mobile
              development with Flutter, creating seamless cross-platform applications.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              As a full stack developer, I work with both frontend and backend technologies, building complete web
              applications from database design to responsive user interfaces. My mobile development skills in Flutter
              and Dart allow me to create high-performance apps across iOS and Android platforms.
            </motion.p>
            <motion.p variants={paragraphVariants}>
              I thrive in collaborative environments and have experience building trading platforms, AWS certification
              tools, and various mobile applications. My approach emphasizes clean code, efficient algorithms, modern
              design patterns, and delivering solutions that combine technical excellence with intuitive user experiences.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
