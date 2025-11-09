import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
