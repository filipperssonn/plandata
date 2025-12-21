import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const now = new Date()

    // Hitta alla subscriptions vars period har passerat
    // och nollställ deras monthly_uploads_used
    const { data: expiredSubscriptions, error: fetchError } = await supabase
      .from("subscriptions")
      .select("id, user_id, current_period_end")
      .lt("current_period_end", now.toISOString())
      .gt("monthly_uploads_used", 0)

    if (fetchError) {
      throw fetchError
    }

    let resetCount = 0

    for (const subscription of expiredSubscriptions || []) {
      // Beräkna ny period (en månad framåt)
      const newPeriodStart = new Date()
      const newPeriodEnd = new Date()
      newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1)

      const { error: updateError } = await supabase
        .from("subscriptions")
        .update({
          monthly_uploads_used: 0,
          current_period_start: newPeriodStart.toISOString(),
          current_period_end: newPeriodEnd.toISOString(),
          updated_at: now.toISOString(),
        })
        .eq("id", subscription.id)

      if (!updateError) {
        resetCount++
      }
    }

    // För gratis-användare som saknar current_period_end,
    // sätt upp initiala värden baserat på created_at
    const { data: uninitializedSubs, error: uninitError } = await supabase
      .from("subscriptions")
      .select("id, created_at")
      .is("current_period_end", null)

    if (!uninitError && uninitializedSubs) {
      for (const sub of uninitializedSubs) {
        const createdAt = new Date(sub.created_at)
        const periodEnd = new Date(createdAt)
        periodEnd.setMonth(periodEnd.getMonth() + 1)

        // Om perioden redan har passerat, sätt till nu + 1 månad
        const finalPeriodEnd = periodEnd < now
          ? new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
          : periodEnd

        await supabase
          .from("subscriptions")
          .update({
            current_period_start: createdAt.toISOString(),
            current_period_end: finalPeriodEnd.toISOString(),
            monthly_uploads_used: 0,
          })
          .eq("id", sub.id)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Reset ${resetCount} subscriptions`,
        timestamp: now.toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    )
  } catch (error) {
    console.error("Error resetting monthly uploads:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    )
  }
})
