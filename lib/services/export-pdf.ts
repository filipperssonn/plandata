import { jsPDF } from "jspdf"
import type { AnalysisResult } from "@/types"

const ROOM_TYPE_LABELS: Record<string, string> = {
  bedroom: "Sovrum",
  kitchen: "Kök",
  bathroom: "Badrum",
  living: "Vardagsrum",
  hallway: "Hall",
  storage: "Förråd",
  other: "Övrigt",
}

// Calculate room summary according to Swedish standard
function calculateRoomSummary(rooms: AnalysisResult['rooms'], rawData: Record<string, unknown>): string {
  if (rawData.room_count_summary && typeof rawData.room_count_summary === 'string') {
    return rawData.room_count_summary
  }

  const roomCount = rooms.filter(r =>
    r.type === 'bedroom' || r.type === 'living'
  ).length
  const hasKitchen = rooms.some(r => r.type === 'kitchen')

  if (hasKitchen) {
    return `${roomCount} rum + kok`
  }
  return `${roomCount} rum`
}

export function generatePDF(
  projectName: string,
  analysis: AnalysisResult
): ArrayBuffer {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  // Get door types from raw_data
  const rawData = analysis.raw_data || {}
  const doorsInner = (rawData.doors_inner as number) || 0
  const doorsBalcony = (rawData.doors_balcony as number) || 0
  const doorsExterior = (rawData.doors_exterior as number) || 0
  const roomSummary = calculateRoomSummary(analysis.rooms, rawData)

  // Title
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("Analysrapport", pageWidth / 2, y, { align: "center" })
  y += 15

  // Project name
  doc.setFontSize(16)
  doc.setFont("helvetica", "normal")
  doc.text(projectName, pageWidth / 2, y, { align: "center" })
  y += 10

  // Date
  doc.setFontSize(10)
  doc.setTextColor(128)
  const dateStr = new Date().toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  doc.text(`Genererad: ${dateStr}`, pageWidth / 2, y, { align: "center" })
  doc.setTextColor(0)
  y += 20

  // Summary section
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Sammanfattning", 20, y)
  y += 10

  doc.setFontSize(11)
  doc.setFont("helvetica", "normal")

  const summaryData = [
    ["Bostadstyp", roomSummary],
    ["BOA (Boarea)", analysis.boa_sqm ? `${analysis.boa_sqm} m²` : "-"],
    ["Total yta", analysis.total_area_sqm ? `${analysis.total_area_sqm} m²` : "-"],
    ["Vägglängd", analysis.wall_length_m ? `${analysis.wall_length_m} m` : "-"],
    ["Antal fönster", String(analysis.windows)],
    ["", ""],
    ["Dörrar", ""],
    ["  Innerdörrar", String(doorsInner)],
    ["  Balkongdörr", String(doorsBalcony)],
    ["  Ytterdörr", String(doorsExterior)],
    ["  Totalt", String(analysis.doors)],
  ]

  summaryData.forEach(([label, value]) => {
    doc.text(label + ":", 20, y)
    doc.text(value, 80, y)
    y += 7
  })

  y += 10

  // Rooms section
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.text("Rumsförteckning", 20, y)
  y += 10

  // Table header
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Rum", 20, y)
  doc.text("Typ", 80, y)
  doc.text("Yta (m²)", 130, y)
  y += 2

  // Header line
  doc.setDrawColor(200)
  doc.line(20, y, 180, y)
  y += 5

  // Table rows
  doc.setFont("helvetica", "normal")
  analysis.rooms.forEach((room) => {
    // Check if we need a new page
    if (y > 270) {
      doc.addPage()
      y = 20
    }

    doc.text(room.name, 20, y)
    doc.text(ROOM_TYPE_LABELS[room.type] || room.type, 80, y)
    doc.text(room.area_sqm.toFixed(1), 130, y)
    y += 7
  })

  // Total row
  y += 3
  doc.line(20, y, 180, y)
  y += 7
  doc.setFont("helvetica", "bold")
  doc.text("Totalt", 20, y)
  const totalArea = analysis.rooms.reduce((sum, room) => sum + room.area_sqm, 0)
  doc.text(totalArea.toFixed(1), 130, y)

  // Footer
  y = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(128)
  doc.text("Genererad av Plandata.se", pageWidth / 2, y, { align: "center" })

  return doc.output("arraybuffer")
}
