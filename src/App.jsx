import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Products from './Pages/Products'
import NotFound from './Pages/NotFound'
import { ProductProvider } from './context/ProductContext'

function App() {
  return (
    <Router>
      <ProductProvider>
        <TopBar/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<main></main>} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<div>Página de Contacto</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ProductProvider>
    </Router>
  )
}

export default App
