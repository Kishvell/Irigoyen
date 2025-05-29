document.addEventListener("DOMContentLoaded", () => {
  fetch("data/autos.json")
    .then(res => res.json())
    .then(data => {
      mostrarAutos(data);
      aplicarFiltros(data);
    })
    .catch(error => console.error("Error cargando autos:", error));

  iniciarSlider();
});

function mostrarAutos(autos) {
  const container = document.getElementById("autos");
  container.innerHTML = "";
  
  autos.forEach(auto => {
    const card = document.createElement("div");
    card.className = "auto-card";
    card.innerHTML = `
      <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}" />
      <div class="auto-info">
        <h2>${auto.marca} ${auto.modelo}</h2>
        <p><strong>Estado:</strong> ${auto.estado}</p>
        <p><strong>Año:</strong> ${auto.año}</p>
        <p><strong>Kilometraje:</strong> ${auto.kilometraje} km</p>
        <p><strong>Descripción:</strong> ${auto.descripcion} </p>
        <p><strong>Extras:</strong> ${auto.extras} </p>
        <p><strong>Equipamiento:</strong> ${auto.equipamiento}</p>
        <p><strong>Equipamiento:</strong> ${auto.precio}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function aplicarFiltros(data) {
  const buscador = document.getElementById("buscador");
  const estado = document.getElementById("estado");
  const marca = document.getElementById("marca");
  const modelo = document.getElementById("modelo");
  const año = document.getElementById("año");
  const precio = document.getElementById("precio");

  const filtrar = () => {
    const texto = buscador.value.toLowerCase();
    const est = estado.value.toLowerCase();
    const mar = marca.value.toLowerCase();
    const mod = modelo.value.toLowerCase();
    const anio = año.value.toLowerCase();
    const precioMax = parseInt(precio.value);

    const resultado = data.filter(auto => {
      return (
        (!texto || auto.marca.toLowerCase().includes(texto) || auto.modelo.toLowerCase().includes(texto)) &&
        (!est || (auto.estado && auto.estado.toLowerCase() === est)) &&
        (!mar || (auto.marca && auto.marca.toLowerCase() === mar)) &&
        (!mod || (auto.modelo && auto.modelo.toLowerCase() === mod)) &&
        (!anio || (auto.año && auto.año.toString() === anio)) &&
        (!precioMax || parseInt(auto.precio.replace(/[^0-9]/g, '')) <= precioMax)
      );
    });

    mostrarAutos(resultado);
  };

  [buscador, estado, marca, modelo, año, precio].forEach(el => {
    el.addEventListener("input", filtrar);
    el.addEventListener("change", filtrar);
  });
}

function iniciarSlider() {
  let slides = document.querySelectorAll(".slide");
  let index = 0;
  setInterval(() => {
    slides.forEach(slide => slide.classList.remove("active"));
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4000);
}

document.getElementById('copyrightYear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = "Última modificación: " + document.lastModified;
