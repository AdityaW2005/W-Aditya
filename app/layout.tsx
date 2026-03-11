import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "W. Aditya — Full-Stack Developer · Flutter · Chess",
  description:
    "Portfolio of W. Aditya — 3rd-year CS undergrad, full-stack developer, Flutter developer, competitive programmer, AWS enthusiast, and chess content creator based in Hyderabad, India.",
  keywords: ["W Aditya", "portfolio", "developer", "full stack", "flutter", "chess", "competitive programming"],
  openGraph: {
    title: "W. Aditya — Full-Stack Developer",
    description: "I build things that live on the internet. Sometimes they even work.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0F] text-[#F0F0F5] antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
