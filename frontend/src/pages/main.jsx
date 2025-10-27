import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import "@styles/global.css"
import Layout from '@components/Layout';
import Home from '@pages/home.jsx';
import Catalogo from '@pages/catalogo.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
        </Route>
      </Routes>
    </BrowserRouter>,
)
