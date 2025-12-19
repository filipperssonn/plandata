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
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <stat.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-white">
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
