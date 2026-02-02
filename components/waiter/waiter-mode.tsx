"use client"

import { useState } from "react"
import { Bell, Receipt, Sparkles, UtensilsCrossed } from "lucide-react"
import { WaiterHeader } from "./header"
import { TableCard } from "./table-card"
import { TableDetailSheet } from "./table-detail-sheet"
import { useAppStore } from "@/lib/store"
import type { Table } from "@/lib/data"

export function WaiterMode() {
  const tables = useAppStore((state) => state.tables)
  const setSelectedTableId = useAppStore((state) => state.setSelectedTableId)
  const selectedTableId = useAppStore((state) => state.selectedTableId)
  const [sheetOpen, setSheetOpen] = useState(false)

  const selectedTable = tables.find((t) => t.id === selectedTableId) || null

  const handleTableClick = (table: Table) => {
    setSelectedTableId(table.id)
    setSheetOpen(true)
  }

  const statusCounts = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    calling: tables.filter((t) => t.status === "calling").length,
    bill: tables.filter((t) => t.status === "bill").length,
    dirty: tables.filter((t) => t.status === "dirty").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <WaiterHeader />

      {/* Status Summary */}
      <div className="border-b border-border bg-secondary/30">
        <div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide">
          <div className="flex items-center gap-1.5 rounded-full bg-success/20 px-3 py-1.5 text-success">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{statusCounts.available} Libres</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-destructive/20 px-3 py-1.5 text-destructive">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{statusCounts.occupied} Ocupadas</span>
          </div>
          {statusCounts.calling > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-warning/20 px-3 py-1.5 text-warning animate-pulse">
              <Bell className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{statusCounts.calling} Llamando</span>
            </div>
          )}
          {statusCounts.bill > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-warning/20 px-3 py-1.5 text-warning">
              <Receipt className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{statusCounts.bill} Cuenta</span>
            </div>
          )}
          {statusCounts.dirty > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-info/20 px-3 py-1.5 text-info">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">{statusCounts.dirty} Sucias</span>
            </div>
          )}
        </div>
      </div>

      {/* Table Grid */}
      <div className="p-3">
        <h2 className="mb-3 text-sm font-semibold text-foreground">Mesas del Local</h2>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {tables.map((table) => (
            <TableCard
              key={table.id}
              table={table}
              onClick={() => handleTableClick(table)}
            />
          ))}
        </div>
      </div>

      <TableDetailSheet
        table={selectedTable}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  )
}
