// import type { Area, Brand, Brewery, FlavorChart, FlavorTag, BrandFlavorTag } from '../../types/';

export async function fetchSakenowaData<T>(query: string): Promise<T> {
  try {
    const response = await fetch(`https://muro.sakenowa.com/sakenowa-data/api/${query}`);
    if (!response.ok) {
      throw new Error(`Fetching error at ${query}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetching error at ${query}:`, error);
    throw error;
  }
}
