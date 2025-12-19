import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AppHeader } from "@/components/app/app-header"
import { Sidebar } from "@/components/app/sidebar"
import type { Profile, Subscription } from "@/types"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
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

  // Create default profile and subscription if they don't exist
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <AppHeader profile={userProfile} subscription={userSubscription} />
      <Sidebar />
      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
