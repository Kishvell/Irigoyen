document.addEventListener("DOMContentLoaded", () => {
  fetch("data/bienes.json")
    .then(res => res.json())
    .then(data => {
      mostrarBienes(data);
      aplicarFiltros(data);
    })
    .catch(error => console.error("Error cargando bienes:", error));

  iniciarSlider();
});

function mostrarBienes(bienes) {
  const container = document.getElementById("bienes");
  container.innerHTML = "";
  
  bienes.forEach(bien => {
    const card = document.createElement("div");
    card.className = "bien-card";
    card.innerHTML = `
      <img src="${bien.imagen}" alt="${bien.nombre}" />
      <div class="bien-info">
        <h2>${bien.nombre}</h2>
        <p><strong>Categoría:</strong> ${bien.categoria}</p>
        <p><strong>Ubicación:</strong> ${bien.ubicacion}</p>
        <p><strong>Precio:</strong> ${bien.precio}</p>
        <p><strong>Disponibilidad:</strong> ${bien.disponibilidad}</p>
        <p><strong>Características:</strong><br>
          ${Object.entries(bien.caracteristicas || {})
            .map(([key, val]) => `${key}: ${val}`).join("<br>")}
        </p>
        <p><strong>Accesorios incluidos:</strong> ${bien.accesorios_incluidos?.join(", ") || "No especificado"}</p>
        <p><strong>Energía:</strong> ${bien.energia?.join(", ") || "No especificado"}</p>
        <p><strong>Contacto:</strong> ${bien.contacto}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function aplicarFiltros(data) {
  const buscador = document.getElementById("buscador");
  const categoria = document.getElementById("categoria");
  const condicion = document.getElementById("condicion");
  const precio = document.getElementById("precio");

  const filtrar = () => {
    const texto = buscador.value.toLowerCase();
    const cat = categoria.value.toLowerCase();
    const cond = condicion.value.toLowerCase();
    const precioMax = parseInt(precio.value);

    const resultado = data.filter(bien => {
      const precioNumerico = parseInt(bien.precio.replace(/[^0-9]/g, '')) || 0;
      return (
        (!texto || bien.nombre.toLowerCase().includes(texto) || bien.descripcion.toLowerCase().includes(texto)) &&
        (!cat || (bien.categoria && bien.categoria.toLowerCase() === cat)) &&
        (!cond || (bien.condicion && bien.condicion.toLowerCase() === cond)) &&
        (!precioMax || precioNumerico <= precioMax)
      );
    });

    mostrarBienes(resultado);
  };

  [buscador, categoria, condicion, precio].forEach(el => {
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
