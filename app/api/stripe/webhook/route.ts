import { stripe } from "@/lib/stripe/client"
import { STRIPE_PLANS } from "@/lib/stripe/config"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import Stripe from "stripe"

// Lazy initialization of Supabase client for webhook
function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id
        const planId = session.metadata?.plan_id

        if (userId && planId) {
          const plan = STRIPE_PLANS[planId as keyof typeof STRIPE_PLANS]

          await supabase
            .from("subscriptions")
            .update({
              plan_id: planId,
              stripe_subscription_id: session.subscription as string,
              status: "active",
              monthly_uploads_limit: plan.monthlyUploads,
              monthly_uploads_used: 0,
            })
            .eq("user_id", userId)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: userSub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (userSub) {
          const periodStart = subscription.items?.data?.[0]?.created
          const periodEnd = subscription.cancel_at

          await supabase
            .from("subscriptions")
            .update({
              status: subscription.status === "active" ? "active" : "past_due",
              ...(periodStart && {
                current_period_start: new Date(periodStart * 1000).toISOString(),
              }),
              ...(periodEnd && {
                current_period_end: new Date(periodEnd * 1000).toISOString(),
              }),
            })
            .eq("user_id", userSub.user_id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const { data: userSub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (userSub) {
          await supabase
            .from("subscriptions")
            .update({
              plan_id: "free",
              status: "canceled",
              stripe_subscription_id: null,
              monthly_uploads_limit: 2,
            })
            .eq("user_id", userSub.user_id)
        }
        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { data: userSub } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (userSub) {
          await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("user_id", userSub.user_id)
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: error.message || "Webhook failed" },
      { status: 500 }
    )
  }
}
