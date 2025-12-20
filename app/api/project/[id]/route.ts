import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      .select("*, project_files(*)")
      .eq("id", id)
      .eq("user_id", user.id)
      .single()

    if (projectError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // Delete files from storage
    if (project.project_files && project.project_files.length > 0) {
      const filePaths = project.project_files.map((f: { storage_path: string }) => f.storage_path)
      await supabase.storage.from("blueprints").remove(filePaths)
    }

    // Delete analysis results (cascade should handle this, but just in case)
    await supabase.from("analysis_results").delete().eq("project_id", id)

    // Delete project files records
    await supabase.from("project_files").delete().eq("project_id", id)

    // Delete the project
    const { error: deleteError } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)

    if (deleteError) {
      throw deleteError
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("Delete project error:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
