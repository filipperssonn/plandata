import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnalysisDisplay } from "@/components/app/analysis-display"
import { ExportButtons } from "@/components/app/export-buttons"
import { ArrowLeft, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { Project, AnalysisResult } from "@/types"

export const metadata: Metadata = {
  title: "Projekt",
  description: "Projektdetaljer och analysresultat",
}

const statusConfig = {
  pending: { label: "Väntar", icon: Clock, variant: "secondary" as const },
  processing: { label: "Analyserar", icon: Loader2, variant: "default" as const },
  completed: { label: "Klar", icon: CheckCircle, variant: "default" as const },
  failed: { label: "Misslyckades", icon: XCircle, variant: "destructive" as const },
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!project) {
    notFound()
  }

  const { data: analysisResults } = await supabase
    .from("analysis_results")
    .select("*")
    .eq("project_id", id)
    .single()

  const typedProject = project as Project
  const status = statusConfig[typedProject.status]
  const StatusIcon = status.icon

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Tillbaka till dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {typedProject.name}
            </h1>
            <Badge variant={status.variant} className="flex items-center gap-1">
              <StatusIcon
                className={`h-3 w-3 ${typedProject.status === "processing" ? "animate-spin" : ""}`}
              />
              {status.label}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Skapad{" "}
            {new Date(typedProject.created_at).toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {typedProject.status === "completed" && analysisResults && (
          <ExportButtons projectId={id} projectName={typedProject.name} />
        )}
      </div>

      {/* Content based on status */}
      {typedProject.status === "pending" && (
        <Card>
          <CardContent className="py-12 text-center">
            <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Väntar på analys</h3>
            <p className="text-muted-foreground">
              Din ritning väntar på att analyseras. Detta tar normalt under en minut.
            </p>
          </CardContent>
        </Card>
      )}

      {typedProject.status === "processing" && (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-12 w-12 mx-auto text-primary mb-4 animate-spin" />
            <h3 className="text-lg font-medium mb-2">Analyserar ritning...</h3>
            <p className="text-muted-foreground">
              AI:n identifierar rum, fönster, dörrar och beräknar ytor. Snart klar!
            </p>
          </CardContent>
        </Card>
      )}

      {typedProject.status === "failed" && (
        <Card>
          <CardContent className="py-12 text-center">
            <XCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Analysen misslyckades</h3>
            <p className="text-muted-foreground mb-4">
              Något gick fel vid analysen. Kontrollera att ritningen är tydlig och i rätt format.
            </p>
            <Link href="/new-project">
              <Button>Försök igen med ny fil</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {typedProject.status === "completed" && analysisResults && (
        <AnalysisDisplay analysis={analysisResults as AnalysisResult} />
      )}
    </div>
  )
}
