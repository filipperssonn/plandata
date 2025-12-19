import type { AnalysisResult, Room } from "@/types"

const roomTypeLabels: Record<Room["type"], string> = {
  bedroom: "Sovrum",
  kitchen: "Kök",
  bathroom: "Badrum",
  living: "Vardagsrum",
  hallway: "Hall",
  storage: "Förråd",
  other: "Övrigt",
}

export function generateCSV(analysis: AnalysisResult, projectName: string): string {
  const lines: string[] = []

  // Header
  lines.push("Plandata - Analysrapport")
  lines.push("")
  lines.push(`Projekt,${projectName}`)
  lines.push(`Analyserad,${new Date(analysis.created_at).toLocaleDateString("sv-SE")}`)
  lines.push("")

  // Summary
  lines.push("Sammanfattning")
  lines.push(`Total yta,${analysis.total_area_sqm} m²`)
  lines.push(`BTA (Bruttoarea),${analysis.bta_sqm} m²`)
  lines.push(`BOA (Boarea),${analysis.boa_sqm} m²`)
  lines.push(`Vägglängd,${analysis.wall_length_m} m`)
  lines.push(`Fönster,${analysis.windows}`)
  lines.push(`Dörrar,${analysis.doors}`)
  lines.push("")

  // Rooms
  lines.push("Rum")
  lines.push("Namn,Typ,Yta (m²)")
  analysis.rooms.forEach((room) => {
    lines.push(`${room.name},${roomTypeLabels[room.type]},${room.area_sqm}`)
  })
  lines.push(`Total,,${analysis.total_area_sqm}`)

  return lines.join("\n")
}
