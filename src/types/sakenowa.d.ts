namespace Sakenowa {
  export interface Area {
    id: number;
    name: string;
  }

  export interface Brand {
    id: number;
    name: string;
    breweryId: number;
  }

  export interface Brewery {
    id: number;
    name: string;
    areaId: Area['id'];
  }

  export interface FlavorChart {
    brandId: Brand['id'];
    f1: number; // 華やか
    f2: number; // 芳醇
    f3: number; // 重厚
    f4: number; // 穏やか
    f5: number; // ドライ
    f6: number; // 軽快
  }

  export interface FlavorTag {
    id: number;
    name: string;
  }

  export interface BrandFlavorTag {
    brandId: Brand['id'];
    tagIds: FlavorTag['id'][];
  }
}
