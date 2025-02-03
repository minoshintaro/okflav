// % turso auth login
// % turso db list

export namespace Database {
  export interface User {
    id?: number;
    name: string;
  }



  export interface Area {
    id?: number;
    name: string;
  }

  // → .schema brands
  // CREATE TABLE brands (
  // id INTEGER PRIMARY KEY AUTOINCREMENT,
  // name TEXT NOT NULL UNIQUE,
  // furigana TEXT,
  // area_id INTEGER
  // );
  export interface Brand {
    id?: number;
    name: string;
    furigana?: string;
    area_id?: number;
  }

  // → .schema products
  // CREATE TABLE products (
  // id INTEGER PRIMARY KEY AUTOINCREMENT,
  // brand_id INTEGER NOT NULL,
  // name TEXT NOT NULL,
  // created_at TEXT DEFAULT CURRENT_TIMESTAMP
  // );
  export interface Product {
    id?: number;
    brand_id: number;
    name: string;
    created_at?: string;
  }
  export interface Post {
    id?: number;
    brand_id: number;
    product_id: number;
    user_id: number;
    content: string;
    created_at?: string;
  }
  export interface FlavorColor {
    id?: number;
    post_id: number;
    name: string;
    top: number[] | null;
    middle: number[];
    last: number[] | null;
  }
}
