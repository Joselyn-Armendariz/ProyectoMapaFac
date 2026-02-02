// Función para mostrar departamentos
function mostrarDepartamentos(data) {
    const contenedor = document.getElementById("lista-departamentos");
    contenedor.innerHTML = "";

    const bloques = {};

    data.forEach(dep => {
        const bloque = dep.Bloque;
        const piso = dep.Piso;

        if (!bloques[bloque]) { // Si el bloque no existe, crearlo
            bloques[bloque] = {};
        }

        if (!bloques[bloque][piso]) { // Si el piso no existe en el bloque, crearlo
            bloques[bloque][piso] = [];
        }

        bloques[bloque][piso].push(dep); // Agregar el departamento al piso correspondiente
    });

    Object.keys(bloques).forEach(bloque => { // Iterar sobre cada bloque
        const bloqueDiv = document.createElement("div");
        bloqueDiv.className = "bloque";
        bloqueDiv.innerHTML = `<h2>${bloque}</h2>`;

        Object.keys(bloques[bloque]).forEach(piso => { // Iterar sobre cada piso en el bloque
            const pisoDiv = document.createElement("div");
            pisoDiv.className = "piso";
            pisoDiv.innerHTML = `
                <h3>${piso}</h3>
                <div class="piso-contenido"></div>
            `;

            const contenido = pisoDiv.querySelector(".piso-contenido"); // Contenedor para los departamentos

            bloques[bloque][piso].forEach(dep => {
                contenido.innerHTML += `
                    <div class="departamento" onclick="verMapa(${dep.id_departamento})">
                        <h4>${dep.Nombre}</h4>
                        <p>Tipo: ${dep.Tipo}</p>
                        ${dep.Ubicacion ? `<p>${dep.Ubicacion}</p>` : ""}
                    </div>
                `;
            });

            bloqueDiv.appendChild(pisoDiv);
        });

        contenedor.appendChild(bloqueDiv);
    });
}

// Traer datos desde el backend
fetch("http://localhost:3000/departamento")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // Mostrar departamentos
        mostrarDepartamentos(data);

        // Habilitar búsqueda con los datos traídos del backend
        const buscador = document.getElementById("buscador");
        buscador.addEventListener("keyup", () => {
            const texto = buscador.value.toLowerCase();
            const filtrados = data.filter(departamento =>
                departamento.Nombre.toLowerCase().includes(texto) ||
                departamento.Tipo.toLowerCase().includes(texto)
            );
            mostrarDepartamentos(filtrados);
        });
    })
    .catch(err => console.log(err));

function verMapa(id) {
    window.location.href = `/mapa?id=${id}`;
}
