import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "matchpoint",
    password: "12345",
    port: 5432
});

export default pool;