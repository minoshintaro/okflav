// % turso auth login
// % turso db list
// % turso db shell okflav

namespace Database {
  // →  .schema users
  // CREATE TABLE users (
  // id INTEGER primary key autoincrement,
  // name TEXT not null
  // );
  export interface User {
    name: string;
  }
  export type UserData = User & { id: number };

  // →  .schema areas
  // CREATE TABLE areas (
  // id integer primary key,
  // name text not null
  // );

  export interface Area {
    name: string;
  }
  export type AreaData = Area & { id: number };

  // → .schema brands
  // CREATE TABLE brands (
  // id INTEGER PRIMARY KEY AUTOINCREMENT,
  // name TEXT NOT NULL UNIQUE,
  // furigana TEXT,
  // area_id INTEGER
  // );
  export interface Brand {
    name: string;
    furigana?: string;
    area_id?: number;
  }
  export type BrandData = Brand & { id: number };

  // →  .schema products
  // CREATE TABLE products (
  // id INTEGER primary key autoincrement,
  // brand_id INTEGER not null,
  // name TEXT not null,
  // created_at DATETIME default current_timestamp,
  // foreign key (brand_id) references brands(id)
  // );
  export interface Product {
    brand_id: number;
    name: string;
  }
  export type ProductData = Product & { id: number; created_at: string; };

  // →  .schema posts
  // CREATE TABLE posts (
  // id INTEGER primary key autoincrement,
  // product_id INTEGER not null,
  // user_id INTEGER not null,
  // message TEXT not null,
  // created_at DATETIME default current_timestamp,
  // updated_at DATETIME default current_timestamp,
  // foreign key (product_id) references products(id),
  // foreign key (user_id) references users(id)
  // );
  export interface Post {
    product_id: number;
    user_id: number;
    message: string;
  }
  export type PostData = Post & { id: number; created_at: string; created_at: string; };

  export interface FlavorColor {
    id?: number;
    post_id: number;
    name: string;
    top: number[] | null;
    middle: number[];
    last: number[] | null;
  }
}
