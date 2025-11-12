import React, { useEffect, useState } from 'react';
import './FiltersSidebar.css';

// Sidebar de filtros: entregas, subcategorías, precio y color
export default function FiltersSidebar({ onCategory = () => {}, onPrice = () => {} }) {
  // Lista base de subcategorías pedida por el usuario
  const initialCategories = [
    'Beauty','Fragrances','Furniture','Groceries','Home Decoration','Kitchen Accessories','Laptops','Mens Shirts','Mens Shoes','Mens Watches','Mobile Accessories','Motorcycle','Skin Care','Smartphones','Sports Accessories','Sunglasses','Tablets','Tops','Vehicle','Womens Bags','Womens Dresses','Womens Jewellery','Womens Shoes','Womens Watches'
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [expanded, setExpanded] = useState({ sub: true, color: false });
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [selected, setSelected] = useState('all');

  useEffect(() => {
    // Intentamos obtener categorías reales del endpoint; si falla, conservamos la lista inicial
    let mounted = true;
    fetch('https://dummyjson.com/products/categories')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list = Array.isArray(data) ? data : [];
        if (list.length) {
          setCategories(list.map((c) => (typeof c === 'string' ? c : (c.name || c.slug || String(c)))));
        }
      })
      .catch(() => {
        // no hacemos nada, mantenemos initialCategories
      });
    return () => (mounted = false);
  }, []);

  const applyPrice = () => {
    const a = min === '' ? null : Number(min);
    const b = max === '' ? null : Number(max);
    onPrice(a, b);
  };

  return (
    <aside className="filters-sidebar">
      <div className="filter-block express">
        <button className="express-btn">Marcación Express <span className="badge">31</span></button>
      </div>

      <div className="filter-block">
        <div className="filter-header" onClick={() => setExpanded((s) => ({ ...s, sub: !s.sub }))}>
          <h4>SUBCATEGORIAS</h4>
          <span>{expanded.sub ? '▾' : '▸'}</span>
        </div>
        {expanded.sub && (
          <div className="filter-body">
            <ul className="sub-list">
              <li onClick={() => { setSelected('all'); onCategory('all'); }} className={selected === 'all' ? 'active' : ''}>Todas</li>
              {categories.map((c) => (
                <li key={c} onClick={() => { setSelected(c); onCategory(c); }} className={selected === c ? 'active' : ''}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="filter-block">
        <div className="filter-header" onClick={() => {}}>
          <h4>PRECIO</h4>
        </div>
        <div className="filter-body">
          <div className="price-inputs">
            <label>
              $ <input type="number" min="0" value={min} onChange={(e) => setMin(e.target.value)} placeholder="Mínimo" />
            </label>
            <label>
              $ <input type="number" min="0" value={max} onChange={(e) => setMax(e.target.value)} placeholder="Máximo" />
            </label>
          </div>
          <button className="apply" onClick={applyPrice}>Aplicar</button>
        </div>
      </div>

      <div className="filter-block">
        <div className="filter-header" onClick={() => setExpanded((s) => ({ ...s, color: !s.color }))}>
          <h4>COLOR</h4>
          <span>{expanded.color ? '▾' : '▸'}</span>
        </div>
        {expanded.color && (
          <div className="filter-body">
            <div className="swatches">
              <button className="swatch blue" />
              <button className="swatch white" />
              <button className="swatch black" />
              <button className="swatch red" />
            </div>
          </div>
        )}
      </div>

      <div className="filter-footer">
        <button className="clear">Limpiar filtros</button>
      </div>
    </aside>
  );
}
