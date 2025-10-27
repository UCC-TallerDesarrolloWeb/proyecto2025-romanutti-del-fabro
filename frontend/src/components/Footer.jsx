import "@styles/footer.css";

const Footer = () => {
    return  (
        <footer >
            <div className="footer-content">

            <div>
                <p>&copy; 2025 Fast Cars</p>
                <img src="/FastCars.svg" alt="Fast Cars Logo" className="footer-logo" />
            
            </div>
            <div>
                <p>Contáctanos:</p>
                <ul>
                    <li>Email: contacto@fastcars.com</li>
                    <li>Teléfono: +54 9 351 123 4567</li>
                </ul>
            </div>
            </div>
        </footer>
    );
};

export default Footer;