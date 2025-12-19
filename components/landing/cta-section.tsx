import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CTA_SECTION } from "@/lib/constants"

export function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary to-accent dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {CTA_SECTION.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-teal-50 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {CTA_SECTION.subheadline}
          </p>

          {/* CTA Button */}
          <div className="pt-6">
            <Link href="/register">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-16 py-8 h-auto bg-white dark:bg-accent text-primary dark:text-white hover:bg-slate-50 dark:hover:bg-accent/90 font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-200"
              >
                {CTA_SECTION.cta}
              </Button>
            </Link>
          </div>

          {/* Micro Copy */}
          <p className="text-base text-teal-100 dark:text-slate-400 pt-4">{CTA_SECTION.microCopy}</p>
        </div>
      </div>
    </section>
  )
}
