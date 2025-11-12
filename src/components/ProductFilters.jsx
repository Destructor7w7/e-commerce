import React, { useEffect, useState } from 'react';
import './ProductFilters.css';

// Componente pequeño: cuadro de búsqueda con icono
function SearchBox({ value, onChange }) {
  return (
    <div className="search-box">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M21 21l-4.35-4.35" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="6" stroke="#888" strokeWidth="2"/>
      </svg>
      <input
        type="search"
        placeholder="Buscar productos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

// Lista de categorías: obtiene opciones desde la API y las normaliza a strings
function CategoryList({ selected, onSelect }) {
  const [categories, setCategories] = useState([]);

    useEffect(() => {
      let mounted = true;
      fetch('https://dummyjson.com/products/categories')
        .then((r) => r.json())
        .then((data) => {
          if (!mounted) return;
          // Normalizar: la API suele devolver strings, pero si vienen objetos los convertimos a label string
          let list = Array.isArray(data) ? data : [];
          const normalized = list.map((item) => {
            if (typeof item === 'string') return item;
            if (item && typeof item === 'object') return item.name || item.slug || item.url || JSON.stringify(item);
            return String(item);
          });
          setCategories(normalized);
        })
        .catch(() => {
          if (!mounted) return;
          setCategories([]);
        });
      return () => (mounted = false);
    }, []);

  return (
    <div className="category-list">
      {/* Opción para ver todas las categorías */}
      <button className={selected === 'all' ? 'active' : ''} onClick={() => onSelect('all')}>Todas</button>
      {categories.map((c) => (
        <button key={c} className={selected === c ? 'active' : ''} onClick={() => onSelect(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}

// Componente principal de filtros: expone callbacks para búsqueda y categoría
export default function ProductFilters({ onSearch = () => {}, onCategory = () => {} }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('all');

  // Debounce simple: espera 200ms antes de notificar al padre
  useEffect(() => {
    const t = setTimeout(() => onSearch(q), 200);
    return () => clearTimeout(t);
  }, [q, onSearch]);

  // Notificar cambio de categoría inmediatamente
  useEffect(() => onCategory(cat), [cat, onCategory]);

  return (
    <div className="product-filters compact">
      <SearchBox value={q} onChange={setQ} />
    </div>
  );
}
