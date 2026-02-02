"use client"

import { X, Bell, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

export function NotificationBanner() {
  const waiterCalled = useAppStore((state) => state.waiterCalled)
  const billRequested = useAppStore((state) => state.billRequested)
  const cancelWaiterCall = useAppStore((state) => state.cancelWaiterCall)
  const cancelBillRequest = useAppStore((state) => state.cancelBillRequest)

  if (!waiterCalled && !billRequested) return null

  return (
    <div className="sticky top-14 z-40 flex flex-col gap-2 p-3 pb-0">
      {waiterCalled && (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Mozo llamado</p>
              <p className="text-xs text-muted-foreground">Ya va en camino a tu mesa</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs hover:bg-destructive/10 hover:text-destructive"
            onClick={cancelWaiterCall}
          >
            <X className="mr-1 h-3 w-3" />
            Cancelar
          </Button>
        </div>
      )}

      {billRequested && (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-primary/10 border border-primary/30 px-4 py-3 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20">
              <Receipt className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Cuenta pedida</p>
              <p className="text-xs text-muted-foreground">Tu cuenta esta en camino</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs hover:bg-destructive/10 hover:text-destructive"
            onClick={cancelBillRequest}
          >
            <X className="mr-1 h-3 w-3" />
            Cancelar
          </Button>
        </div>
      )}
    </div>
  )
}
