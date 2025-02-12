import { useQuery } from '@tanstack/react-query';

export function useBrandData(brandName: string | null) {
  const url = brandName ? `/api/brands?name=${encodeURIComponent(brandName)}` : '/api/brands';

  return useQuery({
    queryKey: ['brands', brandName],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`[HTTP Error] ${response.status} at ${url}`);
        throw new Error(`[HTTP Error] ${response.status}`);
      }

      const data = await response.json();
      if (!data) {
        console.warn(`[Warning] API returned unexpected response:`, data);
        return []; // `undefined` ではなく空配列を返す
      }
      return data;
    },
    enabled: !!brandName && brandName.trim() !== '', // null や "" を防ぐ
  });
}

export function useProductList(brandId: number | null) {
  const url = brandId ? `/api/products?brand_id=${brandId}` : '/api/products';

  return useQuery({
    queryKey: ['products', brandId],
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`[HTTP Error] ${response.status} at ${url}`);
        throw new Error(`[HTTP Error] ${response.status}`);
      }
      const data = await response.json();
      return data;
    },
    enabled: brandId !== undefined,
  });
}
