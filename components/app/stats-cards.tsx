import { Card, CardContent } from "@/components/ui/card"
import { FolderOpen, Upload, CreditCard } from "lucide-react"
import type { Subscription } from "@/types"

interface StatsCardsProps {
  totalProjects: number
  subscription: Subscription
}

export function StatsCards({ totalProjects, subscription }: StatsCardsProps) {
  const planLabels = {
    free: "Gratis",
    pro: "Pro",
    business: "Business",
  }

  const stats = [
    {
      name: "Totalt projekt",
      value: totalProjects.toString(),
      icon: FolderOpen,
    },
    {
      name: "Uploads denna månad",
      value: `${subscription.monthly_uploads_used}/${subscription.monthly_uploads_limit}`,
      icon: Upload,
    },
    {
      name: "Nuvarande plan",
      value: planLabels[subscription.plan_id],
      icon: CreditCard,
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardContent className="p-8">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-primary-50 dark:bg-primary-700/20 rounded-xl">
                <stat.icon className="h-7 w-7 text-primary dark:text-primary-100" />
              </div>
              <div>
                <p className="text-base text-muted-foreground">{stat.name}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
