"use client"

import React from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "@/lib/data"
import { useAppStore } from "@/lib/store"

interface ProductCardProps {
  item: MenuItem
  onSelect: (item: MenuItem) => void
}

export function ProductCard({ item, onSelect }: ProductCardProps) {
  const order = useAppStore((state) => state.order)
  const decrementItemQuantity = useAppStore((state) => state.decrementItemQuantity)

  const quantityInCart = order
    .filter((o) => o.id === item.id)
    .reduce((sum, o) => sum + o.quantity, 0)

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
  }

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(item)
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const orderItem = order.find((o) => o.id === item.id)
    if (orderItem) {
      decrementItemQuantity(item.id)
    }
  }

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all active:scale-[0.98]"
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-2.5">
        <div>
          <h3 className="font-semibold text-foreground leading-tight text-sm line-clamp-1">
            {item.name}
          </h3>
          <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          {item.servings && (
            <span className="mt-1 inline-block text-[10px] font-medium text-primary/90 bg-primary/10 px-1.5 py-0.5 rounded">
              {item.servings}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            {formatPrice(item.price)}
          </span>

          {quantityInCart > 0 ? (
            <div className="flex items-center gap-0.5">
              <Button
                size="sm"
                variant="outline"
                className="h-7 w-7 rounded-full p-0 bg-transparent"
                onClick={handleDecrement}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Quitar {item.name}</span>
              </Button>
              <span className="w-5 text-center font-bold text-sm">
                {quantityInCart}
              </span>
              <Button
                size="sm"
                className="h-7 w-7 rounded-full p-0"
                onClick={handleAdd}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Agregar {item.name}</span>
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              className="h-7 w-7 rounded-full p-0"
              onClick={handleAdd}
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only">Agregar {item.name}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
