// Turso ========================================

interface User {
  name: string;
}
interface Area {
  id: number;
  name: string;
}
interface Brand {
  name: string;
  area_id: number;
}
interface Product {
  name: string;
  brand_id: number;
}
interface Post {
  area_id: number;
  brand_id: number;
  brand_name: string;
  product_id: number;
  product_name: string;
  message: string;
  signature: string;
}
declare namespace Turso {
  type UserData = User & { id: number };
  type AreaData = Area;
  type BrandData = Brand & { id: number };
  type ProductData = Product & { id: number; created_at?: string; };
  type PostData = Post & { id: number; created_at?: string; updated_at?: string; };
}

// Sakenowa ========================================

declare namespace Sakenowa {
  interface Area {
    id: number;
    name: string;
  }
  interface Brand {
    id: number;
    name: string;
    breweryId: number;
  }
  interface Brewery {
    id: number;
    name: string;
    areaId: number;
  }
  interface FlavorChart {
    brandId: number;
    f1: number; // 華やか
    f2: number; // 芳醇
    f3: number; // 重厚
    f4: number; // 穏やか
    f5: number; // ドライ
    f6: number; // 軽快
  }
  interface FlavorTag {
    id: number;
    name: string;
  }
  interface BrandFlavorTag {
    brandId: number;
    tagIds: number[];
  }
}
