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
  Download,
} from "lucide-react"
import { useTheme } from "next-themes"

interface Project {
  title: string
  description: string
  tags: string[]
  github: string
  liveUrl?: string
}

interface SkillItem {
  name: string
  logo: string
}

interface Skill {
  category: string
  items: SkillItem[]
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      try {
        setScrollY(window.scrollY)

        const sections = ["hero", "about", "skills", "projects", "contact"]
        const scrollPosition = window.scrollY + 150 // Increased offset for better detection

        // Find the section that's currently in view
        let currentSection = "hero"
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i]
          const element = document.getElementById(section)
          if (element) {
            const offsetTop = element.offsetTop
            if (scrollPosition >= offsetTop - 100) {
              currentSection = section
              break
            }
          }
        }

        setActiveSection(currentSection)
      } catch (error) {
        console.error("Error in scroll handler:", error)
      }
    }

    // Initial call to set correct section
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const skills: Skill[] = [
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

  const projects: Project[] = [
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
    try {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.error("Error scrolling to section:", error)
    }
  }

  const handleExternalLink = (url: string) => {
    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Error opening external link:", error)
    }
  }

  const handleResumeDownload = async () => {
    try {
      // Fetch the latest release from GitHub API
      const response = await fetch("https://api.github.com/repos/AdityaW2005/AdityaW2005/releases/latest")
      const releaseData = await response.json()
      
      if (releaseData.assets && releaseData.assets.length > 0) {
        // Find the resume asset (typically a PDF file)
        const resumeAsset = releaseData.assets.find((asset: any) => 
          asset.name.toLowerCase().includes('resume') || 
          asset.name.toLowerCase().includes('cv') ||
          asset.content_type === 'application/pdf'
        ) || releaseData.assets[0] // Fallback to first asset if no resume found
        
        // Method 1: Try blob download (prevents browser modifications)
        try {
          const fileResponse = await fetch(resumeAsset.browser_download_url, {
            headers: {
              'Accept': 'application/pdf',
              'Cache-Control': 'no-cache'
            }
          })
          const blob = await fileResponse.blob()
          
          // Ensure it's treated as PDF
          const pdfBlob = new Blob([blob], { type: 'application/pdf' })
          
          // Create object URL and download
          const url = window.URL.createObjectURL(pdfBlob)
          const link = document.createElement('a')
          link.href = url
          link.download = resumeAsset.name || 'W_Aditya_Resume.pdf'
          link.style.display = 'none'
          link.setAttribute('target', '_blank')
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          // Clean up the object URL after a short delay
          setTimeout(() => window.URL.revokeObjectURL(url), 1000)
          
        } catch (blobError) {
          console.log("Blob method failed, trying direct download:", blobError)
          
          // Method 2: Direct download via window.location
          const downloadLink = document.createElement('a')
          downloadLink.href = resumeAsset.browser_download_url
          downloadLink.download = resumeAsset.name || 'W_Aditya_Resume.pdf'
          downloadLink.target = '_blank'
          downloadLink.style.display = 'none'
          document.body.appendChild(downloadLink)
          downloadLink.click()
          document.body.removeChild(downloadLink)
        }
        
      } else {
        throw new Error('No resume assets found in latest release')
      }
    } catch (error) {
      console.error("Error downloading resume from GitHub:", error)
      
      // Method 3: Ultimate fallback - direct GitHub download URL
      try {
        // Use the known direct URL from the API response we saw
        const directUrl = "https://github.com/AdityaW2005/AdityaW2005/releases/download/v.1.0.1/W.Aditya.Resume.pdf"
        const link = document.createElement('a')
        link.href = directUrl
        link.download = "W_Aditya_Resume.pdf"
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } catch (finalError) {
        console.error("All download methods failed:", finalError)
        // Final fallback: Open the releases page
        window.open("https://github.com/AdityaW2005/AdityaW2005/releases/latest", "_blank", "noopener,noreferrer")
      }
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

        <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
          <div className="mb-8 sm:mb-12">
            <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 sm:mb-8 animate-fade-in-up bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent leading-tight">
              W Aditya
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-12 animate-fade-in-up font-light" style={{ animationDelay: "0.2s" }}>
              <span className="animate-typing text-foreground/90">Computer Science Student</span>
            </div>

            <p
              className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed animate-fade-in-up text-foreground/80 font-light mb-4 px-4"
              style={{ animationDelay: "0.4s" }}
            >
              Passionate Computer Science student specializing in Full Stack Development and Mobile App Development. 
              I build innovative applications that bridge web and mobile platforms, combining algorithmic problem 
              solving with modern user experiences.
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 animate-fade-in-up px-4" style={{ animationDelay: "0.6s" }}>
              <span className="bg-accent/10 text-accent px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-accent/20">
                Full Stack Developer
              </span>
              <span className="bg-accent/10 text-accent px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-accent/20">
                Mobile App Developer
              </span>
              <span className="bg-accent/10 text-accent px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-accent/20">
                Algorithmic Problem Solver
              </span>
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up mb-8 sm:mb-12 px-4"
            style={{ animationDelay: "0.9s" }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover-lift transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              onClick={() => scrollToSection("projects")}
            >
              <Sparkles className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              View My Work
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-teal-600 hover:to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover-lift transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
              onClick={handleResumeDownload}
            >
              <Download className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
              Download Resume
            </Button>
          </div>

          <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>
      </section>

      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/20 to-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-12 sm:mb-16 animate-fade-in-up">About Me</h2>

          <div className="flex justify-center">
            <div className="animate-fade-in-up max-w-3xl w-full">
              <Card className="glass hover-lift border-0 shadow-xl bg-background/60 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/8 to-primary/8 rounded-lg" />
                <CardContent className="p-6 sm:p-8 md:p-10 relative z-10">
                  <div className="mb-6 sm:mb-8">
                    <h3 className="font-serif font-semibold text-2xl sm:text-3xl">Full Stack & Mobile Developer</h3>
                  </div>
                  <div className="space-y-4 sm:space-y-6 leading-relaxed text-base sm:text-lg">
                    <p>
                      I'm a passionate Computer Science student specializing as a Full Stack Developer and Mobile App Developer. 
                      My expertise spans across web development with modern frameworks like React and Next.js, and mobile 
                      development with Flutter, creating seamless cross-platform applications that deliver exceptional user experiences.
                    </p>
                    <p>
                      As a full stack developer, I work with both frontend and backend technologies, building complete web 
                      applications from database design to responsive user interfaces. My mobile development skills in Flutter 
                      and Dart allow me to create high-performance apps that work flawlessly across iOS and Android platforms.
                    </p>
                    <p>
                      I thrive in collaborative environments and have experience building trading platforms, AWS certification 
                      tools, and various mobile applications. My approach emphasizes clean code, efficient algorithms, modern 
                      design patterns, and delivering solutions that combine technical excellence with intuitive user experiences.
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
                        onClick={() => handleExternalLink(project.github)}
                        className="hover:scale-110 rounded-full"
                        title="View Source Code"
                      >
                        <Github className="h-5 w-5" />
                      </Button>
                      {project.liveUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleExternalLink(project.liveUrl!)}
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

      <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl mb-8 sm:mb-12 animate-fade-in-up">Let's Connect</h2>
          <p
            className="text-lg sm:text-xl mb-16 sm:mb-20 max-w-3xl mx-auto leading-relaxed animate-fade-in-up text-foreground/80 px-4"
            style={{ animationDelay: "0.2s" }}
          >
            I'm always interested in collaborating on innovative projects and connecting with fellow developers. Let's
            build something amazing together!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
            <Button
              variant="outline"
              size="lg"
              className="h-20 sm:h-24 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: "0.4s" }}
              onClick={() => handleExternalLink("https://github.com/AdityaW2005")}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg"
                  alt="GitHub logo"
                  className="w-6 sm:w-8 h-6 sm:h-8 dark:invert opacity-90 hover:opacity-100 transition-opacity"
                />
                <span className="font-medium text-xs sm:text-sm">GitHub</span>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-20 sm:h-24 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: "0.5s" }}
              onClick={() => handleExternalLink("mailto:adhiw2005@gmail.com")}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/gmail.svg"
                  alt="Gmail logo"
                  className="w-6 sm:w-8 h-6 sm:h-8 opacity-90 hover:opacity-100 transition-opacity"
                  style={{
                    filter: "invert(26%) sepia(89%) saturate(1583%) hue-rotate(351deg) brightness(99%) contrast(97%)",
                  }}
                />
                <span className="font-medium text-xs sm:text-sm">Email</span>
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-20 sm:h-24 glass hover-lift transition-all duration-300 hover:bg-accent/10 hover:!text-current animate-fade-in-up bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent hover:scale-105 hover:shadow-lg"
              style={{ animationDelay: "0.6s" }}
              onClick={() => handleExternalLink("https://www.linkedin.com/in/w-aditya-ba5357293/")}
            >
              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                  alt="LinkedIn logo"
                  className="w-6 sm:w-8 h-6 sm:h-8 opacity-90 hover:opacity-100 transition-opacity"
                  style={{
                    filter: "invert(10%) sepia(100%) saturate(1592%) hue-rotate(202deg) brightness(101%) contrast(101%)",
                  }}
                />
                <span className="font-medium text-xs sm:text-sm">LinkedIn</span>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
