"use client"

import { useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"
import Preloader from "@/components/preloader"
import Navbar from "@/components/navbar"
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
import SmoothScrollProvider from "@/components/smooth-scroll"
import HeroSection from "@/components/sections/hero"
import AboutSection from "@/components/sections/about"
import TechStackSection from "@/components/sections/tech-stack"
import ProjectsSection from "@/components/sections/projects"
import ContactSection from "@/components/sections/contact"
import SectionDivider from "@/components/section-divider"

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!isLoaded && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <SmoothScrollProvider>
        <main className="relative bg-[#0A0A0F] min-h-screen">
          <Navbar />
          <HeroSection />
          <SectionDivider />
          <AboutSection />
          <SectionDivider />
          <TechStackSection />
          <SectionDivider />
          <ProjectsSection />
          <SectionDivider />
          <ContactSection />
        </main>
      </SmoothScrollProvider>
    </>
  )
}