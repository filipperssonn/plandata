import Link from "next/link"
import { Logo } from "@/components/shared/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      {children}
    </div>
  )
}
