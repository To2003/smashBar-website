// hooks/useMenu.ts
import { useState, useEffect } from 'react';
import { fetchFullMenu } from '../lib/api';

export function useMenu() {
  const [menu, setMenu] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchFullMenu();

        // PROCESAMIENTO DE DATOS:
        // Aquí convertimos los precios de texto ("11500") a número (11500)
        // y los extras de texto ("Bacon,Queso") a arrays (["Bacon", "Queso"])
        Object.keys(data).forEach(category => {
          data[category] = data[category].map((item: any) => ({
            ...item,
            // Convertir precio a número si existe
            precio: item.precio ? Number(item.precio.toString().replace(/[^0-9.-]+/g,"")) : 0,
            // Convertir lista de extras separada por comas en Array
            extras_posibles: item.extras_posibles ? item.extras_posibles.split(',').map((e: string) => e.trim()) : []
          }));
        });

        setMenu(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { menu, loading, error };
}