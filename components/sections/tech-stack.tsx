"use client"

import { motion } from "framer-motion"
import FloatingOrbs from "@/components/floating-orbs"

const skills = [
  // Row 1
  [
    { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  ],
  // Row 2
  [
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Postman", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"},
  ],
]

function MarqueeRow({ items, reverse = false }: { items: typeof skills[0]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden w-full relative group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#0A0A0F] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#0A0A0F] to-transparent" />

      <div
        className={`flex gap-8 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationPlayState: "running" }}
      >
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3 rounded-xl glass hover:glow-cyan
              hover:border-[#00F5FF]/20 transition-all duration-300 group/item shrink-0"
          >
            <img
              src={skill.logo}
              alt={skill.name}
              className="w-8 h-8 object-contain opacity-70 group-hover/item:opacity-100 
                transition-all duration-300 group-hover/item:scale-110"
              style={skill.name === "GitHub" || skill.name === "Next.js" ? { filter: "invert(1)" } : undefined}
            />
            <span className="font-mono text-sm text-[#8888A0] group-hover/item:text-[#F0F0F5] transition-colors whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TechStackSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <FloatingOrbs variant="violet" />
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center px-6"
        >
          <span className="font-mono text-[#9D00FF]">./</span>tech-stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-[#555570] font-mono text-sm mb-12 px-6"
        >
          tools & technologies I work with
        </motion.p>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <MarqueeRow items={skills[0]} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <MarqueeRow items={skills[1]} reverse />
          </motion.div>
        </div>

        {/* Skill categories */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 px-6">
          {[
            { label: "Mobile Dev", desc: "Flutter · Dart", color: "#00F5FF" },
            { label: "Web Dev", desc: "React · Next.js · TS", color: "#9D00FF" },
            { label: "Languages", desc: "Java · Python · C++", color: "#00F5FF" },
            { label: "Tools", desc: "Git · VS Code · Docker . Postman", color: "#9D00FF" },
          ].map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + i * 0.12,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className="glass rounded-xl p-5 text-center hover-lift"
            >
              <div className="text-lg font-serif font-bold mb-1" style={{ color: cat.color }}>
                {cat.label}
              </div>
              <div className="text-xs font-mono text-[#555570]">{cat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
