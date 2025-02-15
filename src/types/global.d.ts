import { z } from "zod";
import { areaSchema, brandSchema, postSchema, productSchema, userSchema } from "./schemas";

declare global {
  type Area = z.infer<typeof areaSchema>;
  type Brand = z.infer<typeof brandSchema>;
  type Post = z.infer<typeof postSchema>;
  type Product = z.infer<typeof productSchema>;
  type User = z.infer<typeof userSchema>;

  namespace Turso {
    type AreaData = Area & { id: number };
    type BrandData = Brand & { id: number };
    type ProductData = Product & { id: number; createdAt: string; };
    type PostData = Post & { id: number; createdAt: string; updatedAt: string; };
    type UserData = User & { id: number };
  }

  namespace Sakenowa {
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
}




// interface Area {
//   name: string;
// }
// interface Brand {
//   name: string;
//   areaId: number;
// }
// interface Product {
//   name: string;
//   brandId: number;
// }
// interface Post {
//   productId: number;
//   userId: number;
//   message: string;
// }
// interface NewPost {
//   areaId: number;
//   brandId: number;
//   brandName: string;
//   productId: number;
//   productName: string;
//   userName: string;
//   message: string;
// }


// Sakenowa ========================================



export {};
