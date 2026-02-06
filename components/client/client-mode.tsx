"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientHeader } from "./header"
import { ProductCard } from "./product-card"
import { CustomizationDrawer } from "./customization-drawer"
import { FloatingActionBar } from "./floating-action-bar"
import { OrderDrawer } from "./order-drawer"
import { NotificationBanner } from "./notification-banner"
import { useMenu } from "@/hooks/useMenu"
import type { MenuItem } from "@/lib/data"
import { sheetRowToMenuItem } from "@/lib/adapters/sheetToMenuItem"
import { Beef, Wine, Coffee, Cookie, UtensilsCrossed, Beer, Sandwich, WheatOff, Soup } from "lucide-react"

// Menu category tabs. IDs must match exactly with lib/config.ts keys
// Misalignment causes data loss during menu fetch
const categories = [
  { id: "hamburguesas", label: "Hamburguesas", icon: Beef },
  { id: "paraPicar", label: "Para Picar", icon: UtensilsCrossed },
  { id: "sandwiches", label: "Sandwiches", icon: Sandwich },
  { id: "platos", label: "Platos", icon: Soup }, // Includes Milanesas and Salads (main courses)
  { id: "sinTacc", label: "Sin TACC", icon: WheatOff }, // Gluten-free items (TACC: Trigo, Avena, Cebada, Centeno)
  { id: "postres", label: "Postres", icon: Cookie },
  { id: "bebidas", label: "Bebidas", icon: Coffee }, // Non-alcoholic beverages (soft drinks, water, juices)
  { id: "cervezas", label: "Birras", icon: Beer },
  { id: "tragos", label: "Tragos", icon: Wine },
  { id: "vinos", label: "Vinos", icon: Wine },
]

export function ClientMode() {
  const { menu, loading, error } = useMenu()
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [customizationOpen, setCustomizationOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center text-destructive">
          <p className="text-lg font-bold">Error Loading Menu</p>
          <p className="text-sm">Please check your connection or try again.</p>
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
        {/* Sticky category menu header */}
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

        {/* Tab content sections for each category */}
        {categories.map((category) => {
          // Obtenemos los items de la categoría actual desde el objeto 'menu'
          // Si no hay items (ej: null o undefined), usamos un array vacío
          const categoryItems = menu && menu[category.id] ? menu[category.id] : []

          return (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-2 gap-2 p-3">
                {categoryItems.length > 0 ? (
                  categoryItems.map((sheetRow: any) => {
                    // Transform Google Sheets data into typed MenuItem using adapter
                    const menuItem = sheetRowToMenuItem(sheetRow, category.id)

                    return (
                      <ProductCard
                        key={menuItem.id}
                        item={menuItem}
                        onSelect={() => handleSelectItem(menuItem)}
                      />
                    )
                  })
                ) : (
                  <div className="col-span-2 py-10 text-center text-muted-foreground">
                    <p>No products available in this section.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>

      {/* Customization drawer for menu item details and extras selection */}
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