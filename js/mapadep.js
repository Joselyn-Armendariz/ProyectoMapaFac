const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID recibido:", id);

fetch(`/departamento/${id}`)
    .then(res => res.json())
    .then(dep => {
        document.getElementById("titulo").innerText = dep.nombre; 
        document.getElementById("mapa").src = dep.imagen_mapa;   
    })
    .catch(err => console.error("Error cargando mapa:", err));

let zoom = 1;

function zoomMas() {
    zoom += 0.2;
    document.getElementById("mapa").style.transform = `scale(${zoom})`;
}

function zoomMenos() {
    zoom = Math.max(1, zoom - 0.2);
    document.getElementById("mapa").style.transform = `scale(${zoom})`;
}
