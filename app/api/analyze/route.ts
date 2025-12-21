import { createClient } from "@/lib/supabase/server"
import { analyzeBlueprint } from "@/lib/services/ai-analysis"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { projectId, scale } = await request.json()

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

    // Kontrollera upload-gräns FÖRE analys
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("monthly_uploads_used, monthly_uploads_limit")
      .eq("user_id", user.id)
      .single()

    if (subscription && subscription.monthly_uploads_used >= subscription.monthly_uploads_limit) {
      return NextResponse.json(
        { error: "Du har nått din månadsgräns för analyser. Uppgradera din plan för fler." },
        { status: 429 }
      )
    }

    const { data: project } = await supabase
      .from("projects")
      .select("*, project_files(*)")
      .eq("id", projectId)
      .eq("user_id", user.id)
      .single()

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Get the first file (blueprint)
    const projectFile = project.project_files?.[0]
    if (!projectFile) {
      return NextResponse.json(
        { error: "No file found for this project" },
        { status: 400 }
      )
    }

    // Update project status to processing
    await supabase
      .from("projects")
      .update({ status: "processing" })
      .eq("id", projectId)

    // Download the file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from("blueprints")
      .download(projectFile.storage_path)

    if (downloadError || !fileData) {
      await supabase
        .from("projects")
        .update({ status: "failed" })
        .eq("id", projectId)
      return NextResponse.json(
        { error: "Could not download file" },
        { status: 500 }
      )
    }

    // Convert blob to buffer
    const arrayBuffer = await fileData.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    // Determine MIME type
    const mimeType = projectFile.file_type || "application/pdf"

    // Analyze the blueprint using Gemini AI
    const analysis = await analyzeBlueprint({
      fileBuffer,
      mimeType,
      scale
    })

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
