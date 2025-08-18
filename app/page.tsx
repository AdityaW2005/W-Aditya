"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Moon,
  Sun,
  Github,
  MessageCircle,
  ExternalLink,
  Code,
  Smartphone,
  Globe,
  GitBranch,
  Terminal,
  ChevronDown,
  Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)

      const sections = ["hero", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const skills = [
    {
      category: "Mobile Development",
      items: [
        { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
      ],
      icon: Smartphone,
    },
    {
      category: "Web Technologies",
      items: [
        { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        {
          name: "JavaScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
      ],
      icon: Globe,
    },
    {
      category: "Programming Languages",
      items: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      ],
      icon: Code,
    },
    {
      category: "Communication",
      items: [
        {
          name: "Discord",
          logo: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png",
        },
      ],
      icon: MessageCircle,
    },
    {
      category: "Version Control",
      items: [
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "GitHub", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg" },
      ],
      icon: GitBranch,
    },
    {
      category: "Development Tools",
      items: [
        { name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      ],
      icon: Terminal,
    },
  ]

  const projects = [
    {
      title: "AWS Exam Prep Website",
      description:
        "A comprehensive web application designed to help students prepare for AWS certification exams with interactive flashcards, quiz questions, and issue reporting functionality for enhanced learning experience.",
      tags: ["TypeScript", "Next.js", "React", "CSS", "Web Development"],
      github: "https://github.com/AdityaW2005/aws-exam-prep-website",
      liveUrl: "https://aws-exam-prep.vercel.app/",
    },
    {
      title: "Tic Tac Toe Mobile App",
      description:
        "A cross-platform mobile game built with Flutter featuring the classic tic-tac-toe gameplay. Demonstrates mobile development skills with clean UI design and smooth user interactions across Android and iOS platforms.",
      tags: ["Flutter", "Dart", "Mobile Development", "Cross-platform", "Game Development"],
      github: "https://github.com/AdityaW2005/tic-tac-toe-app",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-xl bg-background/90 border-b border-border/50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-serif font-bold text-xl animate-slide-in-left">W Aditya</div>

            <div className="hidden md:flex space-x-8">
              {["hero", "about", "skills", "projects", "contact"].map((section, index) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:scale-105 relative ${
                    activeSection === section ? "font-medium" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {section === "hero" ? "Home" : section}
                  {activeSection === section && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="animate-slide-in-right hover:scale-110 transition-all duration-300 rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      <section
        ref={heroRef}
        id="hero"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-20"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(5, 150, 105, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 70%),
            linear-gradient(135deg, 
              rgba(16, 185, 129, 0.08) 0%, 
              rgba(5, 150, 105, 0.04) 50%, 
              rgba(16, 185, 129, 0.08) 100%)
          `,
        }}
      >
        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-accent/30 to-primary/15 rounded-full animate-float blur-sm"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/15 rounded-full animate-float blur-sm"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-br from-accent/25 to-primary/10 rounded-full animate-float blur-sm"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-primary/25 to-accent/10 rounded-full animate-float blur-sm"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/5 rounded-full animate-float blur-md"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/5 rounded-full animate-float blur-md"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <h1 className="font-serif font-bold text-7xl sm:text-8xl lg:text-9xl mb-8 animate-fade-in-up bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent leading-tight">
              W Aditya
            </h1>

            <div className="text-3xl sm:text-4xl lg:text-5xl mb-12 animate-fade-in-up font-light" style={{ animationDelay: "0.2s" }}>
              <span className="animate-typing text-foreground/90">Computer Science Student</span>
            </div>

            <p
              className="text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed animate-fade-in-up text-foreground/80 font-light mb-4"
              style={{ animationDelay: "0.4s" }}
            >
              Passionate about mobile development and collaborative coding. I specialize in Flutter development,
              algorithmic problem solving, and building innovative trading platforms that bring teams together.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/20">
                App Developer
              </span>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                Web Developer
              </span>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium border border-accent/20">
                Algorithmic Problem Solver
              </span>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up mb-12"
            style={{ animationDelay: "0.9s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white px-8 py-4 text-lg hover-lift transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => scrollToSection("projects")}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg glass hover-lift transition-all duration-300 bg-background/50 backdrop-blur-sm border-border/50 hover:!text-current"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-center mb-16 animate-fade-in-up">About Me</h2>

          <div className="flex justify-center">
            <div className="animate-fade-in-up max-w-3xl w-full">
              <Card className="glass hover-lift border-0 shadow-xl bg-background/60 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-primary/8 rounded-lg" />
                <CardContent className="p-10 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-serif font-semibold text-3xl">Computer Science Journey</h3>
                    <div className="p-3 rounded-full bg-gradient-to-br from-accent/20 to-primary/20">
                      <ExternalLink className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="space-y-6 leading-relaxed text-lg">
                    <p>
                      I'm a dedicated computer science student with a deep passion for mobile app development and
                      collaborative coding. My expertise lies in Flutter development, where I create cross-platform
                      applications that deliver exceptional user experiences.
                    </p>
                    <p>
                      I thrive in collaborative environments and have extensive experience building trading platforms
                      that combine algorithmic problem solving with intuitive user interfaces. My approach to
                      development emphasizes clean code, efficient algorithms, and seamless team collaboration.
                    </p>
                    <p>
                      Always eager to learn new technologies and contribute to innovative projects that push the
                      boundaries of mobile development and collaborative software engineering.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-center mb-16 animate-fade-in-up">
            Skills & Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <Card
                  key={skill.category}
                  className="hover-lift shadow-xl animate-fade-in-up bg-background/60 backdrop-blur-sm relative overflow-hidden border-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg" />
                  <CardHeader className="pb-4 relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-sm">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-serif">{skill.category}</CardTitle>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {skill.items.map((item, itemIndex) => (
                        <div
                          key={item.name}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/15 transition-all duration-300 hover:scale-105 bg-background/40 backdrop-blur-sm"
                          style={{ animationDelay: `${index * 0.1 + itemIndex * 0.05}s` }}
                        >
                          <img
                            src={item.logo || "/placeholder.svg"}
                            alt={`${item.name} logo`}
                            className="w-8 h-8 object-contain opacity-90 hover:opacity-100 transition-opacity"
                          />
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-center mb-16 animate-fade-in-up">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="hover-lift shadow-xl group animate-fade-in-up bg-background/60 backdrop-blur-sm relative overflow-hidden border-0"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-primary/8 rounded-lg" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="font-serif text-xl group-hover:scale-105 transition-transform duration-300">
                      {project.title}
                    </CardTitle>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(project.github, "_blank")}
                        className="hover:scale-110 rounded-full"
                        title="View Source Code"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                      {(project as any).liveUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open((project as any).liveUrl, "_blank")}
                          className="hover:scale-110 rounded-full"
                          title="View Live Site"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardDescription className="leading-relaxed text-base mb-4">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="hover:bg-accent/15 transition-colors bg-background/60 backdrop-blur-sm border-border/50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl mb-8 animate-fade-in-up">Let's Connect</h2>
          <p
            className="text-xl mb-16 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            I'm always interested in collaborating on innovative projects and connecting with fellow developers. Let's
            build something amazing together!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button
              variant="outline"
              size="lg"
              className="h-20 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:scale-105"
              style={{ animationDelay: "0.4s" }}
              onClick={() => window.open("https://github.com/AdityaW2005", "_blank")}
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
                alt="GitHub logo"
                className="w-6 h-6 mr-3 dark:invert opacity-90 hover:opacity-100 transition-opacity"
              />
              <span className="font-medium">GitHub</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-20 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:scale-105"
              style={{ animationDelay: "0.5s" }}
              onClick={() => window.open("mailto:adhiw2005@gmail.com", "_blank")}
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gmail.svg"
                alt="Gmail logo"
                className="w-6 h-6 mr-3 opacity-90 hover:opacity-100 transition-opacity"
                style={{
                  filter: "invert(26%) sepia(89%) saturate(1583%) hue-rotate(351deg) brightness(99%) contrast(97%)",
                }}
              />
              <span className="font-medium">Email</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-20 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:scale-105"
              style={{ animationDelay: "0.6s" }}
              onClick={() => window.open("https://www.linkedin.com/in/w-aditya-ba5357293/", "_blank")}
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                alt="LinkedIn logo"
                className="w-6 h-6 mr-3 opacity-90 hover:opacity-100 transition-opacity"
                style={{
                  filter: "invert(10%) sepia(100%) saturate(1592%) hue-rotate(202deg) brightness(101%) contrast(101%)",
                }}
              />
              <span className="font-medium">LinkedIn</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-20 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/50 hover:scale-105"
              style={{ animationDelay: "0.7s" }}
              onClick={() => window.open("https://discord.com/channels/@me", "_blank")}
            >
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/discord.svg"
                alt="Discord logo"
                className="w-6 h-6 mr-3 opacity-90 hover:opacity-100 transition-opacity"
                style={{
                  filter: "invert(40%) sepia(98%) saturate(4577%) hue-rotate(231deg) brightness(91%) contrast(87%)",
                }}
              />
              <span className="font-medium">Discord</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
