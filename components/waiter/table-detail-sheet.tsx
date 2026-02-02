"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  CheckCircle2,
  Minus,
  Plus,
  Receipt,
  Sparkles,
  Users,
  UtensilsCrossed,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { useAppStore } from "@/lib/store"
import type { Table, TableStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

interface TableDetailSheetProps {
  table: Table | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusButtons: {
  status: TableStatus
  label: string
  icon: typeof Users
  color: string
}[] = [
  { status: "available", label: "Libre", icon: Sparkles, color: "bg-success text-success-foreground" },
  { status: "occupied", label: "Ocupada", icon: UtensilsCrossed, color: "bg-destructive text-destructive-foreground" },
  { status: "calling", label: "Llamando", icon: Bell, color: "bg-warning text-warning-foreground" },
  { status: "bill", label: "Cuenta", icon: Receipt, color: "bg-warning text-warning-foreground" },
  { status: "dirty", label: "Sucia", icon: Sparkles, color: "bg-info text-info-foreground" },
]

export function TableDetailSheet({
  table,
  open,
  onOpenChange,
}: TableDetailSheetProps) {
  const updateTableStatus = useAppStore((state) => state.updateTableStatus)
  const resetTable = useAppStore((state) => state.resetTable)
  const [splitCount, setSplitCount] = useState(1)

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
  }

  useEffect(() => {
    if (table?.guests) {
      setSplitCount(table.guests)
    } else {
      setSplitCount(1)
    }
  }, [table])

  if (!table) return null

  const totalPrice = table.order.reduce((sum, item) => {
    const extrasTotal = item.addedExtras.reduce(
      (eSum, e) => eSum + e.price * e.quantity,
      0
    )
    return sum + (item.price + extrasTotal) * item.quantity
  }, 0)

  const pricePerPerson = splitCount > 0 ? totalPrice / splitCount : totalPrice

  const handleStatusChange = (status: TableStatus) => {
    updateTableStatus(table.id, status)
  }

  const handleMarkPaid = () => {
    resetTable(table.id)
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90dvh] flex flex-col">
        <div className="mx-auto w-full max-w-md flex flex-col flex-1 overflow-hidden">
          <DrawerHeader className="border-b border-border py-3 flex-shrink-0">
            <DrawerTitle className="flex items-center justify-between text-lg">
              <span>Mesa #{table.id}</span>
              {table.guests && (
                <div className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-normal">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  {table.guests} personas
                </div>
              )}
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0">
            {/* Status Buttons */}
            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Estado de la Mesa
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {statusButtons.map((btn) => {
                  const Icon = btn.icon
                  const isActive = table.status === btn.status
                  return (
                    <Button
                      key={btn.status}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "gap-1 text-xs h-8 bg-transparent",
                        isActive && btn.color
                      )}
                      onClick={() => handleStatusChange(btn.status)}
                    >
                      <Icon className="h-3 w-3" />
                      {btn.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Current Order */}
            <div className="mb-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Pedido Actual
              </h4>
              {table.order.length === 0 ? (
                <div className="rounded-lg bg-secondary/30 p-4 text-center">
                  <UtensilsCrossed className="mx-auto mb-2 h-6 w-6 text-muted-foreground/30" />
                  <p className="text-xs text-muted-foreground">Sin pedidos todavia</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {table.order.map((item, index) => {
                    const extrasTotal = item.addedExtras.reduce(
                      (eSum, e) => eSum + e.price * e.quantity,
                      0
                    )
                    const itemTotal = (item.price + extrasTotal) * item.quantity

                    return (
                      <div
                        key={`${item.id}-${index}`}
                        className="flex items-start justify-between rounded-lg bg-secondary/30 p-2.5"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground text-sm">
                              {item.quantity}x
                            </span>
                            <span className="text-foreground text-sm truncate">{item.name}</span>
                          </div>
                          {item.removedIngredients.length > 0 && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              <span className="text-destructive">Sin:</span>{" "}
                              {item.removedIngredients.join(", ")}
                            </p>
                          )}
                          {item.addedExtras.length > 0 && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              <span className="text-primary">+</span>{" "}
                              {item.addedExtras
                                .map(
                                  (e) =>
                                    `${e.name}${e.quantity > 1 ? ` x${e.quantity}` : ""}`
                                )
                                .join(", ")}
                            </p>
                          )}
                        </div>
                        <span className="font-semibold text-primary text-sm flex-shrink-0">
                          {formatPrice(itemTotal)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Split Bill Section */}
            {totalPrice > 0 && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-3">
                <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <Receipt className="h-3.5 w-3.5" />
                  Dividir Cuenta
                </h4>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Cantidad de Personas
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full bg-transparent"
                      onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                      disabled={splitCount <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      min={1}
                      value={splitCount}
                      onChange={(e) =>
                        setSplitCount(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="h-7 w-12 text-center text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full bg-transparent"
                      onClick={() => setSplitCount(splitCount + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-background/50 p-2.5">
                  <span className="text-xs text-muted-foreground">
                    Total por Persona
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(pricePerPerson)}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="font-medium text-foreground text-sm">Total</span>
                  <span className="text-xl font-bold text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <DrawerFooter className="border-t border-border gap-2 pt-3 pb-4 flex-shrink-0">
            {totalPrice > 0 && (
              <Button
                size="lg"
                className="w-full bg-success text-success-foreground hover:bg-success/90 h-11"
                onClick={handleMarkPaid}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Marcar Pagado y Liberar Mesa
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline" size="lg" className="w-full bg-transparent h-10">
                Cerrar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
