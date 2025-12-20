"use client"

import { User, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut } from "@/app/actions/auth"
import type { Profile, Subscription } from "@/types"

interface UserNavProps {
  profile: Profile
  subscription: Subscription
}

export function UserNav({ profile, subscription }: UserNavProps) {
  const planLabels = {
    free: "Gratis",
    pro: "Pro",
    business: "Business",
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:block text-right">
        <p className="text-sm font-medium text-slate-900 dark:text-white">
          {profile.full_name || profile.email}
        </p>
        <p className="text-xs text-muted-foreground">
          {planLabels[subscription.plan_id]} • {subscription.monthly_uploads_used}/{subscription.monthly_uploads_limit} uploads
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/settings"
          className="inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Inställningar</span>
        </Link>

        <form action={signOut}>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logga ut</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
