const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "itati123",
    database: "mapa_facultad"
});

conexion.connect((err) => {
    if (err) {
        console.error("Error de conexión: " + err);
        return;
    }
    console.log("Conexión exitosa a MySQL");
});

module.exports = conexion;
