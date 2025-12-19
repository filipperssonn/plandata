import { createClient } from "@/lib/supabase/server"
import { generateMockAnalysis } from "@/lib/services/mock-analysis"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json()

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
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

    // Update project status to processing
    await supabase
      .from("projects")
      .update({ status: "processing" })
      .eq("id", projectId)

    // Simulate processing delay (1-2 seconds)
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 1000)
    )

    // Generate mock analysis
    const analysis = generateMockAnalysis()

    // Save analysis results
    const { error: analysisError } = await supabase
      .from("analysis_results")
      .insert({
        project_id: projectId,
        rooms: analysis.rooms,
        windows: analysis.windows,
        doors: analysis.doors,
        total_area_sqm: analysis.total_area_sqm,
        bta_sqm: analysis.bta_sqm,
        boa_sqm: analysis.boa_sqm,
        wall_length_m: analysis.wall_length_m,
        raw_data: analysis,
      })

    if (analysisError) {
      // Update project status to failed
      await supabase
        .from("projects")
        .update({ status: "failed" })
        .eq("id", projectId)

      throw analysisError
    }

    // Update project status to completed
    await supabase
      .from("projects")
      .update({ status: "completed" })
      .eq("id", projectId)

    // Increment uploads used
    await supabase.rpc("increment_uploads_used", { user_id_param: user.id })

    return NextResponse.json({ success: true, analysis })
  } catch (error: any) {
    console.error("Analysis error:", error)
    return NextResponse.json(
      { error: error.message || "Analysis failed" },
      { status: 500 }
    )
  }
}
