"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"
import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NAV_ITEMS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { signOut } from "@/app/actions/auth"
import type { User } from "@supabase/supabase-js"
import type { Profile, Subscription } from "@/types"

interface HeaderClientProps {
  user: User | null
  profile: Profile | null
  subscription: Subscription | null
}

export function HeaderClient({ user, profile, subscription }: HeaderClientProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const planLabels: Record<string, string> = {
    free: "Gratis",
    pro: "Pro",
    business: "Business",
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false)
    // Om vi är på hemsidan och det är en anchor-länk, scrolla smooth
    if (isHomePage && href.startsWith("/#")) {
      e.preventDefault()
      const element = document.querySelector(href.substring(1))
      element?.scrollIntoView({ behavior: "smooth" })
    }
    // Annars låt länken navigera normalt (till /#features etc)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 transition-all duration-200",
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60"
          : "bg-white dark:bg-slate-900"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo - alltid till hemsidan */}
        <Logo variant="full" href="/" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium text-slate-600 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="gap-2 dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {profile?.full_name || profile?.email || user.email}
                </p>
                {subscription && (
                  <p className="text-xs text-muted-foreground">
                    {planLabels[subscription.plan_id] || "Gratis"} • {subscription.monthly_uploads_used}/{subscription.monthly_uploads_limit} uploads
                  </p>
                )}
              </div>

              <form action={signOut}>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Logga ut</span>
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="dark:text-slate-200 dark:hover:text-white dark:hover:bg-slate-800">
                  Logga in
                </Button>
              </Link>
              <Link href="/register">
                <Button>Kom igång gratis</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle asChild>
                  <div>
                    <Logo variant="full" href={null} />
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-lg font-medium text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors"
                  >
                    {item.label}
                  </a>
                ))}

                <div className="mt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      {profile && (
                        <div className="py-2 px-1 mb-2 border-b border-slate-200 dark:border-slate-700">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                            {profile.full_name || profile.email}
                          </p>
                          {subscription && (
                            <p className="text-xs text-muted-foreground">
                              {planLabels[subscription.plan_id] || "Gratis"} • {subscription.monthly_uploads_used}/{subscription.monthly_uploads_limit} uploads
                            </p>
                          )}
                        </div>
                      )}
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <form action={signOut}>
                        <Button variant="ghost" className="w-full gap-2">
                          <LogOut className="h-4 w-4" />
                          Logga ut
                        </Button>
                      </form>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Logga in
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Kom igång gratis</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
