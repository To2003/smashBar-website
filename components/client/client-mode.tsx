"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientHeader } from "./header"
import { ProductCard } from "./product-card"
import { CustomizationDrawer } from "./customization-drawer"
import { FloatingActionBar } from "./floating-action-bar"
import { OrderDrawer } from "./order-drawer"
import { NotificationBanner } from "./notification-banner"
import { useMenu } from "@/hooks/useMenu" // Importamos el Hook real
import { Beef, Wine, Coffee, Cookie, UtensilsCrossed, Beer, Sandwich, WheatOff, Soup } from "lucide-react"

// Esta lista define las pestañas del menú.
// IMPORTANTE: Los 'id' deben coincidir EXACTAMENTE con las keys de tu archivo lib/config.ts
const categories = [
  { id: "hamburguesas", label: "Hamburguesas", icon: Beef },
  { id: "paraPicar", label: "Para Picar", icon: UtensilsCrossed },
  { id: "sandwiches", label: "Sandwiches", icon: Sandwich },
  { id: "platos", label: "Platos", icon: Soup }, // Incluye Milanesas y Ensaladas
  { id: "sinTacc", label: "Sin TACC", icon: WheatOff }, // <--- ¡Aquí está la que faltaba!
  { id: "postres", label: "Postres", icon: Cookie },
  { id: "bebidas", label: "Bebidas", icon: Coffee }, // Gaseosas, Agua, etc.
  { id: "cervezas", label: "Birras", icon: Beer },
  { id: "tragos", label: "Tragos", icon: Wine },
  { id: "vinos", label: "Vinos", icon: Wine },
]

export function ClientMode() {
  const { menu, loading, error } = useMenu() // Obtenemos datos reales
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [customizationOpen, setCustomizationOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)

  // Manejo de estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium">Cargando menú...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center text-destructive">
          <p className="text-lg font-bold">Error al cargar</p>
          <p className="text-sm">Por favor, revisa tu conexión o intenta nuevamente.</p>
        </div>
      </div>
    )
  }

  const handleSelectItem = (item: any) => {
    setSelectedItem(item)
    setCustomizationOpen(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <ClientHeader />
      <NotificationBanner />

      <Tabs defaultValue="hamburguesas" className="w-full">
        {/* HEADER DE CATEGORÍAS (Sticky) */}
        <div className="sticky top-14 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-none bg-transparent p-2 px-3 scrollbar-hide">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-transparent bg-secondary px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.label}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {/* CONTENIDO DE PESTAÑAS */}
        {categories.map((category) => {
          // Obtenemos los items de la categoría actual desde el objeto 'menu'
          // Si no hay items (ej: null o undefined), usamos un array vacío
          const categoryItems = menu && menu[category.id] ? menu[category.id] : []

          return (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 gap-2 p-3">
                {categoryItems.length > 0 ? (
                  categoryItems.map((sheetItem: any, index: number) => {
                    // ADAPTADOR DE DATOS:
                    // Transformamos los datos de Google Sheets (nombre, precio, imagen_url)
                    // al formato que espera tu ProductCard (name, price, image, description)
                    const adaptedItem = {
                      id: `${category.id}-${index}`, // Generamos un ID único
                      name: sheetItem.nombre,
                      price: sheetItem.precio,
                      description: sheetItem.descripcion,
                      image: sheetItem.imagen_url || "/placeholder.png", // Imagen por defecto si falta
                      category: category.id,
                      extras: sheetItem.extras_posibles || [] // Pasamos los extras para el drawer
                    }

                    return (
                      <ProductCard
                        key={adaptedItem.id}
                        item={adaptedItem}
                        onSelect={() => handleSelectItem(adaptedItem)}
                      />
                    )
                  })
                ) : (
                  <div className="col-span-2 py-10 text-center text-muted-foreground">
                    <p>No hay productos disponibles en esta sección.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      {/* DRAWER DE PERSONALIZACIÓN */}
      <CustomizationDrawer
        item={selectedItem}
        open={customizationOpen}
        onOpenChange={setCustomizationOpen}
        globalExtras={menu?.extras || []}
      />

      <OrderDrawer open={orderOpen} onOpenChange={setOrderOpen} />

      <FloatingActionBar onViewOrder={() => setOrderOpen(true)} />
    </div>
  )
}