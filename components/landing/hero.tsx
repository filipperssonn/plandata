"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { HERO } from "@/lib/constants"

export function Hero() {
  const handleScroll = () => {
    const element = document.querySelector("#how-it-works")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-white dark:bg-slate-900 section-padding pt-24 lg:pt-32 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
            {HERO.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {HERO.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="text-lg px-12 py-6 h-auto w-full sm:w-auto font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {HERO.primaryCTA}
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-12 py-6 h-auto w-full sm:w-auto font-medium border-2 text-slate-900 dark:text-slate-200 hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.15)] dark:hover:bg-slate-800 transition-all"
              onClick={handleScroll}
            >
              {HERO.secondaryCTA}
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
            {HERO.trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-accent dark:text-accent" />
                </div>
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
