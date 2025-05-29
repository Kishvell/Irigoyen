document.addEventListener("DOMContentLoaded", () => { 
  fetch("data/data.json")
    .then(res => res.json())
    .then(data => {
      mostrarInfoEmpresa(data);
    })
    .catch(error => console.error("Error cargando la información de la empresa:", error));

  iniciarSlider();
});

function mostrarInfoEmpresa(empresa) {
  const container = document.getElementById("info-empresa");
  if (!container) return;

  container.innerHTML = `
    <div class="empresa-card">
      <img src="${empresa.logo}" alt="${empresa.nombre} logo" class="empresa-logo" />
      <h1>${empresa.nombre}</h1>
      <p>${empresa.descripcion}</p>
      
      <h3>¿Que Servicios proveemos?</h3>
      <ul>
        ${empresa.servicios.map(servicio => `<li>${servicio}</li>`).join("")}
      </ul>

      <h3>Creemos en...</h3>
      <p>${empresa.valores}</p>
    </div>
  `;
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
