import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { StatsCards } from "@/components/app/stats-cards"
import { ProjectList } from "@/components/app/project-list"
import type { Profile, Subscription, Project } from "@/types"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Översikt över dina projekt och analyser",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .single()

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10)

  const userProfile: Profile = profile || {
    id: user.id,
    email: user.email || "",
    full_name: user.user_metadata?.full_name || null,
    avatar_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const userSubscription: Subscription = subscription || {
    id: "",
    user_id: user.id,
    plan_id: "free",
    stripe_customer_id: null,
    stripe_subscription_id: null,
    status: "active",
    current_period_start: null,
    current_period_end: null,
    monthly_uploads_used: 0,
    monthly_uploads_limit: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const userProjects: Project[] = projects || []

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Välkommen{userProfile.full_name ? `, ${userProfile.full_name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Här är en översikt av dina projekt och din användning
        </p>
      </div>

      <StatsCards
        totalProjects={userProjects.length}
        subscription={userSubscription}
      />

      <ProjectList projects={userProjects} />
    </div>
  )
}
