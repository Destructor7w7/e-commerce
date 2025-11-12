import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Tarjeta de producto: muestra imagen, título, precio y botón para añadir al carrito
export default function ProductCard({ product }) {
  const img = (product.images && product.images[0]) || product.thumbnail || '/placeholder-product.jpg';
  const { addToCart } = useCart();

  const handleAdd = () => {
    const item = {
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      thumbnail: img,
    };
    addToCart(item, 1);
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-link-image">
        <img src={img} alt={product.title || product.name} />
      </Link>
      <div className="card-body">
        <div className="card-content">
          <h3><Link to={`/products/${product.id}`}>{product.title || product.name}</Link></h3>
          <p className="price">${product.price}</p>
        </div>

        <div className="card-actions">
          <button className="add-to-cart" onClick={handleAdd} aria-label={`Agregar ${product.title || product.name} al carrito`}>Agregar</button>
        </div>
      </div>
    </article>
  );
}
