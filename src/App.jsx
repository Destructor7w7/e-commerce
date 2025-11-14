// Archivo de rutas principales de la aplicación.
// Define las rutas (/, /products, /contact, /cart y 404) y muestra la TopBar y Navbar.
import { Routes, Route } from 'react-router-dom'
import './App.css'
import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Products from './Pages/Products'
import ProductDetail from './Pages/ProductDetail'
import Home from './Pages/Home'
import Login from './Pages/Login'
import AdminProducts from './Pages/AdminProducts'
import NotFound from './Pages/NotFound'
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'

function App() {
  return (
    <>
      <TopBar/>
      <Navbar/>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin/products" element={<AdminProducts />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} /> {/* Esta ruta captura todas las URLs no definidas */}
      </Routes>
    </>
  )
}

export default App
