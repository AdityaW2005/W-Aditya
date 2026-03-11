"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FloatingOrbs from "@/components/floating-orbs"

interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  liveUrl?: string
  span?: string // grid span class
}

const projects: Project[] = [
  {
    title: "AWS Exam Prep Website",
    description:
      "A comprehensive web application designed to help students prepare for AWS certification exams with interactive flashcards, quiz questions, and issue reporting functionality for enhanced learning experience.",
    tags: ["TypeScript", "Next.js", "React", "CSS", "Web Development"],
    github: "https://github.com/AdityaW2005/aws-exam-prep-website",
    liveUrl: "https://aws-exam-prep.vercel.app/",
    span: "md:col-span-2",
  },
  {
    title: "Tic Tac Toe Mobile App",
    description:
      "A cross-platform mobile game built with Flutter featuring the classic tic-tac-toe gameplay. Demonstrates mobile development skills with clean UI design and smooth user interactions across Android and iOS platforms.",
    tags: ["Flutter", "Dart", "Mobile Development", "Cross-platform", "Game Development"],
    github: "https://github.com/AdityaW2005/tic-tac-toe-app",
    span: "md:col-span-1",
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.2,
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      }}
      className={`${project.span || ""} group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-full glass rounded-2xl overflow-hidden transition-all duration-500
          hover:glow-cyan border border-transparent hover:border-[#00F5FF]/20"
        style={{
          transform: isHovered ? "translateY(-4px) translateZ(20px)" : "translateY(0) translateZ(0)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/5 via-transparent to-[#9D00FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 sm:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F0F0F5] group-hover:text-[#00F5FF] transition-colors duration-300">
              {project.title}
            </h3>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="p-2 rounded-lg glass hover:glow-cyan transition-all"
                title="Source Code"
              >
                <svg className="w-5 h-5 text-[#8888A0] hover:text-[#00F5FF]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="p-2 rounded-lg glass hover:glow-violet transition-all"
                  title="Live Demo"
                >
                  <svg className="w-5 h-5 text-[#8888A0] hover:text-[#9D00FF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#8888A0] text-sm leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                initial={false}
                animate={isHovered ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                className="px-3 py-1 rounded-full text-xs font-mono
                  bg-[#14141E] text-[#555570] border border-[#555570]/20
                  group-hover:border-[#00F5FF]/20 group-hover:text-[#00F5FF]/70
                  transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Animated underline link */}
          <div className="mt-6 pt-4 border-t border-white/5">
            <a
              href={project.liveUrl || project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              className="inline-flex items-center gap-2 font-mono text-sm text-[#555570] 
                group-hover:text-[#00F5FF] transition-colors"
            >
              <span className="relative">
                View Project
                <svg className="absolute -bottom-1 left-0 w-full h-[1px] text-[#00F5FF]" viewBox="0 0 100 1">
                  <line
                    x1="0" y1="0.5" x2="100" y2="0.5"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="100"
                    strokeDashoffset={isHovered ? "0" : "100"}
                    style={{ transition: "stroke-dashoffset 0.4s ease" }}
                  />
                </svg>
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <FloatingOrbs variant="mixed" />
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          <span className="font-mono text-[#00F5FF]">./</span>projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-[#555570] font-mono text-sm mb-16"
        >
          things I&apos;ve built and shipped
        </motion.p>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
