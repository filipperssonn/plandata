import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  DoorOpen,
  Maximize,
  Ruler,
  Square,
  DoorClosed,
} from "lucide-react"
import type { AnalysisResult, Room } from "@/types"

interface AnalysisDisplayProps {
  analysis: AnalysisResult
}

const roomTypeLabels: Record<Room["type"], string> = {
  bedroom: "Sovrum",
  kitchen: "Kök",
  bathroom: "Badrum",
  living: "Vardagsrum",
  hallway: "Hall",
  storage: "Förråd",
  other: "Övrigt",
}

// Extract door types from raw_data
function getDoorTypes(rawData: Record<string, unknown>) {
  return {
    inner: (rawData.doors_inner as number) || 0,
    balcony: (rawData.doors_balcony as number) || 0,
    exterior: (rawData.doors_exterior as number) || 0,
  }
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  const doorTypes = getDoorTypes(analysis.raw_data)

  const stats = [
    {
      label: "Total yta",
      value: `${analysis.total_area_sqm} m²`,
      icon: Maximize,
    },
    {
      label: "BTA",
      value: `${analysis.bta_sqm} m²`,
      icon: Square,
    },
    {
      label: "BOA",
      value: `${analysis.boa_sqm} m²`,
      icon: Square,
    },
    {
      label: "Vägglängd",
      value: `${analysis.wall_length_m} m`,
      icon: Ruler,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <stat.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Openings */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Maximize className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">Fönster</span>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {analysis.windows}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Door Types */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <DoorOpen className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Innerdörrar</span>
                  <p className="text-xs text-muted-foreground">Mellan rum</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {doorTypes.inner}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <DoorClosed className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Balkongdörr</span>
                  <p className="text-xs text-muted-foreground">Till balkong</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {doorTypes.balcony}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <DoorOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Ytterdörr</span>
                  <p className="text-xs text-muted-foreground">Utgång</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {doorTypes.exterior}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Rum ({analysis.rooms.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Rum
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Typ
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Yta
                  </th>
                </tr>
              </thead>
              <tbody>
                {analysis.rooms.map((room, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 dark:border-slate-800 last:border-0"
                  >
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {room.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">
                        {roomTypeLabels[room.type]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-mono text-slate-900 dark:text-white">
                        {room.area_sqm} m²
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <td
                    colSpan={2}
                    className="py-3 px-4 font-medium text-slate-900 dark:text-white"
                  >
                    Total
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white">
                    {analysis.total_area_sqm} m²
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
