import pg from 'pg';
const { Pool } = pg;
import { config } from 'dotenv';

config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: { rejectUnauthorized: false} // Para evitar errores de SSL en local, debes comentar esta línea cuando hagas el deploy en Render
});

export default pool;

