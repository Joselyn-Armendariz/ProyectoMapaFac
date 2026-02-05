// =========================
// CARGAR BLOQUES
// =========================
fetch("/buscador")
    .then(res => res.json())
    .then(data => {
        const select = document.querySelector('select[name="bloque"]');
        select.innerHTML = '<option value="">Todos</option>';

        data.forEach(bloque => {
            const opt = document.createElement('option');
            opt.value = bloque.id_bloque;
            opt.textContent = bloque.nombre;
            select.appendChild(opt);
        });
    })
    .catch(err => console.error("Error cargando bloques:", err));

// =========================
// CARGAR PISOS
// =========================
fetch("/buscadorPiso")
    .then(res => res.json())
    .then(data => {
        const select = document.querySelector('select[name="piso"]');
        select.innerHTML = '<option value="">Todos</option>';

        data.forEach(piso => {
            const opt = document.createElement('option');
            opt.value = piso.Numero_piso;
            opt.textContent = piso.Numero_piso;
            select.appendChild(opt);
        });
    })
    .catch(err => console.error("Error cargando pisos:", err));

// =========================
// BUSQUEDA AVANZADA
// =========================
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const buscar = this.querySelector('input[name="buscar"]').value;
    const bloque = this.querySelector('select[name="bloque"]').value;
    const piso = this.querySelector('select[name="piso"]').value;

    const params = new URLSearchParams();
    if (buscar) params.append("buscar", buscar);
    if (bloque) params.append("bloque", bloque);
    if (piso) params.append("piso", piso);

    console.log("Buscando con parámetros:", params.toString());

    fetch(`/buscarAulas?${params.toString()}`)
        .then(res => {
            if (!res.ok) throw new Error("Error del servidor");
            return res.json();
        })
        .then(data => {
            const contenedor = document.getElementById("resultados");
            if (!contenedor) return;

            if (data.length === 0) {
                contenedor.innerHTML =
                    '<div class="alert alert-warning text-center">No se encontraron resultados.</div>';
                return;
            }

            let html = '<div class="row">';
            data.forEach(item => {
                html += `
                <div class="col-md-4 mb-3">
                    <div class="card shadow-sm h-100">
                        <div class="card-body" style="cursor:pointer"
                             onclick="verMapa(${item.id_departamento})">
                            <h5 class="card-title text-primary">
                                ${item.departamento || item.nombre}
                            </h5>
                            <p class="card-text">
                                <strong>🏢 Bloque:</strong> ${item.bloque || 'N/A'}<br>
                                <strong>📶 Piso:</strong> ${item.piso || 'N/A'}
                            </p>
                            <img src="${item.imagen_mapa || 'img/imagenes_PB/default.jpg'}"
                                 alt="${item.departamento || item.nombre}"
                                 class="miniatura mb-2"
                                 style="width:100px;">
                        </div>
                    </div>
                </div>`;
            });
            html += "</div>";
            contenedor.innerHTML = html;
        })
        .catch(err => {
            console.error("Error en búsqueda:", err);
            alert("No se pudo realizar la búsqueda.");
        });
});

// =========================
// VER MAPA
// =========================
function verMapa(id) {// =========================
// CARGAR BLOQUES
// =========================
fetch("/buscador")
    .then(res => res.json())
    .then(data => {
        const select = document.querySelector('select[name="bloque"]');
        select.innerHTML = '<option value="">Todos</option>';

        data.forEach(bloque => {
            const opt = document.createElement('option');
            opt.value = bloque.id_bloque;
            opt.textContent = bloque.nombre;
            select.appendChild(opt);
        });
    })
    .catch(err => console.error("Error cargando bloques:", err));

// =========================
// CARGAR PISOS
// =========================
fetch("/buscadorPiso")
    .then(res => res.json())
    .then(data => {
        const select = document.querySelector('select[name="piso"]');
        select.innerHTML = '<option value="">Todos</option>';

        data.forEach(piso => {
            const opt = document.createElement('option');
            opt.value = piso.numero_piso;      // ✅
            opt.textContent = piso.numero_piso;
            select.appendChild(opt);
        });
    })
    .catch(err => console.error("Error cargando pisos:", err));

// =========================
// BUSQUEDA AVANZADA
// =========================
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const buscar = this.querySelector('input[name="buscar"]').value;
    const bloque = this.querySelector('select[name="bloque"]').value;
    const piso = this.querySelector('select[name="piso"]').value;

    const params = new URLSearchParams();
    if (buscar) params.append("buscar", buscar);
    if (bloque) params.append("bloque", bloque);
    if (piso) params.append("piso", piso);

    fetch(`/buscarAulas?${params.toString()}`)
        .then(res => {
            if (!res.ok) throw new Error("Error del servidor");
            return res.json();
        })
        .then(data => {
            const contenedor = document.getElementById("resultados");
            if (!contenedor) return;

            if (data.length === 0) {
                contenedor.innerHTML =
                    '<div class="alert alert-warning text-center">No se encontraron resultados.</div>';
                return;
            }

            let html = '<div class="row">';
            data.forEach(item => {
                html += `
                <div class="col-md-4 mb-3">
                    <div class="card shadow-sm h-100">
                        <div class="card-body" style="cursor:pointer"
                             onclick="verMapa(${item.id_departamento})">
                            <h5 class="card-title text-primary">
                                ${item.nombre} 
                            </h5>
                            <p class="card-text">
                                <strong>🏢 Bloque:</strong> ${item.bloque}<br>
                                <strong>📶 Piso:</strong> ${item.piso}<br>
                            </p>
                            <img src="${item.imagen_mapa || '/img/imagenes_PB/default.jpg'}"
                                 alt="${item.nombre}"
                                 class="miniatura mb-2"
                                 style="width:100px;">
                        </div>
                    </div>
                </div>`;
            });
            html += "</div>";
            contenedor.innerHTML = html;
        })
        .catch(err => {
            console.error("Error en búsqueda:", err);
            alert("No se pudo realizar la búsqueda.");
        });
});

// =========================
// VER MAPA
// =========================
function verMapa(id) {
    window.location.href = `/mapa?id=${id}`;
}

    window.location.href = `/mapa?id=${id}`;
}
