import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { PRICING_PLANS } from "@/lib/constants"

export function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Enkel prissättning utan krångel
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Börja gratis. Uppgradera när du behöver mer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col dark:bg-slate-800 ${
                plan.highlighted
                  ? "border-primary dark:border-accent border-2 shadow-xl"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-accent text-white px-4 py-1">Populärast</Badge>
                </div>
              )}

              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold dark:text-white">{plan.name}</CardTitle>
                <div className="mt-6">
                  <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{plan.price} kr</span>
                  <span className="text-lg text-slate-500 dark:text-slate-400">/{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-8">
                <Link href={`/register?plan=${plan.id}`} className="w-full">
                  <Button
                    size="lg"
                    className={`w-full text-base font-semibold py-6 ${
                      plan.highlighted
                        ? "shadow-lg hover:shadow-xl transition-shadow"
                        : ""
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
