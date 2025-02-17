import type { SakenowaData } from '../../hooks';

export type BrandDetails = {
  area: Sakenowa.Area,
  brewery: Sakenowa.Brewery,
  brand: Sakenowa.Brand,
};

// export function getBrandDetails(data: SakenowaData, brand: Sakenowa.Brand): BrandDetails | null {
//   const brewery = data.breweries.find((brewery) => brewery.id === brand.breweryId);
//   if (!brewery) return null;
//
//   const area = data.areas.find((area) => area.id === brewery.areaId);
//   if (!area) return null;
//
//   return { area, brewery, brand };
// }

// export function getAreaId(data: SakenowaData, brand: Sakenowa.Brand): number | null {
//   const brewery = data.breweries.find((brewery) => brewery.id === brand.breweryId);
//   if (!brewery) return null;
//
//   const area = data.areas.find((area) => area.id === brewery.areaId);
//   return area?.id ?? null;
// }

// export function findAreaId(breweries: Sakenowa.Brewery[], id: number): number | null {
//   const brand = brands.find(item => item.name === target);
//   if (!brand) return null;
//
//   const brewery = breweries.find(item => item.id === brand.breweryId);
//   if (!brewery) return null;
//
//   return brewery.areaId;
// }
