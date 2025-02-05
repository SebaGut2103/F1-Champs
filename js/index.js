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
        drivers.forEach(driver => {
          // Ajustar el texto para "año" y "escuderia"
          const driverData = {
            ...driver,
            year: `Año: ${driver.year}`,
            scuderia: `Escudería: ${driver.scuderia}`
          };
          const card = createdriverCard(driverData);
          driversContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error:', error);
        driversContainer.innerHTML = '<p class="text-center text-white">Error al cargar los pilotos. Por favor, intente más tarde.</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', loaddrivers);

//Función de busquedad

let driversData = []; // Almacenará los datos de los pilotos obtenidos del servidor

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
    year.textContent = drivers.year;

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
            driversData = drivers; // Almacenar los datos en la variable global
            renderDrivers(drivers); // Renderizar todos los pilotos inicialmente
        })
        .catch(error => {
            console.error('Error:', error);
            driversContainer.innerHTML = '<p class="text-center text-white">Error al cargar los pilotos. Por favor, intente más tarde.</p>';
        });
}

function renderDrivers(drivers) {
    const driversContainer = document.getElementById('drivers-container');
    driversContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar

    drivers.forEach(driver => {
        const card = createdriverCard(driver);
        driversContainer.appendChild(card);
    });
}

// Función de búsqueda en tiempo real por año
function searchDrivers(searchTerm) {
    const filteredDrivers = driversData.filter(driver =>
        driver.year.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por año
    );
    renderDrivers(filteredDrivers); // Renderizar los pilotos filtrados
}

// Evento para la búsqueda en tiempo real
document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.trim(); // Obtener el valor del campo de búsqueda
    searchDrivers(searchTerm); // Filtrar y renderizar los pilotos
});

// Cargar los pilotos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', loaddrivers);