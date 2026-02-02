"use client"

import { Bell, Receipt, ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

interface FloatingActionBarProps {
  onViewOrder: () => void
}

export function FloatingActionBar({ onViewOrder }: FloatingActionBarProps) {
  const order = useAppStore((state) => state.order)
  const callWaiter = useAppStore((state) => state.callWaiter)
  const requestBill = useAppStore((state) => state.requestBill)
  const waiterCalled = useAppStore((state) => state.waiterCalled)
  const billRequested = useAppStore((state) => state.billRequested)

  const totalPrice = order.reduce((sum, item) => {
    const extrasTotal = item.addedExtras.reduce(
      (eSum, e) => eSum + e.price * e.quantity,
      0
    )
    return sum + (item.price + extrasTotal) * item.quantity
  }, 0)

  const totalItems = order.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 safe-area-pb">
      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
        <div className="flex gap-1.5">
          <Button
            variant={waiterCalled ? "default" : "secondary"}
            size="icon"
            className={`h-10 w-10 rounded-full ${waiterCalled ? "bg-primary" : ""}`}
            onClick={callWaiter}
            disabled={waiterCalled}
          >
            {waiterCalled ? (
              <Check className="h-4 w-4" />
            ) : (
              <Bell className="h-4 w-4" />
            )}
            <span className="sr-only">Llamar Mozo</span>
          </Button>
          <Button
            variant={billRequested ? "default" : "secondary"}
            size="icon"
            className={`h-10 w-10 rounded-full ${billRequested ? "bg-primary" : ""}`}
            onClick={requestBill}
            disabled={billRequested}
          >
            {billRequested ? (
              <Check className="h-4 w-4" />
            ) : (
              <Receipt className="h-4 w-4" />
            )}
            <span className="sr-only">Pedir Cuenta</span>
          </Button>
        </div>

        <Button
          size="lg"
          className="h-10 flex-1 max-w-[180px] rounded-full text-sm font-semibold"
          onClick={onViewOrder}
          disabled={totalItems === 0}
        >
          <ShoppingBag className="mr-1.5 h-4 w-4" />
          <span>Ver Pedido</span>
          {totalItems > 0 && (
            <>
              <span className="mx-1.5 text-primary-foreground/60">|</span>
              <span className="text-xs">{formatPrice(totalPrice)}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
