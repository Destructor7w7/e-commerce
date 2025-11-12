import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Producto no encontrado');
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        setProduct(data);
        setMainImg((data.images && data.images[0]) || data.thumbnail);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Error al cargar producto');
        setLoading(false);
      });
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="product-detail-loading">Cargando producto...</div>;
  if (error) return <div className="product-detail-error">{error}</div>;
  if (!product) return <div className="product-detail-empty">Producto no disponible.</div>;

  const handleAdd = () => {
    const item = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: mainImg || product.thumbnail,
    };
    addToCart(item, qty);
  };

  return (
    <div className="product-detail">
      <button className="back-link" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detail-grid">
        <aside className="gallery">
          <div className="main-image">
            <img src={mainImg || product.thumbnail} alt={product.title} />
          </div>

          {product.images && product.images.length > 0 && (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button key={i} className={`thumb ${src === mainImg ? 'active' : ''}`} onClick={() => setMainImg(src)}>
                  <img src={src} alt={`${product.title} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </aside>

        <section className="details">
          <h1>{product.title}</h1>
          <p className="muted">{product.brand} • {product.category}</p>
          <p className="description">{product.description}</p>

          <div className="price-row">
            <div className="price">${product.price}</div>
            {product.discountPercentage ? <div className="discount">{product.discountPercentage}% off</div> : null}
          </div>

          <div className="meta">
            <div>Rating: <strong>{product.rating}</strong></div>
            <div>Stock: <strong>{product.stock}</strong></div>
            <div>ID: <small>{product.id}</small></div>
          </div>

          <div className="actions-row">
            <div className="qty">
              <label>Cantidad</label>
              <div className="qty-controls">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <input type="number" value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))} min={1} />
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            <div className="cta">
              <button className="add-btn" onClick={handleAdd}>Agregar al carrito</button>
            </div>
          </div>

          <div className="all-specs">
            <h3>Especificaciones</h3>
            <ul>
              <li><strong>Marca:</strong> {product.brand}</li>
              <li><strong>Categoría:</strong> {product.category}</li>
              <li><strong>Precio:</strong> ${product.price}</li>
              <li><strong>Descuento:</strong> {product.discountPercentage ?? '—'}</li>
              <li><strong>Rating:</strong> {product.rating}</li>
              <li><strong>Stock:</strong> {product.stock}</li>
              <li><strong>ID:</strong> {product.id}</li>
              {/* Mostrar campos adicionales si existen */}
              {product.brand && <li><strong>Brand:</strong> {product.brand}</li>}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
