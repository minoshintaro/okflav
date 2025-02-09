import * as React from 'react';
import { useAtomValue } from 'jotai';
import { sakenowaDataAtom, sakenowaBrandAtom } from '../../store';

type BrandDetails = {
  area: Sakenowa.Area,
  brewery: Sakenowa.Brewery,
  brand: Sakenowa.Brand,
};

export function useSakenowaAtom() {
  const { areas, breweries, brands } = useAtomValue(sakenowaDataAtom);
  const targetBrand = useAtomValue(sakenowaBrandAtom);
  const [sakenowaBrandDetails, setSakenowaBrandDetails] = React.useState<BrandDetails | null>(null);

  React.useEffect(() => {
    if (!targetBrand) {
      setSakenowaBrandDetails(null);
      return;
    }

    const brand = brands.find((brand) => brand.name === targetBrand.name);
    if (!brand) {
      setSakenowaBrandDetails(null);
      return;
    }

    const brewery = breweries.find((brewery) => brewery.id === brand?.breweryId);
    if (!brewery) {
      setSakenowaBrandDetails(null);
      return;
    }

    const area = areas.find((area) => area.id === brewery?.areaId);
    if (!area) {
      setSakenowaBrandDetails(null);
      return;
    }

    setSakenowaBrandDetails({ area, brewery, brand });
  }, [targetBrand, areas, breweries, brands]);

  return sakenowaBrandDetails;
}
