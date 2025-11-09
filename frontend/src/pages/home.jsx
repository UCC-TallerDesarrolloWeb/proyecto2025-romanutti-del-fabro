import "@styles/hero.css";
import "@styles/content.css";
import "@styles/cta.css";
const Home = () => {
    return (
        <>
        <section className="hero-section">
        <img src="images/portada.png" alt="Fast Car" />
        <div className="image-text">
        <p>Tu Auto,</p>
        <p>Tu Estilo.</p>
        </div> 
        </section>
        <section className="content">
            <h2>Bienvenido a Fast Cars</h2>
            <p>Explora nuestra colección de autos rápidos y elegantes. Encuentra el auto perfecto que se adapte a tu estilo y necesidades.</p>
            <p id="subtitle">Últimos Ingresos</p>
            <div className="last-cars-grid">
                <div onClick={() => { location.href='auto/1' }}>
                    <img src="images/cars/1.jpeg" alt="Auto Deportivo 1" />
                    <p>PORSCHE 911 GT2RS</p>
                </div>
                <div onClick={() => { location.href='auto/2' }}>
                    <img src="images/cars/2.jpg" alt="Auto Deportivo 2" />
                    <p>BMW M4 COMPETITION</p>
                </div>
                <div onClick={() => { location.href='auto/3' }}>
                    <img src="images/cars/3.jpg" alt="Auto Deportivo 3" />
                    <p>FERRARI F8 TRIBUTO</p>
                </div>
                <div onClick={() => { location.href='auto/4' }}>
                    <img src="images/cars/4.jpg" alt="Auto Deportivo 4"/>
                    <p>LAMBORGHINI HURACAN EVO</p>
                </div>
            </div>
        </section>
        <section className="cta-section">
            <div className="cta-content">
                <h3>¿Por qué elegir Fast Cars?</h3>
                <ul>
                    <li>Variedad de modelos: Desde deportivos hasta autos de lujo.</li>
                    <li>Precios competitivos: Encuentra el auto que deseas a un precio justo.</li>
                    <li>Atención personalizada: Nuestro equipo está aquí para ayudarte a encontrar el auto perfecto.</li>
                </ul>
                <a href="catalogo" className="cta-button">Ver Catalogo</a>
            </div>
        </section>
        </>
    )
};
export default Home;