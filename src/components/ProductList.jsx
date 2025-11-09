import { useProducts } from '../context/ProductContext';
import './ProductList.css';

function ProductList() {
  const { products, loading } = useProducts();

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (products.length === 0) {
    return <div className="no-results">No se encontraron productos con los filtros seleccionados</div>;
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="product-info">
            <h3>{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-price-rating">
              <span className="price">${product.price}</span>
              <span className="rating">⭐ {product.rating}</span>
            </div>
            <button className="add-to-cart">Añadir al carrito</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;