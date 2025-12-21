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

// Calculate room summary according to Swedish standard
function calculateRoomSummary(rooms: Room[], rawData: Record<string, unknown>): string {
  if (rawData.room_count_summary && typeof rawData.room_count_summary === 'string') {
    return rawData.room_count_summary
  }

  const roomCount = rooms.filter(r =>
    r.type === 'bedroom' || r.type === 'living'
  ).length
  const hasKitchen = rooms.some(r => r.type === 'kitchen')

  if (hasKitchen) {
    return `${roomCount} rum + kök`
  }
  return `${roomCount} rum`
}

// Generate CSV for rooms data only (suitable for Excel import)
export function generateRoomsCSV(analysis: AnalysisResult, projectName: string): string {
  const lines: string[] = []

  // CSV Header
  lines.push("Projekt,Namn,Typ,Yta_m2")

  // Room data
  analysis.rooms.forEach((room) => {
    lines.push(`${projectName},${room.name},${roomTypeLabels[room.type]},${room.area_sqm}`)
  })

  return lines.join("\n")
}

// Generate comprehensive CSV with all analysis data
export function generateAnalysisCSV(analysis: AnalysisResult, projectName: string): string {
  const lines: string[] = []
  const rawData = analysis.raw_data || {}
  const roomSummary = calculateRoomSummary(analysis.rooms, rawData)

  // Project info
  lines.push("Projekt,Datum")
  lines.push(`${projectName},${new Date(analysis.created_at).toISOString().split('T')[0]}`)

  // Summary data
  lines.push("")
  lines.push("Kategori,Värde,Enhet")
  lines.push(`Bostadstyp,${roomSummary},`)
  if (analysis.boa_sqm) lines.push(`BOA,${analysis.boa_sqm},m²`)
  lines.push(`Total yta,${analysis.total_area_sqm},m²`)
  if (analysis.wall_length_m) lines.push(`Vägglängd,${analysis.wall_length_m},m`)
  lines.push(`Fönster,${analysis.windows},st`)
  lines.push(`Dörrar totalt,${analysis.doors},st`)

  // Door types from raw_data (if available)
  if (rawData.doors_inner || rawData.doors_balcony || rawData.doors_exterior) {
    lines.push("")
    lines.push("Dörrtyp,Antal")
    if (rawData.doors_inner) lines.push(`Innerdörrar,${rawData.doors_inner}`)
    if (rawData.doors_balcony) lines.push(`Balkongdörr,${rawData.doors_balcony}`)
    if (rawData.doors_exterior) lines.push(`Ytterdörr,${rawData.doors_exterior}`)
  }

  // Rooms
  lines.push("")
  lines.push("Rumstyp,Namn,Yta_m2")
  analysis.rooms.forEach((room) => {
    lines.push(`${roomTypeLabels[room.type]},${room.name},${room.area_sqm}`)
  })

  return lines.join("\n")
}

// Legacy function for backward compatibility
export function generateCSV(analysis: AnalysisResult, projectName: string): string {
  // Return the rooms-only CSV as the main export format
  return generateRoomsCSV(analysis, projectName)
}
