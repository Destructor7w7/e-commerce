
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="./Logo.png" alt="Logo" />
      </div>

      <ul className="navbar-links">
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Productos</a></li>
        <li><a href="#">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
