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

export function generateExcel(
  analysis: AnalysisResult,
  projectName: string
): ArrayBuffer {
  const workbook = XLSX.utils.book_new()

  // Summary sheet
  const summaryData = [
    ["Plandata - Analysrapport"],
    [""],
    ["Projekt", projectName],
    ["Analyserad", new Date(analysis.created_at).toLocaleDateString("sv-SE")],
    [""],
    ["Sammanfattning"],
    ["Total yta", `${analysis.total_area_sqm} m²`],
    ["BTA (Bruttoarea)", `${analysis.bta_sqm} m²`],
    ["BOA (Boarea)", `${analysis.boa_sqm} m²`],
    ["Vägglängd", `${analysis.wall_length_m} m`],
    [""],
    ["Öppningar"],
    ["Fönster", analysis.windows],
    ["Dörrar", analysis.doors],
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
