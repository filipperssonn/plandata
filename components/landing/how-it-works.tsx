import { Card, CardContent } from "@/components/ui/card"
import { Upload, Brain, Download } from "lucide-react"
import { HOW_IT_WORKS } from "@/lib/constants"
import { Fragment } from "react"

const iconMap = {
  Upload: Upload,
  Brain: Brain,
  Download: Download,
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Tre steg till strukturerad data
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Från PDF till färdig data på minuter
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">
          {HOW_IT_WORKS.map((step, index) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap]
            return (
              <Fragment key={step.step}>
                <div className="flex-1 w-full md:w-auto flex">
                  <Card className="w-full border-slate-200 dark:border-slate-700 dark:bg-slate-900 hover:shadow-xl hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-300 flex flex-col">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center space-y-6">
                        {/* Step Number Badge */}
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white text-2xl font-bold shadow-lg">
                          {step.step}
                        </div>

                        {/* Icon */}
                        <div className="text-primary dark:text-accent">
                          <Icon className="h-14 w-14" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Arrow connector (desktop only) - between cards */}
                {index < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:flex items-center justify-center flex-shrink-0">
                    <svg
                      className="h-8 w-8 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
