document.addEventListener("DOMContentLoaded", () => {
  fetch("data/propiedades.json")
    .then(res => res.json())
    .then(data => {
      mostrarPropiedades(data);
      aplicarFiltros(data);
    })
    .catch(error => console.error("Error cargando propiedades:", error));

  iniciarSlider();
});

function mostrarPropiedades(propiedades) {
  const container = document.getElementById("propiedades");
  container.innerHTML = "";
  
  propiedades.forEach(propiedad => {
    const card = document.createElement("div");
    card.className = "propiedad-card";
    card.innerHTML = `
      <img src="${propiedad.imagen}" alt="${propiedad.titulo}" />
      <div class="propiedad-info">
        <h2>${propiedad.titulo}</h2>
        <p><strong>Operación:</strong> ${propiedad.operacion}</p>
        <p><strong>Tipo:</strong> ${propiedad.tipo}</p>
        <p><strong>Localidad:</strong> ${propiedad.localidad}</p>
        <p><strong>Precio:</strong> ${propiedad.precio}</p>
        <p><strong>Habitaciones:</strong> ${propiedad.habitaciones || "No especificado"}</p>
        <p><strong>Instalaciones:</strong> ${propiedad.instalaciones?.join(", ") || "No especificado"}</p>
        <p><strong>Climatización:</strong> ${propiedad.climatizacion?.join(", ") || "No especificado"}</p>
        <p><strong>Contacto:</strong> ${propiedad.contacto}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function aplicarFiltros(data) {
  const buscador = document.getElementById("buscador");
  const operacion = document.getElementById("operacion");
  const tipo = document.getElementById("tipo");
  const localidad = document.getElementById("localidad");
  const precio = document.getElementById("precio");

  const filtrar = () => {
    const texto = buscador.value.toLowerCase();
    const op = operacion.value.toLowerCase();
    const tip = tipo.value.toLowerCase();
    const loc = localidad.value.toLowerCase();
    const precioMax = parseInt(precio.value);

    const resultado = data.filter(prop => {
      return (
        (!texto || prop.titulo.toLowerCase().includes(texto) || prop.descripcion.toLowerCase().includes(texto)) &&
        (!op || (prop.operacion && prop.operacion.toLowerCase() === op)) &&
        (!tip || (prop.tipo && prop.tipo.toLowerCase() === tip)) &&
        (!loc || (prop.localidad && prop.localidad.toLowerCase() === loc)) &&
        (!precioMax || parseInt(prop.precio.replace(/[^0-9]/g, '')) <= precioMax)
      );
    });

    mostrarPropiedades(resultado);
  };

  [buscador, operacion, tipo, localidad, precio].forEach(el => {
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
