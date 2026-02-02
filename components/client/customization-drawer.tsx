"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
// Eliminamos la dependencia de MenuItem de lib/data para usar una interfaz local flexible
import { useAppStore } from "@/lib/store"

// Definimos la estructura que esperamos recibir desde Google Sheets
interface SheetItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  extras: string[] // Array de nombres, ej: ["Panceta", "Huevo"]
  ingredients?: string[]
}

interface CustomizationDrawerProps {
  item: SheetItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  // Nueva prop: Necesitamos recibir la lista completa de extras con precios
  globalExtras?: any[] 
}

export function CustomizationDrawer({
  item,
  open,
  onOpenChange,
  globalExtras = []
}: CustomizationDrawerProps) {
  const addToOrder = useAppStore((state) => state.addToOrder)
  const [quantity, setQuantity] = useState(1)
  const [ingredientsList, setIngredientsList] = useState<string[]>([])
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([])
  
  // Estado local para los extras con su precio y cantidad
  const [localExtras, setLocalExtras] = useState<
    { name: string; price: number; quantity: number }[]
  >([])

  useEffect(() => {
    if (open && item) {
      setQuantity(1)
      setRemovedIngredients([])
      
      // 1. Generar lista de ingredientes removibles desde la descripción
      // Ej: "Carne, cheddar, huevo" -> ["Carne", "cheddar", "huevo"]
      if (item.description) {
        const ingredients = item.description
          .split(',')
          .map(i => i.trim().replace('.', '')) // Limpiamos espacios y puntos
          .filter(i => i.length > 2) // Ignoramos textos muy cortos
        setIngredientsList(ingredients)
      } else {
        setIngredientsList([])
      }

      // 2. Mapear los extras permitidos (strings) con sus precios reales (desde globalExtras)
      const mappedExtras = (item.extras || []).map((extraName) => {
        // Buscamos el precio en la lista global de extras (Hoja 'Extras')
        // Hacemos una búsqueda flexible (includes) para encontrar "Panceta" en "Extra Panceta"
        const foundExtra = globalExtras.find((ge: any) => 
          ge.nombre && (
            ge.nombre.toLowerCase().includes(extraName.toLowerCase()) || 
            extraName.toLowerCase().includes(ge.nombre.toLowerCase())
          )
        )

        return {
          name: extraName, // Usamos el nombre que viene con la hamburguesa
          price: foundExtra ? Number(foundExtra.precio) : 0, // Usamos el precio de la hoja Extras
          quantity: 0
        }
      })

      setLocalExtras(mappedExtras)
    }
  }, [open, item, globalExtras])

  if (!item) return null

  const toggleIngredient = (ingredient: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  const updateExtraQuantity = (name: string, delta: number) => {
    setLocalExtras((prev) =>
      prev.map((e) =>
        e.name === name
          ? { ...e, quantity: Math.max(0, Math.min(5, e.quantity + delta)) }
          : e
      )
    )
  }

  const basePrice = item.price
  const extrasTotal = localExtras.reduce((sum, e) => sum + e.price * e.quantity, 0)
  const totalPrice = (basePrice + extrasTotal) * quantity

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 })
  }

  const handleAddToOrder = () => {
    const orderItem = {
      ...item,
      quantity,
      removedIngredients,
      addedExtras: localExtras.filter((e) => e.quantity > 0),
    }
    // @ts-ignore - Ignoramos error de tipos estricto temporalmente para conectar rápido
    addToOrder(orderItem)
    onOpenChange(false)
  }

  const hasCustomizations = ingredientsList.length > 0 || localExtras.length > 0

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90dvh] flex flex-col bg-background text-foreground">
        <div className="mx-auto w-full max-w-md flex flex-col flex-1 overflow-hidden">
          
          {/* HEADER con Imagen */}
          <DrawerHeader className="relative p-0 flex-shrink-0">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
            <div className="px-4 pt-2 pb-2">
              <DrawerTitle className="text-xl font-bold leading-tight text-yellow-500">{item.name}</DrawerTitle>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>
          </DrawerHeader>

          {/* CONTENIDO SCROLLABLE */}
          <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0 space-y-6">
            
            {/* Sección: Quitar Ingredientes (Generado desde descripción) */}
            {ingredientsList.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Personalizar Ingredientes
                </h4>
                <div className="space-y-2">
                  {ingredientsList.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm"
                    >
                      <span
                        className={`text-sm font-medium transition-colors ${
                          removedIngredients.includes(ingredient)
                            ? "text-muted-foreground line-through decoration-destructive"
                            : "text-foreground"
                        }`}
                      >
                        {ingredient}
                      </span>
                      <Switch
                        checked={!removedIngredients.includes(ingredient)}
                        onCheckedChange={() => toggleIngredient(ingredient)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sección: Agregar Extras */}
            {localExtras.length > 0 && (
              <div>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Sumar Extras
                </h4>
                <div className="space-y-2">
                  {localExtras.map((extra) => (
                    <div
                      key={extra.name}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-sm font-medium text-foreground block truncate">
                          {extra.name}
                        </span>
                        {extra.price > 0 && (
                          <span className="text-xs text-yellow-500 font-bold">
                            +{formatPrice(extra.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                          onClick={() => updateExtraQuantity(extra.name, -1)}
                          disabled={extra.quantity === 0}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-4 text-center text-sm font-bold">
                          {extra.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary"
                          onClick={() => updateExtraQuantity(extra.name, 1)}
                          disabled={extra.quantity === 5}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!hasCustomizations && (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground opacity-50">
                <p className="text-sm">Este producto no tiene opciones adicionales.</p>
              </div>
            )}
          </div>

          {/* FOOTER con Total y Botón */}
          <DrawerFooter className="border-t border-border bg-background pt-4 pb-6 flex-shrink-0 shadow-[0_-5px_10px_rgba(0,0,0,0.1)] z-10">
            <div className="mb-4 flex items-center justify-between px-2">
              <span className="text-sm font-medium text-muted-foreground">Cantidad</span>
              <div className="flex items-center gap-4 bg-secondary/50 rounded-full px-2 py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-background"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity === 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center text-lg font-bold">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-background"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity === 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full text-base font-bold h-12 bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={handleAddToOrder}
            >
              Agregar • {formatPrice(totalPrice)}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}