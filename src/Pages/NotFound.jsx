import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>¡Oops! Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className="back-home">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;