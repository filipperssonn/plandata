import { createClient } from "@/lib/supabase/server"
import { HeaderClient } from "./header-client"
import type { Profile, Subscription } from "@/types"

export async function Header() {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    // Om autentisering misslyckas, visa header utan användare
    if (authError) {
      return <HeaderClient user={null} profile={null} subscription={null} />
    }

    let profile: Profile | null = null
    let subscription: Subscription | null = null

    if (user) {
      try {
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
      } catch (error) {
        // Om databas-anrop misslyckas, använd fallback-värden
        console.error("Error fetching user data:", error)
        profile = {
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        subscription = {
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
    }

    return <HeaderClient user={user} profile={profile} subscription={subscription} />
  } catch (error) {
    // Om något annat går fel, visa header utan användare
    console.error("Error in Header component:", error)
    return <HeaderClient user={null} profile={null} subscription={null} />
  }
}
