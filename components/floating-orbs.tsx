"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type OrbConfig = {
  color: string
  size: number
  left: string
  top: string
  duration: number
  delay: number
}

const presets: Record<string, OrbConfig[]> = {
  cyan: [
    { color: "rgba(0, 245, 255, 0.07)", size: 400, left: "5%", top: "15%", duration: 20, delay: 0 },
    { color: "rgba(0, 245, 255, 0.04)", size: 300, left: "65%", top: "55%", duration: 25, delay: -8 },
    { color: "rgba(157, 0, 255, 0.03)", size: 250, left: "80%", top: "5%", duration: 22, delay: -14 },
  ],
  violet: [
    { color: "rgba(157, 0, 255, 0.07)", size: 400, left: "75%", top: "20%", duration: 22, delay: 0 },
    { color: "rgba(157, 0, 255, 0.04)", size: 300, left: "15%", top: "60%", duration: 18, delay: -6 },
    { color: "rgba(0, 245, 255, 0.03)", size: 250, left: "5%", top: "10%", duration: 24, delay: -12 },
  ],
  mixed: [
    { color: "rgba(0, 245, 255, 0.06)", size: 350, left: "10%", top: "20%", duration: 20, delay: 0 },
    { color: "rgba(157, 0, 255, 0.06)", size: 350, left: "70%", top: "40%", duration: 23, delay: -7 },
    { color: "rgba(0, 200, 180, 0.04)", size: 280, left: "45%", top: "75%", duration: 26, delay: -14 },
  ],
}

export default function FloatingOrbs({ variant = "cyan" }: { variant?: "cyan" | "violet" | "mixed" }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  const orbs = presets[variant] || presets.cyan

  return (
    <motion.div ref={ref} style={{ y }} className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float-orb"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: orb.left,
            top: orb.top,
            filter: `blur(${orb.size > 350 ? 120 : 80}px)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </motion.div>
  )
}
