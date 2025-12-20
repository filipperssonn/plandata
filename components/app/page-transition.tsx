"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    setIsAnimating(false)
    // Trigger animation on route change
    const timeout = setTimeout(() => setIsAnimating(true), 10)
    return () => clearTimeout(timeout)
  }, [pathname])

  return (
    <div className={isAnimating ? "animate-page-enter" : "opacity-0"}>
      {children}
    </div>
  )
}
