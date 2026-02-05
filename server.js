const express = require("express");
const cors = require("cors");
const db = require("./bd");
const path = require("path");

const app = express();

// =========================
// MIDDLEWARES
// =========================
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (css, js, img, etc.)
app.use(express.static(path.join(__dirname)));

// =========================
// RUTA PRINCIPAL
// =========================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "Busqueda.html"));
});

// =========================
// RUTA: TODOS LOS DEPARTAMENTOS
// =========================
app.get("/departamento", async (req, res) => {
    try {
        const sql = `
            SELECT 
                d.id_departamento,
                d.nombre,
                d.tipo,
                p.numero_piso AS piso,
                b.nombre AS bloque
            FROM departamento d
            JOIN piso p ON d.piso = p.id_piso
            JOIN bloque b ON p.id_bloque = b.id_bloque
            ORDER BY b.nombre, p.numero_piso
        `;

        const result = await db.query(sql);
        res.json(result.rows);
    } catch (error) {
        console.error("Error /departamento:", error);
        res.status(500).json({ error: "Error al obtener departamentos" });
    }
});

// =========================
// RUTA: BLOQUES
// =========================
app.get("/buscador", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id_bloque, nombre FROM bloque ORDER BY nombre"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error /buscador:", error);
        res.status(500).json({ error: "Error al obtener bloques" });
    }
});

// =========================
// RUTA: PISOS
// =========================
app.get("/buscadorPiso", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT DISTINCT numero_piso FROM piso ORDER BY numero_piso ASC"
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error /buscadorPiso:", error);
        res.status(500).json({ error: "Error al obtener pisos" });
    }
});

// =========================
// RUTA: BUSQUEDA AVANZADA
// =========================
app.get("/buscarAulas", async (req, res) => {
    try {
        const { buscar, bloque, piso } = req.query;

        let sql = `
            SELECT
                d.id_departamento,
                d.nombre,
                d.tipo,
                d.imagen_mapa,
                p.numero_piso AS piso,
                b.nombre AS bloque
            FROM departamento d
            JOIN piso p ON d.piso = p.id_piso
            JOIN bloque b ON p.id_bloque = b.id_bloque
            WHERE 1=1
        `;

        const params = [];
        let i = 1;

        if (buscar) {
            sql += ` AND d.nombre ILIKE $${i++}`;
            params.push(`%${buscar}%`);
        }

        if (bloque) {
            sql += ` AND b.id_bloque = $${i++}`;
            params.push(bloque);
        }

        if (piso) {
            sql += ` AND p.numero_piso = $${i++}`;
            params.push(piso);
        }

        const result = await db.query(sql, params);
        res.json(result.rows);

    } catch (error) {
        console.error("Error /buscarAulas:", error);
        res.status(500).json({ error: "Error en la base de datos" });
    }
});

// =========================
// RUTA: MAPA
// =========================
app.get("/mapa", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "MapaDep.html"));
});

// =========================
// RUTA: DEPARTAMENTO POR ID
// =========================
app.get("/departamento/:id", async (req, res) => {
    try {
        const result = await db.query(
            "SELECT nombre, imagen_mapa FROM departamento WHERE id_departamento = $1",
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: "Departamento no encontrado" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error /departamento/:id:", error);
        res.status(500).json({ error: "Error al obtener departamento" });
    }
});

// =========================
// RUTA BUSCADOR
// =========================
app.get("/buscar", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "Busqueda.html"));
});


// =========================
// INICIAR SERVIDOR
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});
