function generateCarCards(dataToShow = carsData) {
        const carsGrid = document.getElementById('cars-grid');
        carsGrid.innerHTML = '';
        
        dataToShow.forEach((car, index) => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            
            carCard.innerHTML = `
                <div class="car-image-container">
                    <img src="${car.image}" alt="${car.brand} ${car.model}" class="car-image">
                </div>
                <div class="car-info">
                    <div class="car-brand">${car.brand}</div>
                    <div class="car-model">${car.model}</div>
                    <div class="car-year">${car.year}</div>
                    <div class="car-price">${car.price}</div>
                </div>
            `;
            
            // Hacer toda la card clickeable
            carCard.style.cursor = 'pointer';
            carCard.addEventListener('click', () => goToCar(index));
            
            carsGrid.appendChild(carCard);
        });
    }


document.addEventListener('DOMContentLoaded', function() {
    // Generar las cards al cargar la página
    generateCarCards();
    
    // Agregar event listeners para los filtros
    document.getElementById('busqueda').addEventListener('input', filtrarAuto);
    document.getElementById('price-min').addEventListener('input', filtrarAuto);
    document.getElementById('price-max').addEventListener('input', filtrarAuto);
});

function goToCar(carId) {
    // Redirigir a la página individual con el ID del auto
    window.location.href = `car-detail.html?id=${carId}`;
}



// Función para convertir precio de string a número
function convertirPrecioANumero(precioString) {
    // Eliminar $ y puntos, convertir a número
    return parseInt(precioString.replace(/[$.,]/g, ''));
}

let filtrarAuto = () => {
    let searchWord = document.getElementById("busqueda").value.toLowerCase().trim();
    let minValue = document.getElementById("price-min").value;
    let maxValue = document.getElementById("price-max").value;
    let min = minValue ? parseInt(minValue) : 0;
    let max = maxValue ? parseInt(maxValue) : 1000000;
    let año = document.getElementById("year").value;
    let marca = document.getElementById("brand").value;

    let newLista = [...carsData]; // Crear copia del array original

    // Filtro por búsqueda
    if (searchWord) {
        newLista = newLista.filter((car) =>
            car.brand.toLowerCase().includes(searchWord) ||
            car.model.toLowerCase().includes(searchWord) ||
            car.description.toLowerCase().includes(searchWord) ||
            car.year.toString().includes(searchWord) ||
            car.engine.toLowerCase().includes(searchWord)
        );
    }

    // Filtrar por año
    if (año) {
        newLista = newLista.filter((car) => {
            return car.year.toString() === año;
        });
    }
    
    // Filtrar por precio mínimo
    if (minValue && min > 0) {
        newLista = newLista.filter((car) => {
            let precioNumerico = convertirPrecioANumero(car.price);
            return precioNumerico >= min;
        });
    }

    // Filtrar por precio máximo
    if (maxValue && max > 0) {
        newLista = newLista.filter((car) => {
            let precioNumerico = convertirPrecioANumero(car.price);
            return precioNumerico <= max;
        });
    }

    // Filtrar por marca
    if (marca) {
        newLista = newLista.filter((car) => {
            return car.brand === marca;
        });
    }

    // Regenerar las cards con los datos filtrados
    generateCarCards(newLista);
};