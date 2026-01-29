const express = require("express");
const cors = require("cors");
const db = require("./bd");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener todos los departamentos
app.get("/departamento", (req, res) => {
    const sql = `SELECT d.Nombre, d.Tipo, p.Numero_piso AS Piso, b.Nombre AS Bloque FROM departamento d
        JOIN piso p ON d.Piso = p.id_piso
        JOIN bloque b ON p.id_bloque = b.id_bloque
        ORDER BY b.nombre, p.numero_piso;
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
});

// Ruta para obtener los bloques
app.get('/buscador', async (req, res) => {
    try {
        const [bloques] = await db.promise().query('SELECT id_bloque, Nombre FROM Bloque');
        res.json(bloques);
    } catch (error) {
        console.error("Error al obtener bloques:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta para obtener los pisos
app.get('/buscadorPiso', async (req, res) => {
    try {
        const [pisos] = await db.promise().query('SELECT DISTINCT Numero_piso FROM Piso ORDER BY Numero_piso ASC');
        res.json(pisos);
    } catch (error) {
        console.error("Error al obtener pisos:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta para manejar la búsqueda avanzada
// RUTA 1: Sirve el archivo HTML (La que entras desde el navegador)
app.get('/buscar', (req, res) => {
    res.sendFile(__dirname + '/Busqueda.html');
});

// RUTA 2: Procesa la búsqueda avanzada (La que hace la petición AJAX)
app.get('/buscarAulas', async (req, res) => {
    try {
        const { buscar, bloque, piso } = req.query;
        let sql = `SELECT d.Nombre as departamento, p.Numero_piso as piso, b.Nombre as bloque
            FROM Departamento d
            JOIN Piso p ON d.Piso = p.id_piso
            JOIN Bloque b ON p.id_bloque = b.id_bloque
            WHERE 1=1`; 
        
    const params = [];

        if (buscar) {
            sql += " AND d.Nombre LIKE ?";
            params.push(`%${buscar}%`);
        }
        if (bloque) {
            sql += " AND b.id_bloque = ?";
            params.push(bloque);
        }
        if (piso) {
            sql += " AND p.Numero_piso = ?";
            params.push(piso);
        }

        const [resultados] = await db.promise().query(sql, params);
        res.json(resultados);

    } catch (error) {
        console.error("Error en SQL:", error);
        res.status(500).json({ error: "Error en la base de datos" });
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});
