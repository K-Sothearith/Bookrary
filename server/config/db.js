import { initializeDatabase, getDbConnectionPool } from "../../Database/initDb.js";

let pool = null;

export async function initDb() {
  if (!pool) {
    pool = await initializeDatabase();
  }
  return pool;
}

export async function query(sql, params = []) {
  if (!pool) {
    pool = await getDbConnectionPool();
  }
  const [results] = await pool.query(sql, params);
  return results;
}
