import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

// Lista de productos: filtra según búsqueda y categoría y renderiza tarjetas
export default function ProductList({ products = [], loading = false, search = '', category = 'all', sort = 'relevance', perPage = 24, view = 'grid' }) {
  // `products` ya viene filtrado desde Products.jsx en la mayoría de los casos.
  const list = products || [];

  if (loading) return <div className="products-loading">Cargando productos...</div>;

  if (!list.length) return <div className="products-empty">No se encontraron productos.</div>;

  return (
    <div className={`product-list ${view === 'list' ? 'list-view' : 'grid-view'}`}>
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
