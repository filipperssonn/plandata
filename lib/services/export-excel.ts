import * as XLSX from "xlsx"
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

export function generateExcel(
  analysis: AnalysisResult,
  projectName: string
): ArrayBuffer {
  const workbook = XLSX.utils.book_new()

  // Get door types from raw_data
  const rawData = analysis.raw_data || {}
  const doorsInner = (rawData.doors_inner as number) || 0
  const doorsBalcony = (rawData.doors_balcony as number) || 0
  const doorsExterior = (rawData.doors_exterior as number) || 0
  const roomSummary = calculateRoomSummary(analysis.rooms, rawData)

  // Summary sheet
  const summaryData = [
    ["Plandata - Analysrapport"],
    [""],
    ["Projekt", projectName],
    ["Analyserad", new Date(analysis.created_at).toLocaleDateString("sv-SE")],
    [""],
    ["Bostad"],
    ["Bostadstyp", roomSummary],
    ["BOA (Boarea)", analysis.boa_sqm ? `${analysis.boa_sqm} m²` : "-"],
    ["Total yta", analysis.total_area_sqm ? `${analysis.total_area_sqm} m²` : "-"],
    ["Vägglängd", analysis.wall_length_m ? `${analysis.wall_length_m} m` : "-"],
    [""],
    ["Öppningar"],
    ["Fönster", analysis.windows],
    [""],
    ["Dörrar"],
    ["Innerdörrar", doorsInner],
    ["Balkongdörr", doorsBalcony],
    ["Ytterdörr", doorsExterior],
    ["Totalt dörrar", analysis.doors],
  ]
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Sammanfattning")

  // Rooms sheet
  const roomsData = [
    ["Rum", "Typ", "Yta (m²)"],
    ...analysis.rooms.map((room) => [
      room.name,
      roomTypeLabels[room.type],
      room.area_sqm,
    ]),
    ["", "", ""],
    ["Total", "", analysis.total_area_sqm],
  ]
  const roomsSheet = XLSX.utils.aoa_to_sheet(roomsData)
  XLSX.utils.book_append_sheet(workbook, roomsSheet, "Rum")

  // Generate array buffer
  const buffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" }) as number[]
  return new Uint8Array(buffer).buffer
}
