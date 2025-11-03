/**
 * Inicializa la página de detalle del auto cargando los datos específicos del vehículo seleccionado
 * @method DOMContentLoaded
 * @return {void} No retorna valor, actualiza el contenido de la página con los datos del auto
 */
document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del auto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    if (carId && carsData[carId]) {
        const car = carsData[carId];
        
        // Actualizar el contenido de la página
        document.getElementById('page-title').textContent = `${car.brand} ${car.model} - FastCars`;
        document.getElementById('car-model').textContent = `${car.brand} ${car.model}`;
        document.getElementById('breadcrumb-model').textContent = car.model;
        document.getElementById('car-image').src = car.image;
        document.getElementById('car-image').alt = `${car.brand} ${car.model}`;
        document.getElementById('car-year-km').textContent = `${car.year} / ${car.km}`;
        document.getElementById('car-price').textContent = car.price;
        document.getElementById('car-engine').textContent = `Motor: ${car.engine}`;
        document.getElementById('car-transmission').textContent = car.transmission;
        document.getElementById('car-description').textContent = car.description;
    } else {
        // Redirigir al catálogo si no se encuentra el auto
        window.location.href = 'index.html';
    }
});