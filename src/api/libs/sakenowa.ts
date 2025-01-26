import { getData } from "../../utils";
import type { Sakenowa } from "../../types";

export type SakenowaData = {
  'areas': Sakenowa.AreaData;
  'brands': Sakenowa.BrandData;
  'breweries': Sakenowa.BreweryData;
  'flavorChart': Sakenowa.FlavorChartData;
  'tags': Sakenowa.FlavorTagData;
  'brandFlavorTags': Sakenowa.BrandFlavorTagData;
};

export namespace sakenowa {
  export async function fetch<T extends keyof SakenowaData>(
    endpoint: string
  ): Promise<SakenowaData[T]> {
    const SAKE_API_BASE = process.env.SAKENOWA_ENDPOINT;

    if (!SAKE_API_BASE) {
      throw new Error("SAKENOWA_ENDPOINT is not defined in environment variables");
    }

    const data = await getData<SakenowaData[T]>(`${SAKE_API_BASE}/${endpoint}`);
    return data;
  }
}
