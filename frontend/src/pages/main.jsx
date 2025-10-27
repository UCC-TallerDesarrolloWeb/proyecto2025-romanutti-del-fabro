import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from "@components/Layout.jsx"
import "@styles/global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
)
