import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

const pool = new Pool(
    databaseUrl
        ? {
              connectionString: databaseUrl,
              ssl:
                  process.env.NODE_ENV === "production"
                      ? { rejectUnauthorized: false }
                      : false,
          }
        : {
              user: process.env.DB_USER,
              host: process.env.DB_HOST,
              database: process.env.DB_NAME,
              password: process.env.DB_PASSWORD,
              port: Number(process.env.DB_PORT),
          }
);

export default pool;