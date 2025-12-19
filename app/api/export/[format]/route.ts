import { createClient } from "@/lib/supabase/server"
import { generateExcel } from "@/lib/services/export-excel"
import { generateCSV } from "@/lib/services/export-csv"
import { NextResponse } from "next/server"
import type { AnalysisResult, Project } from "@/types"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ format: string }> }
) {
  try {
    const { format } = await params
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    if (!["excel", "csv"].includes(format)) {
      return NextResponse.json(
        { error: "Invalid format. Use 'excel' or 'csv'" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Verify user owns the project
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: project } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const { data: analysis } = await supabase
      .from("analysis_results")
      .select("*")
      .eq("project_id", projectId)
      .single()

    if (!analysis) {
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 }
      )
    }

    const typedProject = project as Project
    const typedAnalysis = analysis as AnalysisResult

    if (format === "excel") {
      const arrayBuffer = generateExcel(typedAnalysis, typedProject.name)
      return new Response(arrayBuffer, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": `attachment; filename="${typedProject.name.replace(/\s+/g, "_")}_analys.xlsx"`,
        },
      })
    }

    if (format === "csv") {
      const csv = generateCSV(typedAnalysis, typedProject.name)
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="${typedProject.name.replace(/\s+/g, "_")}_analys.csv"`,
        },
      })
    }

    return NextResponse.json({ error: "Unknown format" }, { status: 400 })
  } catch (error: any) {
    console.error("Export error:", error)
    return NextResponse.json(
      { error: error.message || "Export failed" },
      { status: 500 }
    )
  }
}
