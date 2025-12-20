import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserNav } from "./user-nav"
import { MobileNav } from "./mobile-nav"
import { Logo } from "@/components/shared/logo"
import type { Profile, Subscription } from "@/types"

interface AppHeaderProps {
  profile: Profile
  subscription: Subscription
}

export function AppHeader({ profile, subscription }: AppHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MobileNav />
          <Logo href="/dashboard" />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserNav profile={profile} subscription={subscription} />
        </div>
      </div>
    </header>
  )
}
