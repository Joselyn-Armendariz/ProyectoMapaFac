fetch('http://localhost:3000/buscador') // Una ruta que devuelva el JSON de tus bloques
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
    })
    .then(data => {
        const select = document.querySelector('select[name="bloque"]');
        data.forEach(bloque => {
            let opt = document.createElement('option');
            opt.value = bloque.id_bloque;
            opt.innerHTML = bloque.Nombre || bloque.nombre_bloque;
            select.appendChild(opt);
        });
    })
    .catch(err => console.error('Error en el fetch:', err));

fetch('http://localhost:3000/buscadorPiso') // Una ruta que devuelva el JSON de tus pisos
    .then(res => {
        if (!res.ok) throw new Error('Error al obtener datos');
        return res.json();
    })
    .then(data => {
        const select = document.querySelector('select[name="piso"]');
        data.forEach(piso => {
            let opt = document.createElement('option');
            opt.value = piso.Numero_piso;
            opt.innerHTML = piso.Numero_piso || piso.nombre_piso;
            select.appendChild(opt);
        });
    })
    .catch(err => console.error('Error en el fetch:', err));

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Capturamos los datos
    const buscar = this.querySelector('input[name="buscar"]').value;
    const bloque = this.querySelector('select[name="bloque"]').value;
    const piso = this.querySelector('select[name="piso"]').value;

    // Construimos la URL.
    const params = new URLSearchParams({
        buscar: buscar,
        bloque: bloque,
        piso: piso
    });

    console.log("Buscando con parámetros:", params.toString());

    fetch(`http://localhost:3000/buscarAulas?${params.toString()}`)
        .then(res => {
            if (!res.ok) throw new Error('Error en la respuesta del servidor (404 o 500)');
            return res.json();
        })
        .then(data => {
            const contenedor = document.getElementById('resultados');
            if (!contenedor) return console.error("Falta el div con id='resultados'");

            if (data.length === 0) {
                contenedor.innerHTML = '<div class="alert alert-warning text-center">No se encontraron resultados.</div>';
                return;
            }

            let html = '<div class="row">';
            data.forEach(item => {
                html += `
                    <div class="col-md-4 mb-3">
                        <div class="card shadow-sm h-100">
                            <div class="card-body" style="cursor:pointer" onclick="verMapa(${item.id_departamento})">
                                <h5 class="card-title text-primary">${item.departamento || item.Nombre}</h5>
                                <p class="card-text">
                                    <strong><span style='color:#0b5ed7;'>&#127970;</span> Bloque:</strong> ${item.bloque || 'N/A'}<br>
                                        <strong><span style='color:#0b5ed7;'>&#129521;</span> Piso:</strong> ${item.piso || 'N/A'}
                                </p>
                                <img src="${item.imagen || 'img/imagenes_PB/default.jpg'}" alt="${item.departamento || item.Nombre}" class="miniatura mb-2">
                            </div>
                        </div>
    </div>`;
            });
            html += '</div>';
            contenedor.innerHTML = html;
        })
        .catch(err => {
            console.error("Error detallado:", err);
            alert("No se pudo conectar con el servidor. Verifica que 'node server.js' esté corriendo.");
        });
});

function verMapa(id) {
    window.location.href = `/mapa?id=${id}`;
}