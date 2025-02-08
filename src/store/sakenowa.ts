import { atom } from "jotai";
import { getData } from "../utils/fetchData";

export type SakenowaAtom = {
  areas: Sakenowa.Area[];
  breweries: Sakenowa.Brewery[];
  brands: Sakenowa.Brand[];
};

export const sakenowaAtom = atom(async () => {
  const [areasData, breweriesData, brandsData] = await Promise.all([
    getData<{ copyright: string; areas: Sakenowa.Area[] }>("/api/sakenowa/areas"),
    getData<{ copyright: string; breweries: Sakenowa.Brewery[] }>("/api/sakenowa/breweries"),
    getData<{ copyright: string; brands: Sakenowa.Brand[] }>("/api/sakenowa/brands"),
  ]);

  return {
    areas: areasData.areas,
    breweries: breweriesData.breweries,
    brands: brandsData.brands,
  } as SakenowaAtom;
});

export const targetBrandAtom = atom<Sakenowa.Brand | null>(null);
