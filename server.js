const express = require("express");
const cors = require("cors");
const db = require("./bd");
const app = express();
const path = require("path");
// Ruta principal para Render
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando en Render!');
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));


// Ruta para obtener todos los departamentos
app.get("/departamento", (req, res) => {
    const sql = `SELECT  d.id_departamento, d.Nombre, d.Tipo, p.Numero_piso AS Piso, b.Nombre AS Bloque FROM departamento d
                JOIN piso p ON d.Piso = p.id_piso
                JOIN bloque b ON p.id_bloque = b.id_bloque
                ORDER BY b.nombre, p.numero_piso;
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result.rows);
    });
});

// Ruta para obtener los bloques
app.get('/buscador', async (req, res) => {
    try {
        const bloques = await db.query('SELECT id_bloque, Nombre FROM Bloque');
        res.json(bloques.rows);
    } catch (error) {
        console.error("Error al obtener bloques:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta para obtener los pisos
app.get('/buscadorPiso', async (req, res) => {
    try {
        const pisos = await db.query('SELECT DISTINCT Numero_piso FROM Piso ORDER BY Numero_piso ASC');
        res.json(pisos.rows);
    } catch (error) {
        console.error("Error al obtener pisos:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Ruta para manejar la búsqueda avanzada
// RUTA 1: Sirve el archivo HTML
app.get('/buscar', (req, res) => {
    res.sendFile(__dirname + "/views/Busqueda.html");
});

// RUTA 2: Procesa la búsqueda avanzada (La que hace la petición AJAX)
app.get('/buscarAulas', async (req, res) => {
    try {
        const { buscar, bloque, piso } = req.query;
        let sql = `SELECT  d.id_departamento, d.imagen_mapa, d.Nombre as departamento, p.Numero_piso as piso, b.Nombre as bloque
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

        const resultados = await db.query(sql, params);
        res.json(resultados.rows);

    } catch (error) {
        console.error("Error en SQL:", error);
        res.status(500).json({ error: "Error en la base de datos" });
    }
});

// Ruta para obtener un departamento por ID
app.get("/mapa", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "MapaDep.html"));
});

app.get("/departamento/:id", (req, res) => {
    db.query(
        "SELECT Nombre, imagen_mapa FROM departamento WHERE id_departamento = $1",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.rows.length === 0) {
                return res.status(404).json({ mensaje: "Departamento no encontrado" });
            }

            res.json(result.rows[0]);
        }
    );
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:" + PORT);
});
