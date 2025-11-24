import { Outlet } from 'react-router-dom';
import Footer from '@components/Footer.jsx';
import Header from '@components/Header.jsx';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;