import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/app/settings/profile-form"
import { SubscriptionCard } from "@/components/app/settings/subscription-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, X } from "lucide-react"
import type { Profile, Subscription } from "@/types"

export const metadata: Metadata = {
  title: "Inställningar",
  description: "Hantera ditt konto och prenumeration",
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const params = await searchParams
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Inställningar
        </h1>
        <p className="text-muted-foreground">
          Hantera ditt konto, prenumeration och preferenser
        </p>
      </div>

      {params.success && (
        <Alert variant="success">
          <Check className="h-4 w-4" />
          <AlertDescription>
            Din prenumeration har uppdaterats! Tack för ditt stöd.
          </AlertDescription>
        </Alert>
      )}

      {params.canceled && (
        <Alert>
          <X className="h-4 w-4" />
          <AlertDescription>
            Betalningen avbröts. Ingen ändring har gjorts.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        <ProfileForm profile={userProfile} />
        <SubscriptionCard subscription={userSubscription} />
      </div>
    </div>
  )
}
