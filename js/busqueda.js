// =========================
// CARGAR BLOQUES
// =========================
fetch("/buscador")
    .then(res => res.json())
    .then(data => {
        const select = document.querySelector('select[name="bloque"]');
        select.innerHTML = '<option value="">Todos</option>';

        data.forEach(b => {
            const opt = document.createElement('option');
            opt.value = b.id_bloque;
            opt.textContent = b.nombre;
            select.appendChild(opt);
        });
    });

// =========================
// CARGAR PISOS
// =========================
fetch("/buscadorPiso")
    .then(res => res.json())
    .then(data => {
        const select = document.querySelector('select[name="piso"]');
        select.innerHTML = '<option value="">Todos</option>';

        data.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.numero_piso;
            opt.textContent = p.numero_piso;
            select.appendChild(opt);
        });
    });

// =========================
// BUSQUEDA AVANZADA
// =========================
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    const buscar = document.querySelector('[name="buscar"]').value;
    const bloque = document.querySelector('[name="bloque"]').value;
    const piso = document.querySelector('[name="piso"]').value;

    const params = new URLSearchParams({ buscar, bloque, piso });

    fetch(`/buscarAulas?${params}`)
        .then(res => res.json())
        .then(data => {
            const cont = document.getElementById("resultados");

            if (data.length === 0) {
                cont.innerHTML = `<div class="alert alert-warning">Sin resultados</div>`;
                return;
            }

            cont.innerHTML = `<div class="row">
                ${data.map(d => `
                <div class="col-md-4 mb-3">
                    <div class="card h-100 shadow-sm" onclick="verMapa(${d.id_departamento})">
                        <div class="card-body">
                            <h5 class="text-primary">${d.nombre}</h5>
                            <p>
                                🏢 ${d.bloque}<br>
                                📶 ${d.piso}
                            </p>
                            <img src="${d.imagen_mapa || '/img/imagenes_PB/default.jpg'}"
                                 style="width:100px">
                        </div>
                    </div>
                </div>`).join("")}
            </div>`;
        });
});

function verMapa(id) {
    window.location.href = `/mapa?id=${id}`;
}
