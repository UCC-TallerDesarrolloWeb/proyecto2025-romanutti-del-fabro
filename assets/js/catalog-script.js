/**
 * Genera las tarjetas de autos en el catálogo basándose en los datos proporcionados
 * @method generateCarCards
 * @param {Array} dataToShow - Array de objetos con datos de autos a mostrar, por defecto usa carsData
 * @return {void} No retorna valor, modifica el DOM directamente
 */
const generateCarCards = (dataToShow = carsData) => {
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


/**
 * Inicializa el catálogo de autos cuando el DOM está completamente cargado
 * @method initializeCatalog
 * @return {void} No retorna valor, configura los event listeners y genera las cards iniciales
 */
document.addEventListener('DOMContentLoaded', () => {
    // Generar las cards al cargar la página
    generateCarCards();
    
    // Agregar event listeners para los filtros
    document.getElementById('busqueda').addEventListener('input', filtrarAuto);
    document.getElementById('price-min').addEventListener('input', filtrarAuto);
    document.getElementById('price-max').addEventListener('input', filtrarAuto);
});

/**
 * Redirige a la página de detalle del auto seleccionado
 * @method goToCar
 * @param {number} carId - Índice del auto en el array carsData
 * @return {void} No retorna valor, redirige la página
 */
const goToCar = (carId) => {
    // Redirigir a la página individual con el ID del auto
    window.location.href = `car-detail.html?id=${carId}`;
}

/**
 * Convierte un precio en formato string con símbolos a número entero
 * @method convertirPrecioANumero
 * @param {string} precioString - Precio en formato string (ej: "$120.000")
 * @return {number} Precio convertido a número entero
 */
const convertirPrecioANumero = (precioString) => {
    // Eliminar $ y puntos, convertir a número
    return parseInt(precioString.replace(/[$.,]/g, ''));
}

/**
 * Filtra los autos del catálogo según los criterios de búsqueda seleccionados
 * @method filtrarAuto
 * @return {void} No retorna valor, actualiza la visualización de autos filtrados
 */
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