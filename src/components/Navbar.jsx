// Barra de navegación principal.
// Contiene logo (vuelve a /), enlaces y acceso al carrito con contador.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Alternar menú (para móvil)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Obtener contador del carrito desde el contexto, de forma segura.
  let cartTotal = 0;
  try {
    const { totalItems } = useCart();
    cartTotal = totalItems;
  } catch (e) {
    cartTotal = 0;
  }

  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" />
        </Link>
      </div>

      <button 
        className={`hamburger ${isOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/products" onClick={toggleMenu}>Productos</Link></li>
        <li><Link to="/contact" onClick={toggleMenu}>Contacto</Link></li>
        {!user ? (
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        ) : (
          <li><button onClick={() => { logout(); toggleMenu(); }} className="logout-btn">Cerrar sesión</button></li>
        )}
        <li>
          <Link to="/cart" onClick={toggleMenu} className="cart-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20" r="1" fill="currentColor"/>
              <circle cx="18" cy="20" r="1" fill="currentColor"/>
            </svg>
            {cartTotal > 0 && <span className="cart-badge">{cartTotal}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
