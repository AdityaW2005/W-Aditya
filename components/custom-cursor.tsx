"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isText, setIsText] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const ringX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 })
  const ringY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 })
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion.current) return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, label, [data-cursor='pointer']")
      const textEl = target.closest("p, h1, h2, h3, h4, h5, h6, span, li")
      setIsHovering(!!interactive)
      setIsText(!!textEl && !interactive)
    }

    window.addEventListener("mousemove", moveCursor, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY, isVisible])

  // Don't render on touch devices or reduced motion
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 0.5 : isText ? 0.2 : 1,
            width: isText ? 3 : 8,
            height: isText ? 24 : 8,
            borderRadius: isText ? 1 : 999,
          }}
          transition={{ duration: 0.2 }}
          className="bg-[#00F5FF] rounded-full"
          style={{
            boxShadow: isVisible ? "0 0 12px rgba(0, 245, 255, 0.6), 0 0 24px rgba(0, 245, 255, 0.3)" : "none",
          }}
        />
      </motion.div>
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 56 : isText ? 0 : 36,
            height: isHovering ? 56 : isText ? 0 : 36,
            opacity: isVisible ? (isText ? 0 : 0.5) : 0,
            borderColor: isHovering ? "rgba(157, 0, 255, 0.6)" : "rgba(0, 245, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          className="rounded-full border-[1.5px]"
        />
      </motion.div>
    </>
  )
}
