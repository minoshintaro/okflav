export namespace Sample {
  export interface Product {
    id: number;
    brandName: string;
    name: string;
    area: string;
  }

  export interface Post {
    id: number;
    productId: number;
    userId: number;
    date: string;
    startColor: string;
    endColor: string;
    content: string;
  }
}
