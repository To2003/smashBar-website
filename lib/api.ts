// lib/api.ts
import { GOOGLE_SHEETS_API_KEY, SPREADSHEET_ID, SHEET_NAMES } from './config';

// Función auxiliar para convertir las filas de Excel (Arrays) a Objetos JSON
const rowToObject = (headers: string[], row: any[]) => {
  const obj: any = {};
  headers.forEach((header, index) => {
    // Limpiamos el header (ej: "Precio " -> "precio")
    const cleanHeader = header.toLowerCase().trim();
    // Asignamos el valor o null si está vacío
    obj[cleanHeader] = row[index] ? row[index] : null;
  });
  return obj;
};

// Función para traer UNA hoja específica
export const fetchSheetData = async (sheetName: string) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}!A:Z?key=${GOOGLE_SHEETS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.values || data.values.length === 0) return [];

    const headers = data.values[0]; // La fila 1 son los títulos
    const rows = data.values.slice(1); // El resto son datos

    return rows.map((row: any) => rowToObject(headers, row));

  } catch (error) {
    console.error(`Error trayendo la hoja ${sheetName}:`, error);
    return [];
  }
};

// Función maestra para traer TODO el menú junto
export const fetchFullMenu = async () => {
  const menu: any = {};
  
  // Convertimos el objeto SHEET_NAMES en un array para recorrerlo
  const requests = Object.entries(SHEET_NAMES).map(async ([key, sheetName]) => {
    const data = await fetchSheetData(sheetName);
    return { key, data };
  });

  // Esperamos a que todas las peticiones terminen (Paralelismo)
  const results = await Promise.all(requests);

  // Reconstruimos el objeto menú
  results.forEach(({ key, data }) => {
    menu[key] = data;
  });

  return menu;
};