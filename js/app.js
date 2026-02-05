function mostrarDepartamentos(data) {
    const contenedor = document.getElementById("lista-departamentos");
    contenedor.innerHTML = "";

    const bloques = {};

    data.forEach(dep => {
        const bloque = dep.bloque || "Sin bloque";
        const piso = dep.piso || "Sin piso";

        if (!bloques[bloque]) {
            bloques[bloque] = {};
        }

        if (!bloques[bloque][piso]) {
            bloques[bloque][piso] = [];
        }

        bloques[bloque][piso].push(dep);
    });

    Object.keys(bloques).forEach(bloque => {
        const bloqueDiv = document.createElement("div");
        bloqueDiv.className = "bloque mb-4";
        bloqueDiv.innerHTML = `<h2 class="text-primary">${bloque}</h2>`;

        Object.keys(bloques[bloque]).forEach(piso => {
            const pisoDiv = document.createElement("div");
            pisoDiv.className = "piso mb-3";
            pisoDiv.innerHTML = `<h4 class="text-secondary">${piso}</h4>`;

            bloques[bloque][piso].forEach(dep => {
                const depDiv = document.createElement("div");
                depDiv.className = "departamento card p-2 mb-2 shadow-sm";
                depDiv.style.cursor = "pointer";

                depDiv.innerHTML = `
                    <b>${dep.nombre}</b>
                    <p class="mb-0 text-muted">Tipo: ${dep.tipo}</p>
                `;

                depDiv.onclick = () => verMapa(dep.id_departamento);
                pisoDiv.appendChild(depDiv);
            });

            bloqueDiv.appendChild(pisoDiv);
        });

        contenedor.appendChild(bloqueDiv);
    });
}

// =========================
// TRAER DATOS DESDE BACKEND
// =========================
fetch("/departamento")
    .then(res => res.json())
    .then(data => mostrarDepartamentos(data))
    .catch(err => console.error("Error cargando departamentos:", err));

// =========================
// VER MAPA
// =========================
function verMapa(id) {
    window.location.href = `/mapa?id=${id}`;
}
