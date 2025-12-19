import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Översikt över dina projekt och analyser",
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Välkommen till din projektöversikt
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dina projekt</CardTitle>
            <CardDescription>
              Här visas alla dina analyserade ritningar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="py-12 text-center text-muted-foreground">
              <p className="text-lg mb-2">Inga projekt ännu</p>
              <p className="text-sm">
                Dashboard-funktionalitet kommer snart. Detta är en placeholder-sida.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
