import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  DoorOpen,
  Ruler,
  Calculator,
  FileDown,
  FolderOpen,
} from "lucide-react"
import { FEATURES } from "@/lib/constants"

const iconMap = {
  Home: Home,
  DoorOpen: DoorOpen,
  Ruler: Ruler,
  Calculator: Calculator,
  FileDown: FileDown,
  FolderOpen: FolderOpen,
}

export function Features() {
  return (
    <section id="features" className="section-padding bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Allt du behöver för snabbare kalkyler
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            AI-driven precision som sparar tid och minskar fel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <Card
                key={index}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-accent/50 dark:hover:border-accent/50 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="space-y-5">
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 dark:bg-accent/20">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
