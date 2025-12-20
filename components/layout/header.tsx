import { createClient } from "@/lib/supabase/server"
import { HeaderClient } from "./header-client"
import type { Profile, Subscription } from "@/types"

export async function Header() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: Profile | null = null
  let subscription: Subscription | null = null

  if (user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    const { data: subData } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .single()

    profile = profileData || {
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name || null,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    subscription = subData || {
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
  }

  return <HeaderClient user={user} profile={profile} subscription={subscription} />
}
