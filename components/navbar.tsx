"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "/about", href: "#about" },
  { label: "./skills", href: "#skills" },
  { label: "./projects", href: "#projects" },
  { label: "contact()", href: "#contact" },
]

export default function Navbar() {
  const [active, setActive] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ["hero", "about", "skills", "projects", "contact"]
      const scrollPos = window.scrollY + 200
      let current = "hero"
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && scrollPos >= el.offsetTop - 100) {
          current = sections[i]
          break
        }
      }
      setActive(current)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 
          ${scrolled ? "glass-strong glow-cyan" : "glass"}
          rounded-full px-2 py-2 hidden md:flex items-center gap-1`}
      >
        {navItems.map((item) => {
          const id = item.href.replace("#", "")
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(item.href)}
              data-cursor="pointer"
              className={`relative px-4 py-2 text-sm font-mono transition-colors duration-300
                ${isActive ? "text-[#00F5FF]" : "text-[#8888A0] hover:text-[#F0F0F5]"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(0, 245, 255, 0.08)", border: "1px solid rgba(0, 245, 255, 0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </motion.nav>

      {/* Mobile hamburger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-4 right-4 z-[101] md:hidden glass rounded-full w-12 h-12 flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        data-cursor="pointer"
      >
        <div className="flex flex-col gap-1.5 items-center">
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-[#00F5FF]"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-[2px] bg-[#00F5FF]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-[2px] bg-[#00F5FF]"
          />
        </div>
      </motion.button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 2rem) 2rem)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 2rem) 2rem)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#0A0A0F]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {navItems.map((item, i) => {
              const id = item.href.replace("#", "")
              return (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2 }}
                  onClick={() => scrollTo(item.href)}
                  className={`text-2xl font-mono transition-colors ${
                    active === id ? "text-[#00F5FF] text-glow-cyan" : "text-[#8888A0]"
                  }`}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
