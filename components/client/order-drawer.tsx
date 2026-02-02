"use client"

import { ShoppingBag, Trash2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useAppStore } from "@/lib/store"
import { toast } from "sonner" // Asumo que usas sonner o toast, si no, usa alert()

interface OrderDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function OrderDrawer({ open, onOpenChange }: OrderDrawerProps) {
  const order = useAppStore((state) => state.order)
  const removeFromOrder = useAppStore((state) => state.removeFromOrder)
  const clearOrder = useAppStore((state) => state.clearOrder)
  const tableNumber = useAppStore((state) => state.tableNumber)

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
  }

  const totalPrice = order.reduce((sum, item) => {
    const extrasTotal = item.addedExtras.reduce(
      (eSum, e) => eSum + e.price * e.quantity,
      0
    )
    return sum + (item.price + extrasTotal) * item.quantity
  }, 0)

  const handleCheckout = () => {
    // 1. Crear mensaje para WhatsApp (Método MVP rápido)
    let message = `*NUEVO PEDIDO - MESA ${tableNumber}*\n\n`
    
    order.forEach(item => {
      message += `• ${item.quantity}x ${item.name}`
      // Ingredientes quitados
      if (item.removedIngredients.length > 0) {
         message += ` (Sin: ${item.removedIngredients.join(', ')})`
      }
      // Extras agregados
      if (item.addedExtras.length > 0) {
        const extrasStr = item.addedExtras.map(e => `${e.quantity}x ${e.name}`).join(', ')
        message += `\n  + Extras: ${extrasStr}`
      }
      message += `\n`
    })

    message += `\n*TOTAL: ${formatPrice(totalPrice)}*`

    // 2. Codificar URL
    // REEMPLAZA ESTE NÚMERO CON EL DEL DUEÑO/COCINA REAL
    const phoneNumber = "5491112345678" 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // 3. Abrir WhatsApp
    window.open(whatsappUrl, '_blank')

    // 4. Limpiar pedido y cerrar drawer
    clearOrder()
    onOpenChange(false)
    
    // Si tienes notificaciones configuradas:
    // toast.success("Pedido enviado a cocina") 
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90dvh] flex flex-col bg-background text-foreground">
        <div className="mx-auto w-full max-w-md flex flex-col flex-1 overflow-hidden">
          
          <DrawerHeader className="border-b border-border py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-2 text-xl font-bold">
                <ShoppingBag className="h-5 w-5 text-yellow-500" />
                Tu Pedido
              </DrawerTitle>
              {order.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 text-xs font-medium"
                  onClick={clearOrder}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  Vaciar
                </Button>
              )}
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
            {order.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center opacity-60">
                <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
                <p className="text-lg font-medium text-muted-foreground">
                  Tu pedido está vacío
                </p>
                <p className="mt-1 text-sm text-muted-foreground/70">
                  ¡Elige unas burgers para arrancar!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {order.map((item) => {
                  const extrasTotal = item.addedExtras.reduce(
                    (eSum, e) => eSum + e.price * e.quantity,
                    0
                  )
                  const itemTotal = (item.price + extrasTotal) * item.quantity

                  return (
                    <div
                      key={item.cartItemId} // Usamos el ID único del carrito
                      className="flex gap-3 rounded-xl bg-secondary/20 border border-border/50 p-4 shadow-sm"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-bold text-foreground text-base leading-tight">
                              <span className="text-yellow-500 mr-2">{item.quantity}x</span> 
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatPrice(item.price)} base
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0 -mr-2 -mt-2"
                            onClick={() => removeFromOrder(item.cartItemId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Ingredientes removidos */}
                        {item.removedIngredients.length > 0 && (
                          <div className="mt-2 text-xs text-muted-foreground bg-destructive/10 px-2 py-1 rounded inline-block">
                            <span className="text-destructive font-bold">SIN:</span>{" "}
                            {item.removedIngredients.join(", ")}
                          </div>
                        )}

                        {/* Extras agregados */}
                        {item.addedExtras.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {item.addedExtras.map((e, idx) => (
                              <div key={idx} className="flex justify-between text-xs text-muted-foreground">
                                <span>+ {e.quantity}x {e.name}</span>
                                <span className="font-medium text-primary">
                                  {formatPrice(e.price * e.quantity)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-end">
                          <span className="font-bold text-lg text-foreground">
                            {formatPrice(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <DrawerFooter className="border-t border-border bg-background pt-4 pb-6 flex-shrink-0 z-10 shadow-[0_-5px_10px_rgba(0,0,0,0.1)]">
            <div className="mb-4 flex items-center justify-between px-1">
              <span className="text-base text-muted-foreground">Total a Pagar</span>
              <span className="text-2xl font-black text-yellow-500 tracking-tight">
                {formatPrice(totalPrice)}
              </span>
            </div>
            
            <Button
              size="lg"
              className="w-full text-base font-bold h-12 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20"
              disabled={order.length === 0}
              onClick={handleCheckout}
            >
              <Send className="w-4 h-4 mr-2" /> Confirmar y Enviar
            </Button>
            
            <DrawerClose asChild>
              <Button
                variant="outline"
                size="lg"
                className="w-full bg-transparent border-input h-11 mt-2"
              >
                Seguir Pidiendo
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}