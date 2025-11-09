import { useEffect, useRef } from "react";
import "@styles/header.scss";
import "@styles/sidebar.scss";
import logo from "@assets/FastCars.svg";
const Header = () => {
  // Referencias a los elementos del DOM
  const menuBtnRef = useRef(null);
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // Variables para los elementos
    const menuBtn = menuBtnRef.current;
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const closeBtn = closeBtnRef.current;

    /**
     * Función para abrir la sidebar del menú móvil
     * @method openSidebar
     * @return {void} No retorna valor
     */
    const openSidebar = () => {
      sidebar.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Evita scroll del body cuando está abierta
    };

    /**
     * Función para cerrar la sidebar del menú móvil
     * @method closeSidebar
     * @return {void} No retorna valor
     */
    const closeSidebar = () => {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = ""; // Restaura el scroll del body
    };

    /**
     * Maneja el evento keydown para cerrar la sidebar cuando se presiona la tecla Escape
     * @method keydownHandler
     * @param {KeyboardEvent} event - Evento del teclado
     * @return {void} No retorna valor
     */
    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    // Event listeners
    if (menuBtn) menuBtn.addEventListener("click", openSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
    if (overlay) overlay.addEventListener("click", closeSidebar);
    document.addEventListener("keydown", handleKeydown);

    // Cleanup: remover los event listeners cuando el componente se desmonte
    return () => {
      if (menuBtn) menuBtn.removeEventListener("click", openSidebar);
      if (closeBtn) closeBtn.removeEventListener("click", closeSidebar);
      if (overlay) overlay.removeEventListener("click", closeSidebar);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <>
      <header className="header">
        <div className="menu-button" ref={menuBtnRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
          </svg>
          <p>Menú</p>
        </div>

        <a href="/">
          <h1 id="title">Fast Cars</h1>
        </a>
        <div></div>
      </header>

      {/* Sidebar */}
      <nav className="sidebar" ref={sidebarRef}>
        <div className="sidebar-header">
          <button className="close-btn" ref={closeBtnRef}>
            ✕
          </button>
          <img src={logo} alt="Fast Cars Logo" className="sidebar-logo" />
        </div>
        <ul className="sidebar-menu">
          <li><a href="/">Inicio</a></li>
          <li><a href="/catalogo">Catálogo</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>


      {/* Overlay */}
      <div className="overlay" ref={overlayRef}></div>
    </>
  );
};
export default Header;
