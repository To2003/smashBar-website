/**
 * Google Sheets Row to MenuItem Adapter
 * 
 * Transforms raw Google Sheets data into typed MenuItem objects.
 * This adapter ensures consistent data transformation and provides
 * a single point of change if the sheet structure evolves.
 * 
 * @author: Code Refactor
 * @version: 1.0.0
 */

import type { MenuItem } from "@/lib/data"

/**
 * Represents raw data from Google Sheets row
 */
export interface GoogleSheetRow {
  nombre: string
  precio: number
  descripcion?: string
  imagen_url?: string
  extras_posibles?: Array<{ name: string; price: number }>
  ingredientes?: string[]
  personalizable?: boolean
  [key: string]: any
}

/**
 * Generates a stable ID from category and item name using a simple hash
 * This prevents ID changes when rows are deleted/added
 * 
 * @param categoryId - Category identifier from config
 * @param itemName - Product name from Google Sheets
 * @returns Stable unique ID combining category and name hash
 */
function generateItemId(categoryId: string, itemName: string): string {
  // Simple hash function for name to ensure unique IDs
  let hash = 0
  for (let i = 0; i < itemName.length; i++) {
    const char = itemName.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return `${categoryId}-${Math.abs(hash)}`
}

/**
 * Transforms a Google Sheets row into a MenuItem
 * 
 * Handles missing fields gracefully and provides sensible defaults.
 * Generates stable IDs based on category and name rather than row index.
 * 
 * @param row - Raw data from Google Sheets
 * @param categoryId - Category identifier from menu config
 * @returns Typed MenuItem ready for application use
 */
export function sheetRowToMenuItem(
  row: GoogleSheetRow,
  categoryId: string
): MenuItem {
  // Generate stable ID using name hash instead of row index
  const id = row.id || generateItemId(categoryId, row.nombre)

  return {
    id,
    name: row.nombre || "Unnamed Item",
    description: row.descripcion || "",
    price: row.precio || 0,
    image: row.imagen_url || "/placeholder.png",
    category: categoryId as MenuItem["category"],
    customizable: row.personalizable ?? false,
    ingredients: row.ingredientes || [],
    extras: row.extras_posibles || [],
  }
}

/**
 * Batch transforms multiple Google Sheets rows for a category
 * 
 * @param rows - Array of rows from Google Sheets
 * @param categoryId - Category identifier from menu config
 * @returns Array of typed MenuItems
 */
export function sheetRowsToMenuItems(
  rows: GoogleSheetRow[],
  categoryId: string
): MenuItem[] {
  return rows.map((row) => sheetRowToMenuItem(row, categoryId))
}
