document.addEventListener('DOMContentLoaded', function() {
    const carsGrid = document.getElementById('cars-grid');
    
    function generateCarCards() {
        carsGrid.innerHTML = '';
        
        Object.keys(carsData).forEach(carId => {
            const car = carsData[carId];
            
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
            carCard.addEventListener('click', () => goToCar(carId));
            
            carsGrid.appendChild(carCard);
        });
    }
    
    // Generar las cards al cargar la página
    generateCarCards();
});

function goToCar(carId) {
    // Redirigir a la página individual con el ID del auto
    window.location.href = `car-detail.html?id=${carId}`;
}