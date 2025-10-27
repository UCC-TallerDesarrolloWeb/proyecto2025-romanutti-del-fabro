import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer.jsx';
import Header from '@components/Header.jsx';

const Layout = () => {
  return (
    <> 
    <div className="overlay" id="overlay"></div>
        <nav className="sidebar" id="sidebar">
          <div className="sidebar-header">
            <button className="close-btn" id="closeBtn">&times;</button>
        </div>
        <ul className="sidebar-menu">
            <li><a href="#title">Inicio</a></li>
            <li><a href="catalogo.html">Catálogo</a></li>
            <li><a href="contacto.html">Contacto</a></li>
        </ul>
        </nav>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;