import { useQueries } from "@tanstack/react-query";

export type SakenowaData = {
  areas: Sakenowa.Area[];
  breweries: Sakenowa.Brewery[];
  brands: Sakenowa.Brand[];
};

async function fetchAreas() {
  const res = await fetch("/api/sakenowa/areas");
  const data = await res.json();
  return data.areas;
}

async function fetchBreweries() {
  const res = await fetch("/api/sakenowa/breweries");
  const data = await res.json();
  return data.breweries;
}

async function fetchBrands() {
  const res = await fetch("/api/sakenowa/brands");
  const data = await res.json();
  return data.brands;
}

export function useSakenowaData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["sakenowa", "areas"],
        queryFn: fetchAreas,
        staleTime: 1000 * 60 * 60, // 60分間キャッシュ
      },
      {
        queryKey: ["sakenowa", "breweries"],
        queryFn: fetchBreweries,
        staleTime: 1000 * 60 * 60,
      },
      {
        queryKey: ["sakenowa", "brands"],
        queryFn: fetchBrands,
        staleTime: 1000 * 60 * 60,
      },
    ],
  });

  return {
    areas: results[0].data ?? [],
    breweries: results[1].data ?? [],
    brands: results[2].data ?? [],
    isLoading: results.some((res) => res.isLoading),
    isError: results.some((res) => res.isError),
  };
}
