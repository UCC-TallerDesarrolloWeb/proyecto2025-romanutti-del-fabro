import logo from "@assets/FastCars.svg";
import "@styles/sidebar.scss";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`overlay ${isOpen ? "active" : ""}`} 
        onClick={onClose}
      ></div>
      <nav className={`sidebar ${isOpen ? "active" : ""}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
          <img src={logo} alt="Fast Cars Logo" className="sidebar-logo" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="/" onClick={onClose}>Inicio</a>
          </li>
          <li>
            <a href="/catalogo" onClick={onClose}>Catálogo</a>
          </li>
          <li>
            <a href="/contacto" onClick={onClose}>Contacto</a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;