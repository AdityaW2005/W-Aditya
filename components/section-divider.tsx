"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function SectionDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="relative h-px flex items-center justify-center mx-auto max-w-6xl">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md h-px origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.4), rgba(157, 0, 255, 0.4), transparent)",
        }}
      />
      {/* Glowing center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
        className="absolute w-1.5 h-1.5 rounded-full bg-[#00F5FF]"
        style={{
          boxShadow: "0 0 10px rgba(0, 245, 255, 0.8), 0 0 25px rgba(0, 245, 255, 0.4)",
        }}
      />
    </div>
  )
}
