const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "password",
    database: process.env.PGDATABASE || "mapa_facultad",
    port: process.env.PGPORT || 5432
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Error de conexión: " + err);
        return;
    }
    console.log("Conexión exitosa a PostgreSQL");
    release();
});

module.exports = pool;
