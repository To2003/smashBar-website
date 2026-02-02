"use client"

import { create } from "zustand"
import type { OrderItem, Table, TableStatus } from "./data"
import { initialTablesStatus } from "./data"

type AppMode = "client" | "waiter"

// Extendemos el tipo OrderItem para asegurar que tenga el ID interno del carrito
interface CartItem extends OrderItem {
  cartItemId: string
}

interface AppStore {
  mode: AppMode
  setMode: (mode: AppMode) => void
  
  // Client mode state
  tableNumber: number
  order: CartItem[] // Usamos CartItem en lugar de OrderItem
  addToOrder: (item: OrderItem) => void
  removeFromOrder: (cartItemId: string) => void // Borramos por ID de carrito
  updateOrderItemQuantity: (cartItemId: string, quantity: number) => void
  decrementItemQuantity: (cartItemId: string) => void
  clearOrder: () => void
  
  // Waiter mode state
  tables: Table[]
  // ... resto de propiedades igual ...
  updateTableStatus: (tableId: number, status: TableStatus) => void
  updateTableOrder: (tableId: number, order: OrderItem[]) => void
  updateTableGuests: (tableId: number, guests: number) => void
  resetTable: (tableId: number) => void
  selectedTableId: number | null
  setSelectedTableId: (tableId: number | null) => void
  
  waiterCalled: boolean
  billRequested: boolean
  callWaiter: () => void
  cancelWaiterCall: () => void
  requestBill: () => void
  cancelBillRequest: () => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  mode: "client",
  setMode: (mode) => set({ mode }),
  
  // Client mode
  tableNumber: 5, // Esto idealmente vendría del ?mesa=5 en la URL
  order: [],
  
  addToOrder: (item) => {
    const { order } = get()
    
    // Buscamos si ya existe un ítem EXACTAMENTE igual (mismo producto, mismos cambios)
    const existingIndex = order.findIndex(
      (o) =>
        o.id === item.id &&
        JSON.stringify(o.removedIngredients) === JSON.stringify(item.removedIngredients) &&
        JSON.stringify(o.addedExtras) === JSON.stringify(item.addedExtras)
    )
    
    if (existingIndex > -1) {
      // Si es idéntico, solo sumamos la cantidad
      const newOrder = [...order]
      newOrder[existingIndex].quantity += item.quantity
      set({ order: newOrder })
    } else {
      // Si es nuevo o tiene cambios diferentes, creamos una entrada nueva con ID único
      const newItem: CartItem = { 
        ...item, 
        cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` 
      }
      set({ order: [...order, newItem] })
    }
  },

  removeFromOrder: (cartItemId) => {
    set((state) => ({
      // Filtramos por el ID único del carrito, no por el ID del producto
      order: state.order.filter((item) => item.cartItemId !== cartItemId),
    }))
  },

  updateOrderItemQuantity: (cartItemId, quantity) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      ),
    }))
  },

  decrementItemQuantity: (cartItemId) => {
    const { order } = get()
    const item = order.find((o) => o.cartItemId === cartItemId)
    if (item) {
      if (item.quantity <= 1) {
        set({ order: order.filter((o) => o.cartItemId !== cartItemId) })
      } else {
        set({
          order: order.map((o) =>
            o.cartItemId === cartItemId ? { ...o, quantity: o.quantity - 1 } : o
          ),
        })
      }
    }
  },

  clearOrder: () => set({ order: [] }),
  
  // ... El resto del código del Waiter Mode se mantiene igual ...
  tables: initialTablesStatus,
  updateTableStatus: (tableId, status) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, status } : table
      ),
    }))
  },
  updateTableOrder: (tableId, order) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, order } : table
      ),
    }))
  },
  updateTableGuests: (tableId, guests) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId ? { ...table, guests } : table
      ),
    }))
  },
  resetTable: (tableId) => {
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId
          ? { ...table, status: "available" as TableStatus, order: [], guests: undefined }
          : table
      ),
    }))
  },
  selectedTableId: null,
  setSelectedTableId: (tableId) => set({ selectedTableId: tableId }),
  
  waiterCalled: false,
  billRequested: false,
  callWaiter: () => {
    const { tableNumber, tables } = get()
    set({
      waiterCalled: true,
      tables: tables.map((table) =>
        table.id === tableNumber ? { ...table, status: "calling" as TableStatus } : table
      ),
    })
  },
  cancelWaiterCall: () => {
    const { tableNumber, tables } = get()
    set({
      waiterCalled: false,
      tables: tables.map((table) =>
        table.id === tableNumber ? { ...table, status: "occupied" as TableStatus } : table
      ),
    })
  },
  requestBill: () => {
    const { tableNumber, tables } = get()
    set({
      billRequested: true,
      tables: tables.map((table) =>
        table.id === tableNumber ? { ...table, status: "bill" as TableStatus } : table
      ),
    })
  },
  cancelBillRequest: () => {
    const { tableNumber, tables } = get()
    set({
      billRequested: false,
      tables: tables.map((table) =>
        table.id === tableNumber ? { ...table, status: "occupied" as TableStatus } : table
      ),
    })
  },
}))