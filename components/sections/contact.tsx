"use client"

import { motion } from "framer-motion"
import FloatingOrbs from "@/components/floating-orbs"

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/AdityaW2005",
    handle: "AdityaW2005",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/w-aditya-ba5357293/",
    handle: "w-aditya",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:adhiw2005@gmail.com",
    handle: "adhiw2005@gmail.com",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 overflow-hidden">
      <FloatingOrbs variant="cyan" />
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="max-w-2xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          Let&apos;s <span className="text-[#00F5FF]">Connect</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-[#8888A0] text-sm sm:text-base mb-16 max-w-md mx-auto leading-relaxed"
        >
          I&apos;m always interested in collaborating on innovative projects and connecting
          with fellow developers. Let&apos;s build something amazing together!
        </motion.p>

        <div className="space-y-4">
          {socialLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto") ? undefined : "noopener noreferrer"}
              data-cursor="pointer"
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15 + i * 0.12,
                type: "spring",
                stiffness: 150,
                damping: 15,
              }}
              whileHover={{ x: 6 }}
              className="flex items-center gap-5 p-5 rounded-xl glass hover-lift
                border border-transparent hover:border-[#00F5FF]/15 transition-all group"
            >
              <div className="p-3 rounded-xl bg-[#14141E] text-[#8888A0] group-hover:text-[#00F5FF] transition-colors">
                {link.icon}
              </div>
              <div className="flex-1">
                <div className="font-serif text-lg font-bold text-[#F0F0F5] group-hover:text-[#00F5FF] transition-colors">
                  {link.name}
                </div>
                <div className="font-mono text-xs text-[#555570]">
                  {link.handle}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-[#555570] group-hover:text-[#00F5FF] transition-all group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass rounded-xl py-4 px-6 inline-block">
            <span className="font-mono text-xs text-[#555570]">
              <span className="text-[#00F5FF]">const</span> availability ={" "}
              <span className="text-[#28C840]">&quot;open for opportunities&quot;</span>;
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
