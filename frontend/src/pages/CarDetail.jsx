import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "@styles/car-detail.scss";

const CarDetail = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate(); // Para navegar programáticamente
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Carga los datos del auto específico basado en el ID de la URL
   * @effect Se ejecuta cuando cambia el ID en la URL
   * @dependencies {string} id - El ID del auto obtenido de los parámetros de la URL
   * @returns {void} Actualiza el estado del auto y el estado de carga
   */
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch("/data/cars-data.json");
        if (!response.ok) {
          throw new Error("Error al cargar los datos de los autos");
        }
        const data = await response.json();
        const foundCar = data.find((c) => c.id === parseInt(id));
        setCar(foundCar);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [id]);

  /**
   * Actualiza el título de la página dinámicamente
   * @effect Se ejecuta cuando cambia el auto mostrado
   */
  useEffect(() => {
    if (car) {
      document.title = `${car.brand} ${car.model} - FastCars`;
    } else {
      document.title = "Auto no encontrado - FastCars";
    }
  }, [car]);

  /**
   * Formatea el precio con separadores de miles y símbolo de moneda
   * @method formatPrice
   * @param {number} price - El precio del auto a formatear
   * @returns {string} El precio formateado con formato de moneda USD
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return <div className="page-car-detail"><p>Cargando...</p></div>;
  }

  // Si no se encuentra el auto, mostrar mensaje de error
  if (!car) {
    return (
      <div className="page-car-detail">
        <div className="page-car-detail-content">
          <nav className="breadcrumb">
            <Link to="/">HOME</Link> / 
            <Link to="/catalogo">CATALOGO</Link> / 
            <span>Auto no encontrado</span>
          </nav>
        </div>
        <main className="car-container">
          <h2>Auto no encontrado</h2>
          <p>El auto que buscas no existe en nuestro catálogo.</p>
          <button onClick={() => navigate("/catalogo")} className="schedule-btn">
            ← Volver al Catálogo
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="page-car-detail">
      <div className="page-car-detail-content">
        <nav className="breadcrumb">
          <Link to="/">HOME</Link> / 
          <Link to="/catalogo">CATALOGO</Link> / 
          <span>{car.model}</span>
        </nav>
      </div>

      <main className="car-container">
        <div className="car-layout">
          {/* Sección de imagen */}
          <div className="car-image-section">
            <img 
              id="car-image"
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              className="car-image" 
            />
          </div>

          {/* Sección de información */}
          <div className="car-info-section">
            <h2 id="car-model" className="car-model">
              {car.brand} {car.model}
            </h2>
            
            <div id="car-year-km" className="car-year-km">
              Año: {car.year}
            </div>
            
            <div id="car-price" className="car-price">
              {formatPrice(car.price)}
            </div>

            <div className="car-specs">
              <p id="car-engine"><strong>Marca:</strong> {car.brand}</p>
              <p id="car-transmission"><strong>Modelo:</strong> {car.model}</p>
            </div>

            <Link to="/contacto">
              <button className="schedule-btn">Agendá tu visita</button>
            </Link>

            <div className="car-description">
              <p id="car-description">
                El {car.brand} {car.model} del año {car.year} es un vehículo excepcional 
                que combina potencia, elegancia y tecnología de punta. Perfecto para los 
                amantes de los autos deportivos de lujo.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetail;
