let datos = [];

function mostrarDepartamentos(data) {
    const cont = document.getElementById("lista-departamentos");
    cont.innerHTML = "";

    const grupos = {};

    data.forEach(d => {
        grupos[d.bloque] ??= {};
        grupos[d.bloque][d.piso] ??= [];
        grupos[d.bloque][d.piso].push(d);
    });

    Object.keys(grupos).forEach(bloque => {
        cont.innerHTML += `<h2 class="text-primary">${bloque}</h2>`;

        Object.keys(grupos[bloque]).forEach(piso => {
            cont.innerHTML += `<h4>${piso}</h4>`;

            grupos[bloque][piso].forEach(d => {
                cont.innerHTML += `
                <div class="card p-2 mb-2" onclick="verMapa(${d.id_departamento})">
                    <b>${d.nombre}</b>
                    <small>Tipo: ${d.tipo}</small>
                </div>`;
            });
        });
    });
}

fetch("/departamento")
    .then(res => res.json())
    .then(data => {
        datos = data;
        mostrarDepartamentos(data);
    });

document.getElementById("buscador").addEventListener("keyup", e => {
    const t = e.target.value.toLowerCase();
    mostrarDepartamentos(datos.filter(d =>
        d.nombre.toLowerCase().includes(t) ||
        d.tipo.toLowerCase().includes(t)
    ));
});

function verMapa(id) {
    window.location.href = `/mapa?id=${id}`;
}
