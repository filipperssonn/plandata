import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/app/sidebar"
import { PageTransition } from "@/components/app/page-transition"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    // Om autentisering misslyckas eller användare saknas, redirecta till login
    if (authError || !user) {
      redirect("/login")
    }

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <main className="pt-16">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 lg:pl-60">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
      </div>
    )
  } catch (error) {
    // Om något går fel, redirecta till login
    console.error("Error in AppLayout:", error)
    redirect("/login")
  }
}
