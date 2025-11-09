import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/catalog.css";
import { carsData } from "../data/cars-data";

const Catalogo = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState(carsData);
  
  // Cargar preferencias desde localStorage al iniciar
  const loadFilters = () => {
    const savedFilters = localStorage.getItem("catalogFilters");
    if (savedFilters) {
      return JSON.parse(savedFilters);
    }
    return {
      searchTerm: "",
      selectedBrand: "",
      selectedYear: "",
      minPrice: "",
      maxPrice: "",
    };
  };

  const initialFilters = loadFilters();
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm);
  const [selectedBrand, setSelectedBrand] = useState(initialFilters.selectedBrand);
  const [selectedYear, setSelectedYear] = useState(initialFilters.selectedYear);
  const [minPrice, setMinPrice] = useState(initialFilters.minPrice);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice);

  /**
   * Guarda las preferencias de filtros en localStorage cada vez que cambian
   * @effect Se ejecuta cada vez que cambian los filtros
   * @dependencies {string} searchTerm - Término de búsqueda para filtrar por modelo
   * @dependencies {string} selectedBrand - Marca seleccionada para filtrar
   * @dependencies {string} selectedYear - Año seleccionado para filtrar
   * @dependencies {string} minPrice - Precio mínimo para filtrar
   * @dependencies {string} maxPrice - Precio máximo para filtrar
   * @returns {void} Guarda los filtros en localStorage
   */
  useEffect(() => {
    const filters = {
      searchTerm,
      selectedBrand,
      selectedYear,
      minPrice,
      maxPrice,
    };
    localStorage.setItem("catalogFilters", JSON.stringify(filters));
  }, [searchTerm, selectedBrand, selectedYear, minPrice, maxPrice]);

  /**
   * Filtra los autos según los criterios de búsqueda y filtros aplicados
   * @effect Se ejecuta cada vez que cambian los criterios de búsqueda o filtros
   * @dependencies {string} searchTerm - Término de búsqueda para filtrar por modelo
   * @dependencies {string} selectedBrand - Marca seleccionada para filtrar
   * @dependencies {string} selectedYear - Año seleccionado para filtrar
   * @dependencies {string} minPrice - Precio mínimo para filtrar
   * @dependencies {string} maxPrice - Precio máximo para filtrar
   * @returns {void} Actualiza el estado de cars con los resultados filtrados
   */
  useEffect(() => {
    let filteredCars = [...carsData];

    // Filtrar por búsqueda de modelo
    if (searchTerm) {
      filteredCars = filteredCars.filter((car) =>
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por marca
    if (selectedBrand) {
      filteredCars = filteredCars.filter((car) => car.brand === selectedBrand);
    }

    // Filtrar por año
    if (selectedYear) {
      filteredCars = filteredCars.filter(
        (car) => car.year === parseInt(selectedYear)
      );
    }

    // Filtrar por precio mínimo
    if (minPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price >= parseInt(minPrice)
      );
    }

    // Filtrar por precio máximo
    if (maxPrice) {
      filteredCars = filteredCars.filter(
        (car) => car.price <= parseInt(maxPrice)
      );
    }

    setCars(filteredCars);
  }, [searchTerm, selectedBrand, selectedYear, minPrice, maxPrice]);

  /**
   * Formatea el precio con separadores de miles y símbolo de moneda, utilizando una funcion propia de javascript
   * @method formatPrice
   * @param {number} price - El precio del auto a formatear
   * @returns {string} El precio formateado con formato de moneda USD (ej: "US$ 55.000,00")
   * @example
   * formatPrice(55000) // Returns "US$ 55.000,00"
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  /**
   * Resetea todos los filtros a sus valores por defecto y limpia localStorage
   * @method resetFilters
   * @returns {void} Limpia todos los filtros y el localStorage
   */
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrand("");
    setSelectedYear("");
    setMinPrice("");
    setMaxPrice("");
    localStorage.removeItem("catalogFilters");
  };

  /**
   * Maneja el evento de clic en una tarjeta de auto para navegar a su página de detalles
   * @method handleCarClick
   * @param {number} carId - El ID único del auto seleccionado
   * @returns {void} Redirige al usuario a la página de detalles del auto usando React Router
   * @example
   * handleCarClick(5) // Navega a /auto/5
   */
  const handleCarClick = (carId) => {
    // Navegar a la página de detalles del auto usando React Router
    navigate(`/auto/${carId}`);
  };

  return (
    <div className="page-catalog">
      <div className="page-catalog-content">
        {/* Barra de búsqueda */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="busqueda">Buscar por modelo:</label>
            <input
              type="text"
              id="busqueda"
              name="busqueda"
              placeholder="911, Mustang, F8 Tributo..."
              value={searchTerm}
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </form>

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">HOME</a> / <span><u>CATÁLOGO</u></span>
        </nav>

        {/* Botón para resetear filtros */}
        {(searchTerm || selectedBrand || selectedYear || minPrice || maxPrice) && (
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button
              onClick={resetFilters}
              className="reset-filters-btn"
              style={{
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1em",
                fontWeight: "bold",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#cc0000"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#ff4d4d"}
            >
              Limpiar Filtros
            </button>
          </div>
        )}

        {/* Filtros */}
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="filters-container">
            <label htmlFor="brand">Filtrar por:</label>
            <select
              className="filter-dropdown"
              id="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Todas las marcas</option>
              <option value="Ford">Ford</option>
              <option value="Porsche">Porsche</option>
              <option value="BMW">BMW</option>
              <option value="Ferrari">Ferrari</option>
              <option value="Lamborghini">Lamborghini</option>
            </select>

            <label htmlFor="year">Año:</label>
            <select
              className="filter-dropdown"
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Todos los años</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>

            <div className="price-filter-container">
              <label htmlFor="price-min">Precio mínimo:</label>
              <input
                type="number"
                id="price-min"
                name="price-min"
                placeholder="0$"
                value={minPrice}
                min="0"
                className="price-input"
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <label htmlFor="price-max">Precio máximo:</label>
              <input
                type="number"
                id="price-max"
                name="price-max"
                placeholder="100000$"
                value={maxPrice}
                min="0"
                className="price-input"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Grid de autos */}
      <div className="catalog-container">
        <div className="cars-grid" id="cars-grid">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div
                key={car.id}
                className="car-card"
                onClick={() => handleCarClick(car.id)}
              >
                <div className="car-image-container">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="car-image"
                  />
                </div>
                <div className="car-info">
                  <p className="car-brand">{car.brand}</p>
                  <h3 className="car-model">{car.model}</h3>
                  <p className="car-year">{car.year}</p>
                  <p className="car-price">{formatPrice(car.price)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="error-message">
              No se encontraron autos que coincidan con los criterios de búsqueda.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;