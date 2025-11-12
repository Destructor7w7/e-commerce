import React from 'react';
import './ProductToolbar.css';

export default function ProductToolbar({ perPage, setPerPage, sort, setSort, view, setView, total }) {
  return (
    <div className="product-toolbar">
      <div className="toolbar-left">
        <div className="view-icons" role="group" aria-label="Seleccionar vista">
          <button
            type="button"
            title="Vista en cuadrícula"
            aria-pressed={view === 'grid'}
            className={view === 'grid' ? 'active' : ''}
            onClick={() => setView('grid')}
          >
            ▦
          </button>

          <button
            type="button"
            title="Vista en lista"
            aria-pressed={view === 'list'}
            className={view === 'list' ? 'active' : ''}
            onClick={() => setView('list')}
          >
            ≡
          </button>
        </div>
        <div className="seen">VISTO COMO</div>
      </div>

      <div className="toolbar-right">
        <div className="per-page">
          <label>ELEMENTOS POR PÁGINA</label>
          <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
            <option value={12}>12</option>
            <option value={24}>24</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="sort-by">
          <label>ORDENAR POR</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="relevance">Más...</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>
    </div>
  );
}
