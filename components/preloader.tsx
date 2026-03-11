"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const lines = [
    "> initializing system...",
    "> loading modules: [three.js, gsap, r3f]",
    "> compiling shaders ████████████ 100%",
    "> portfolio.build() — OK",
    "> ready.",
  ]

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      onComplete()
      return
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 4
      })
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (progress < 20) setPhase(0)
    else if (progress < 40) setPhase(1)
    else if (progress < 65) setPhase(2)
    else if (progress < 85) setPhase(3)
    else setPhase(4)
  }, [progress])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(onComplete, 300)
      return () => clearTimeout(timeout)
    }
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: "#0A0A0F" }}
        >
          <div className="w-full max-w-md px-6">
            <div className="font-mono text-sm space-y-1 mb-6">
              {lines.slice(0, phase + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={i === phase ? "text-[#00F5FF]" : "text-[#555570]"}
                >
                  {line}
                </motion.div>
              ))}
            </div>
            <div className="h-[2px] w-full bg-[#14141E] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #00F5FF, #9D00FF)",
                }}
              />
            </div>
            <div className="mt-2 text-right font-mono text-xs text-[#555570]">{progress}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
