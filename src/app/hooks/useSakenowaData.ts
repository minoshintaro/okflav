import type { Sakenowa } from '../../types';
import { useState, useReducer, useEffect } from 'react';
import { fetchData } from '../../utils/fetchData';

const SAKENOWA_ENDPOINT = 'https://muro.sakenowa.com/sakenowa-data/api';

interface DataCache {
  areas: Sakenowa.AreaData;
  brands: Sakenowa.BrandData;
  breweries: Sakenowa.BreweryData;
  flavorCharts: Sakenowa.FlavorChartData;
  flavorTags: Sakenowa.FlavorTagData;
  brandFlavorTags: Sakenowa.BrandFlavorTagData;
}

const dataCache: Partial<DataCache> = {};

interface State {
  brand: string;
  brewery: string;
  area: string;
  flavorChart: Sakenowa.FlavorChart;
  flavorTags: string[];
  loading: boolean;
  error: string;
}

const areaData = await fetchData<Sakenowa.AreaData>(`${SAKENOWA_ENDPOINT}/areas`);
const brandData = await fetchData<Sakenowa.BrandData>(`${SAKENOWA_ENDPOINT}/brands`);
const breweryData = await fetchData<Sakenowa.BreweryData>(`${SAKENOWA_ENDPOINT}/breweries`);
const flavorChartData = await fetchData<Sakenowa.FlavorChartData>(`${SAKENOWA_ENDPOINT}/flavor-charts`);
const flavorTagData = await fetchData<Sakenowa.FlavorTagData>(`${SAKENOWA_ENDPOINT}/flavor-tags`);
const brandFlavorTagData = await fetchData<Sakenowa.BrandFlavorTagData>(`${SAKENOWA_ENDPOINT}/brand-flavor-tags`);

export function useSakenowaData(target: string) {
  const [data, setData] = useState({});

  useEffect(() => {
    const targetBrand = brandData!.brands.find((brand) => brand.name === target);
    if (!targetBrand) return;

    const tagetBrewery = breweryData!.breweries.find((brewery) => brewery.id === targetBrand.breweryId);
    if (!tagetBrewery) return;

    const areaName = areaData!.areas.find((area) => area.id === tagetBrewery!.areaId)?.name;
    const flavorChart = flavorChartData!.flavorChart.find((chart) => chart.brandId === targetBrand.id);
    const flavorTagIds = brandFlavorTagData!.flavorTags.find((tag) => tag.brandId === targetBrand.id)?.tagIds;
    const flavorTags = flavorTagIds?.map((id) => flavorTagData!.tags.find((tag) => tag.id === id)?.name);

    setData({
      brand: targetBrand.name,
      brewery: tagetBrewery.name,
      area: areaName,
      flavorChart,
      flavorTags,
    });
  }, [data, setData]);

  return { data, setData };

}
