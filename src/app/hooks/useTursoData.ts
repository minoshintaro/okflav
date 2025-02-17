import { useQuery } from '@tanstack/react-query';

async function fetchTursoData<T>(endpoint: string): Promise<T> {
  const response = await fetch(`/api/${endpoint}`);
  if (!response.ok) {
    throw new Error(`[Turso] Failed to fetch ${endpoint}`);
  }
  const data = await response.json() as T;
  return data;
}

export function useBrandData(brandName: string | null) {
  const endpoint = brandName ? `brands?name=${encodeURIComponent(brandName)}` : 'brands';
  const results = useQuery({
    queryKey: ['brands', brandName],
    queryFn: () => fetchTursoData<Turso.BrandData[]>(endpoint),
    enabled: !!brandName && brandName.trim() !== '',
  });

  return {
    data: results.data ?? [],
    isLoading: results.isLoading,
    isError: results.isError,
  };
}

export function useProductList(brandId: number | null) {
  const endpoint = brandId ? `products?brand_id=${brandId}` : 'products';
  const results = useQuery({
    queryKey: ['products', brandId],
    queryFn: () => fetchTursoData<Turso.ProductData[]>(endpoint),
    enabled: !!brandId,
  });

  return {
    data: results.data ?? [],
    isLoading: results.isLoading,
    isError: results.isError,
  };
}
