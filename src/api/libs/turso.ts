import { createClient, type ResultSet } from "@libsql/client";
import { TABLES } from "../../constants";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

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

export async function addRecord(
  table: string,
  columns: string[],
  values: any[]
): Promise<ResultSet> {
  if (!TABLES.includes(table)) {
    throw new Error(`不正なテーブル名: ${table}`);
  }

  const placeholder = new Array(columns.length).fill('?').join(', ');
  const result = await turso.execute({
    sql: `
      INSERT
        INTO ${table} (${columns.join(', ')})
        VALUES (${placeholder})
    `,
    args: values,
  });

  return result;
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
