function createdriverCard(drivers) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 duration-300';

    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative h-48';

    // Imagen de la habitación
    const image = document.createElement('img');
    image.src = drivers.img;
    image.alt = drivers.name;
    image.className = 'absolute h-full w-full object-cover';

    // Contenedor del contenido
    const content = document.createElement('div');
    content.className = 'p-4';

   
    const name = document.createElement('h3');
    name.className = 'text-lg font-semibold text-gray-800';
    name.textContent = drivers.name;

    const year = document.createElement('p');
    year.className = 'text-gray-600 mt-2';
    year.textContent =  drivers.year;

    // Descripción de la habitación
    const description = document.createElement('p');
    description.className = 'text-gray-700 mt-2';
    description.textContent = drivers.description;

    const scuderia = document.createElement('p');
    scuderia.className = 'text-sm text-gray-500 mt-2';
    scuderia.textContent = drivers.scuderia;

    // Añadir los elementos a la tarjeta
    imageContainer.appendChild(image);
    content.appendChild(name);
    content.appendChild(description); 
    content.appendChild(year);
    content.appendChild(scuderia);
    card.appendChild(imageContainer);
    card.appendChild(content);

    return card;
  }

  function loaddrivers() {
    const driversContainer = document.getElementById('drivers-container');
    
    // Mostrar un mensaje de carga
    driversContainer.innerHTML = '<p class="text-center text-white">Cargando Pilotos...</p>';

    // Hacer la petición a la API
    fetch('http://localhost:3000/Drivers-Champions') // Aquí se debe poner la URL de tu API
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(drivers => {
        // Limpiar el contenedor
        driversContainer.innerHTML = '';

        // Procesar los datos y crear las tarjetas
        drivers.forEach(drivers => {
          const card = createdriverCard(drivers);
          driversContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        driversContainer.innerHTML = '<p class="text-center text-white">Error al cargar los pilotos. Por favor, intente más tarde.</p>';
      });
  }

  // Cargar las habitaciones cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', loaddrivers);

  //Menú hamburguesa 
  const toggleButton = document.getElementById("burger")
  const navWrapper = document.getElementById("nav");

  toggleButton.addEventListener("click", () =>{
    toggleButton.classList.toggle("close");
    navWrapper.classList.toggle("show");
  });

  navWrapper.addEventListener("click", e => {
    if(e.target.id === "nav"){
      navWrapper.classList.remove("shpow");
      toggleButton.classList.remove("close");
    }
  })