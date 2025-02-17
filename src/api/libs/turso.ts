import { createClient, type ResultSet } from "@libsql/client";
import { VALID_TABLE_KEYS } from "../../constants";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

type ValidTableName = keyof typeof VALID_TABLE_KEYS;
type ValidColumnGroup<T extends ValidTableName> = (typeof VALID_TABLE_KEYS)[T]; // 例：["id", "name"]
type ValidColumnName<T extends ValidTableName> = (typeof VALID_TABLE_KEYS)[T][number]; // 例："id" | "name"
type ValidRecord<T extends ValidTableName> = Record<ValidColumnName<T>, string | number>; // 例：{ id: 1, name: "hoge" }

export async function addRecord<T extends ValidTableName>(
  table: T,
  record: ValidRecord<T>,
): Promise<ResultSet> {
  const safeColumnNames: ValidColumnGroup<T> = VALID_TABLE_KEYS[table];
  const columns = Object.keys(record).filter(key => safeColumnNames.includes(key as ValidColumnName<T>));
  const values = columns.map(col => record[col as ValidColumnName<T>]);

  if (columns.length === 0) {
    throw new Error(`無効なレコード: ${table}`);
  }

  const placeholders = columns.map(() => "?").join(", ");
  const sql = `
    INSERT INTO ${table} (${columns.join(", ")})
    VALUES (${placeholders})
  `;

  return turso.execute({ sql, args: values });
}

export async function getData<T extends ValidTableName>(
  table: T,
  filter?: {
    where: ValidColumnName<T>;
    equals: string | number
  }
): Promise<ResultSet> {
  try {
    const safeColumnNames: ValidColumnName<T>[] = VALID_TABLE_KEYS[table];
    if (filter && !safeColumnNames.includes(filter.where)) {
      throw new Error(`無効なカラム: ${filter.where}`);
    }

    const sql = `
      SELECT * FROM ${table}
      ${filter ? ` WHERE ${filter.where} = ?` : ''}
    `;
    const args = filter ? [filter.equals] : [];

    return turso.execute({ sql, args });
  } catch (error) {
    console.error(error);
    throw new Error('データ取得ならず');
  }
}

export async function getPosts(
  filter?: {
    where: ValidColumnName<'posts'>;
    equals: string | number
  }
): Promise<ResultSet> {
  try {
    const safeColumnNames: ValidColumnName<'posts'>[] = VALID_TABLE_KEYS.posts;

    if (filter && !safeColumnNames.includes(filter.where)) {
      throw new Error(`無効なカラム: ${filter.where}`);
    }

    const sql = `
      SELECT
        p.id,
        brands.name as brand_name,
        products.name as product_name,
        areas.name as area_name,
        p.message,
        users.name as user_name,
        p.created_at,
        p.updated_at
      FROM posts as p
      JOIN users on p.user_id = users.id
      JOIN products on p.product_id = products.id
      JOIN brands on products.brand_id = brands.id
      LEFT JOIN areas on brands.area_id = areas.id
      ${filter ? ` WHERE ${filter.where} = ?` : ''}
      ORDER by p.created_at desc
      LIMIT 50
    `;
    const args = filter ? [filter.equals] : [];

    return await turso.execute({ sql, args });
  } catch (error) {
    console.error(error);
    throw new Error('データ取得ならず');
  }
}











export async function findTargetId(
  table: string,
  column: string,
  value: string,
): Promise<number | null> {
  const { rows } = await turso.execute({
    sql: `
      SELECT id
        FROM ${table}
        WHERE ${column} = ?
    `,
    args: [value],
  });

  return rows.length > 0 ? Number(rows[0].id) : null;
}


export async function updateRecord(
  table: string,
  columns: string[],
  values: any[],
  conditionColumns: string[],
  conditionValues: any[]
): Promise<ResultSet> {
  function createSet(columns: string[]): string {
    return columns.map(col => `${col} = ?`).join(', ');
  }

  function createWhere(columns: string[]): string {
    return columns.map(col => `${col} = ?`).join(' AND ');
  }

  const result = await turso.execute({
    sql: `
      UPDATE ${table}
        SET ${createSet(columns)}
        WHERE ${createWhere(conditionColumns)}
      `,
    args: [...values, ...conditionValues],
  });

  return result;
}
