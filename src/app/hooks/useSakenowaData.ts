import { useQueries } from "@tanstack/react-query";

async function fetchSakenowaData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`/api/sakenowa/${endpoint}`);
  if (!res.ok) {
    throw new Error(`[Sakenowa] Failed to fetch ${endpoint}`);
  }
  const data = await res.json();
  return data;
}

export function useSakenowaData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["sakenowa", "areas"],
        queryFn: () => fetchSakenowaData<Sakenowa.AreaData>('areas'),
        staleTime: 1000 * 60 * 60, // 60分間キャッシュ
      },
      {
        queryKey: ["sakenowa", "breweries"],
        queryFn: () => fetchSakenowaData<Sakenowa.BreweryData>('breweries'),
        staleTime: 1000 * 60 * 60,
      },
      {
        queryKey: ["sakenowa", "brands"],
        queryFn: () => fetchSakenowaData<Sakenowa.BrandData>('brands'),
        staleTime: 1000 * 60 * 60,
      },
    ],
  });

  return {
    areas: results[0].data?.areas ?? [],
    breweries: results[1].data?.breweries ?? [],
    brands: results[2].data?.brands ?? [],
    isLoading: results.some((res) => res.isLoading),
    isError: results.some((res) => res.isError),
  };
}
