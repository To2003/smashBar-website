"use client"

import { Bell, Receipt, Sparkles, Users, UtensilsCrossed } from "lucide-react"
import type { Table, TableStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

interface TableCardProps {
  table: Table
  onClick: () => void
}

const statusConfig: Record<
  TableStatus,
  { label: string; bgColor: string; textColor: string; icon: typeof Users }
> = {
  available: {
    label: "Libre",
    bgColor: "bg-success/20 border-success/50",
    textColor: "text-success",
    icon: Sparkles,
  },
  occupied: {
    label: "Ocupada",
    bgColor: "bg-destructive/20 border-destructive/50",
    textColor: "text-destructive",
    icon: UtensilsCrossed,
  },
  calling: {
    label: "Llamando",
    bgColor: "bg-warning/20 border-warning/50 animate-pulse",
    textColor: "text-warning",
    icon: Bell,
  },
  bill: {
    label: "Cuenta",
    bgColor: "bg-warning/20 border-warning/50",
    textColor: "text-warning",
    icon: Receipt,
  },
  dirty: {
    label: "Sucia",
    bgColor: "bg-info/20 border-info/50",
    textColor: "text-info",
    icon: Sparkles,
  },
}

export function TableCard({ table, onClick }: TableCardProps) {
  const config = statusConfig[table.status]
  const Icon = config.icon

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
  }

  const totalPrice = table.order.reduce((sum, item) => {
    const extrasTotal = item.addedExtras.reduce(
      (eSum, e) => eSum + e.price * e.quantity,
      0
    )
    return sum + (item.price + extrasTotal) * item.quantity
  }, 0)

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl border-2 p-3 transition-all hover:scale-105 active:scale-95",
        config.bgColor
      )}
    >
      <div className="absolute top-1.5 right-1.5">
        <Icon className={cn("h-3.5 w-3.5", config.textColor)} />
      </div>
      <span className="text-2xl font-bold text-foreground">{table.id}</span>
      <span className={cn("mt-0.5 text-[10px] font-medium uppercase", config.textColor)}>
        {config.label}
      </span>
      {table.guests && (
        <div className="mt-1 flex items-center gap-0.5 text-[10px] text-muted-foreground">
          <Users className="h-3 w-3" />
          {table.guests}
        </div>
      )}
      {totalPrice > 0 && (
        <span className="mt-1 text-xs font-semibold text-primary">
          {formatPrice(totalPrice)}
        </span>
      )}
    </button>
  )
}
