import * as React from 'react';
import { useAtomValue } from 'jotai';
import { sakenowaAtom, targetBrandAtom } from '../../store';

type BrandDetails = {
  area: Sakenowa.Area,
  brewery: Sakenowa.Brewery,
  brand: Sakenowa.Brand,
};

export function useSakenowaAtom() {
  const { areas, breweries, brands } = useAtomValue(sakenowaAtom);
  const targetBrand = useAtomValue(targetBrandAtom);
  const [brandDetails, setBrandDetails] = React.useState<BrandDetails | null>(null);

  React.useEffect(() => {
    if (!targetBrand) {
      setBrandDetails(null);
      return;
    }

    const brand = brands.find((brand) => brand.name === targetBrand.name);
    if (!brand) {
      setBrandDetails(null);
      return;
    }

    const brewery = breweries.find((brewery) => brewery.id === brand?.breweryId);
    if (!brewery) {
      setBrandDetails(null);
      return;
    }

    const area = areas.find((area) => area.id === brewery?.areaId);
    if (!area) {
      setBrandDetails(null);
      return;
    }

    setBrandDetails({ area, brewery, brand });
  }, [targetBrand, areas, breweries, brands]);

  return brandDetails;
}
