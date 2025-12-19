import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, Plus, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react"
import type { Project } from "@/types"

interface ProjectListProps {
  projects: Project[]
}

const statusConfig = {
  pending: { label: "Väntar", icon: Clock, variant: "secondary" as const },
  processing: { label: "Analyserar", icon: Loader2, variant: "default" as const },
  completed: { label: "Klar", icon: CheckCircle, variant: "default" as const },
  failed: { label: "Misslyckades", icon: XCircle, variant: "destructive" as const },
}

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Inga projekt ännu
            </h3>
            <p className="text-muted-foreground mb-6">
              Ladda upp din första ritning för att komma igång
            </p>
            <Link href="/new-project">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nytt projekt
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Dina projekt</CardTitle>
        <Link href="/new-project">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nytt projekt
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {projects.map((project) => {
            const status = statusConfig[project.status]
            const StatusIcon = status.icon

            return (
              <Link
                key={project.id}
                href={`/project/${project.id}`}
                className="block py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-6 px-6 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      <FolderOpen className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {project.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(project.created_at).toLocaleDateString("sv-SE", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge variant={status.variant} className="flex items-center gap-1">
                    <StatusIcon className={`h-3 w-3 ${project.status === "processing" ? "animate-spin" : ""}`} />
                    {status.label}
                  </Badge>
                </div>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
