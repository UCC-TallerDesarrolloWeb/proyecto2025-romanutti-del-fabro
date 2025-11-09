import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import "@styles/global.scss"
import Layout from '@components/Layout';
import Home from '@pages/home.jsx';
import Catalogo from '@pages/catalogo.jsx';
import Contact from '@pages/Contact.jsx';
import CarDetail from '@pages/CarDetail.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="auto/:id" element={<CarDetail />} />
          <Route path="contacto" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>,
)
