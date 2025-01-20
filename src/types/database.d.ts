export namespace Database {
  export interface Brand {
    id?: number;
    name: string;
    furigana?: string;
  }
  export interface Product {
    id?: number;
    brand_id: number;
    name: string;
    created_at?: string;
  }
}
