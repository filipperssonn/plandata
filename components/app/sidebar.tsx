"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Settings, Plus } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Nytt projekt", href: "/new-project", icon: Plus },
  { name: "Inställningar", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:fixed lg:inset-y-0 lg:left-[calc(50%-37rem)] lg:pt-20 lg:px-4">
      <div className="flex flex-col flex-1 min-h-0 pt-6">
        <div className="px-3 mb-4">
          <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Navigation
          </h2>
        </div>
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-700/20 dark:hover:text-primary-100 hover:shadow-md"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-white" : "text-slate-500 dark:text-slate-400"
                )} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
