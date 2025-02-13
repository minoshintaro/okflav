import { atom } from "jotai";
import { getData } from "../../utils/fetchData";

export type SakenowaData = {
  areas: Sakenowa.Area[];
  breweries: Sakenowa.Brewery[];
  brands: Sakenowa.Brand[];
};

export const sakenowaDataAtom = atom(async () => {
  const [areasData, breweriesData, brandsData] = await Promise.all([
    getData<{ copyright: string; areas: Sakenowa.Area[] }>("/api/sakenowa/areas"),
    getData<{ copyright: string; breweries: Sakenowa.Brewery[] }>("/api/sakenowa/breweries"),
    getData<{ copyright: string; brands: Sakenowa.Brand[] }>("/api/sakenowa/brands"),
  ]);

  return {
    areas: areasData.areas,
    breweries: breweriesData.breweries,
    brands: brandsData.brands,
  } as SakenowaData;
});
