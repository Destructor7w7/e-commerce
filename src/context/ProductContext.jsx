import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: 0, max: 2000 },
    searchTerm: ''
  });

  // Cargar productos
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesPrice = product.price >= filters.priceRange.min && 
                        product.price <= filters.priceRange.max;
    const matchesSearch = !filters.searchTerm || 
                         product.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Obtener categorías únicas
  const categories = [...new Set(products.map(product => product.category))];

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      priceRange: { min: 0, max: 2000 },
      searchTerm: ''
    });
  };

  const value = {
    products: filteredProducts,
    loading,
    filters,
    categories,
    updateFilters,
    resetFilters
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
