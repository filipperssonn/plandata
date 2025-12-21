import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { SOCIAL_PROOF } from "@/lib/constants"

export function SocialProof() {
  return (
    <section className="section-padding bg-teal-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12">
            {SOCIAL_PROOF.headline}
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {SOCIAL_PROOF.stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl sm:text-5xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <Card className="bg-white dark:bg-slate-800 max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Quote className="h-8 w-8 text-accent mx-auto" />
                <p className="text-lg italic text-slate-700 dark:text-slate-300">
                  {SOCIAL_PROOF.testimonial.quote}
                </p>
                <div className="pt-4">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {SOCIAL_PROOF.testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {SOCIAL_PROOF.testimonial.role}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
