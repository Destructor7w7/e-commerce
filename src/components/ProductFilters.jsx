import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import './ProductFilters.css';

function ProductFilters() {
  const { categories, filters, updateFilters, resetFilters } = useProducts();
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePriceChange = (type, value) => {
    const newRange = { ...localPriceRange, [type]: Number(value) };
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    updateFilters({ priceRange: localPriceRange });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateFilters({ searchTerm: value });
  };

  return (
    <div className="filters-container">
      <h3>Filtros</h3>
      
      <div className="filter-section">
        <h4>Buscar</h4>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="filter-section">
        <h4>Categorías</h4>
        <ul>
          <li>
            <button
              className={!filters.category ? 'active' : ''}
              onClick={() => updateFilters({ category: '' })}
            >
              Todas
            </button>
          </li>
          {categories.map(category => (
            <li key={category}>
              <button
                className={filters.category === category ? 'active' : ''}
                onClick={() => updateFilters({ category })}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="filter-section">
        <h4>Precio</h4>
        <div className="price-range">
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={localPriceRange.min}
              onChange={(e) => handlePriceChange('min', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={localPriceRange.max}
              onChange={(e) => handlePriceChange('max', e.target.value)}
            />
          </div>
          <button 
            className="apply-price"
            onClick={applyPriceFilter}
          >
            Aplicar
          </button>
        </div>
      </div>

      <button 
        className="reset-filters"
        onClick={resetFilters}
      >
        Restablecer filtros
      </button>
    </div>
  );
}

export default ProductFilters;