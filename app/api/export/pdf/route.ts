import { createClient } from "@/lib/supabase/server"
import { generatePDF } from "@/lib/services/export-pdf"
import { NextResponse } from "next/server"
import type { AnalysisResult } from "@/types"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get("projectId")

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user owns the project
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("name")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Get analysis results
    const { data: analysis, error: analysisError } = await supabase
      .from("analysis_results")
      .select("*")
      .eq("project_id", projectId)
      .single()

    if (analysisError || !analysis) {
      return NextResponse.json(
        { error: "Analysis not found" },
        { status: 404 }
      )
    }

    // Generate PDF
    const pdfBuffer = generatePDF(project.name, analysis as AnalysisResult)

    // Create filename
    const safeProjectName = project.name
      .replace(/[^a-zA-Z0-9åäöÅÄÖ\s-]/g, "")
      .replace(/\s+/g, "_")
    const filename = `${safeProjectName}_analys.pdf`

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error: unknown) {
    console.error("PDF export error:", error)
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    )
  }
}
