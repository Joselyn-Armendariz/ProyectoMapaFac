const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID recibido:", id);

fetch(`http://localhost:3000/departamento/${id}`)
    .then(res => res.json())
    .then(dep => {
        document.getElementById("titulo").innerText = dep.Nombre;
        document.getElementById("mapa").src = dep.imagen_mapa;
        })
    .catch(err => console.log(err));