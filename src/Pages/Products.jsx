import './Products.css';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import FiltersSidebar from '../components/FiltersSidebar';
import ProductToolbar from '../components/ProductToolbar';
import { useEffect, useMemo, useState } from 'react';

// Página principal de productos: coordina fetch y pasa datos a filtros/lista

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filtros controlados aquí y pasados a los componentes hijos
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [perPage, setPerPage] = useState(24);
  const [sort, setSort] = useState('relevance');
  // persistir la vista (grid / list) en localStorage para recordar la preferencia del usuario
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem('product_view') || 'grid';
    } catch (e) {
      return 'grid';
    }
  });

  // guardar la preferencia cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('product_view', view);
    } catch (e) {
      // ignorar errores de almacenamiento
    }
  }, [view]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // pedimos hasta 100 productos de prueba
    fetch('https://dummyjson.com/products?limit=100')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener productos');
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // dummyjson returns { products: [...] }
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Error');
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  const filtered = useMemo(() => {
    let list = products || [];
    if (category && category !== 'all') list = list.filter((p) => p.category === category);
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => (p.title || p.name || '').toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q));
    }
    if (minPrice != null) list = list.filter((p) => Number(p.price) >= minPrice);
    if (maxPrice != null) list = list.filter((p) => Number(p.price) <= maxPrice);

    // orden básico
    if (sort === 'price-asc') list = list.slice().sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'price-desc') list = list.slice().sort((a, b) => Number(b.price) - Number(a.price));

    return list;
  }, [products, search, category, minPrice, maxPrice, sort]);

  return (
    <div className="products-container">
      <h1>Nuestros Productos</h1>

      {error && <div className="error">{error}</div>}

      <div className="products-layout">
        <aside className="products-aside">
          <FiltersSidebar onCategory={(c) => setCategory(c)} onPrice={(a, b) => { setMinPrice(a); setMaxPrice(b); }} />
        </aside>

        <section className="products-main">
          <ProductToolbar perPage={perPage} setPerPage={setPerPage} sort={sort} setSort={setSort} view={view} setView={setView} total={filtered.length} />
          <ProductFilters onSearch={(val) => setSearch(val)} onCategory={(val) => setCategory(val)} />
          <ProductList products={filtered.slice(0, perPage)} loading={loading} search={search} category={category} view={view} />
        </section>
      </div>
    </div>
  );
}

export default Products;
