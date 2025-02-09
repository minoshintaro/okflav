
interface User {
  name: string;
}
interface Area {
  name: string;
}
interface Brand {
  name: string;
  furigana?: string;
  area_id?: number;
}
interface Product {
  brand_id: number;
  name: string;
}
interface Post {
  product_id: number;
  user_id: number;
  message: string;
}
declare namespace Turso {
  // id INTEGER primary key autoincrement,
  // name TEXT not null
  type UserData = User & { id: number };

  // id integer primary key,
  // name text not null
  type AreaData = Area & { id: number };

  // id INTEGER PRIMARY KEY AUTOINCREMENT,
  // name TEXT NOT NULL UNIQUE,
  // furigana TEXT,
  // area_id INTEGER
  type BrandData = Brand & { id: number };

  // id INTEGER primary key autoincrement,
  // brand_id INTEGER not null,
  // name TEXT not null,
  // created_at DATETIME default current_timestamp,
  // foreign key (brand_id) references brands(id)
  type ProductData = Product & { id: number; created_at: string; };

  // id INTEGER primary key autoincrement,
  // product_id INTEGER not null,
  // user_id INTEGER not null,
  // message TEXT not null,
  // created_at DATETIME default current_timestamp,
  // updated_at DATETIME default current_timestamp,
  // foreign key (product_id) references products(id),
  // foreign key (user_id) references users(id)
  type PostData = Post & { id: number; created_at: string; updated_at: string; };
}

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
