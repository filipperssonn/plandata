import type { Room } from "@/types"

interface MockAnalysisResult {
  rooms: Room[]
  windows: number
  doors: number
  total_area_sqm: number
  bta_sqm: number
  boa_sqm: number
  wall_length_m: number
}

// Swedish room names and realistic areas
const roomTemplates = [
  { name: "Sovrum 1", type: "bedroom" as const, minArea: 10, maxArea: 16 },
  { name: "Sovrum 2", type: "bedroom" as const, minArea: 8, maxArea: 14 },
  { name: "Sovrum 3", type: "bedroom" as const, minArea: 7, maxArea: 12 },
  { name: "Kök", type: "kitchen" as const, minArea: 10, maxArea: 20 },
  { name: "Vardagsrum", type: "living" as const, minArea: 20, maxArea: 40 },
  { name: "Badrum", type: "bathroom" as const, minArea: 4, maxArea: 10 },
  { name: "WC", type: "bathroom" as const, minArea: 2, maxArea: 4 },
  { name: "Hall", type: "hallway" as const, minArea: 5, maxArea: 15 },
  { name: "Klädkammare", type: "storage" as const, minArea: 2, maxArea: 6 },
  { name: "Förråd", type: "storage" as const, minArea: 3, maxArea: 8 },
  { name: "Tvättstuga", type: "other" as const, minArea: 4, maxArea: 8 },
  { name: "Allrum", type: "living" as const, minArea: 15, maxArea: 25 },
]

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

function roundToOneDecimal(num: number): number {
  return Math.round(num * 10) / 10
}

export function generateMockAnalysis(): MockAnalysisResult {
  // Randomly select 4-8 rooms
  const numRooms = Math.floor(randomBetween(4, 9))
  const shuffled = [...roomTemplates].sort(() => Math.random() - 0.5)
  const selectedRooms = shuffled.slice(0, numRooms)

  const rooms: Room[] = selectedRooms.map((template) => ({
    name: template.name,
    type: template.type,
    area_sqm: roundToOneDecimal(randomBetween(template.minArea, template.maxArea)),
  }))

  // Calculate totals
  const totalArea = rooms.reduce((sum, room) => sum + room.area_sqm, 0)

  // BTA is typically 10-20% more than total usable area (includes walls)
  const bta = roundToOneDecimal(totalArea * randomBetween(1.1, 1.2))

  // BOA is typically 5-10% less than total (excludes technical spaces)
  const boa = roundToOneDecimal(totalArea * randomBetween(0.9, 0.95))

  // Estimate wall length based on area (roughly 2-3x the perimeter of a square with same area)
  const estimatedPerimeter = Math.sqrt(totalArea) * 4
  const wallLength = roundToOneDecimal(estimatedPerimeter * randomBetween(1.5, 2.5))

  // Windows and doors based on number of rooms
  const windows = Math.floor(randomBetween(numRooms, numRooms * 2))
  const doors = Math.floor(randomBetween(numRooms, numRooms + 3))

  return {
    rooms,
    windows,
    doors,
    total_area_sqm: roundToOneDecimal(totalArea),
    bta_sqm: bta,
    boa_sqm: boa,
    wall_length_m: wallLength,
  }
}
