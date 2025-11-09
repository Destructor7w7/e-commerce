import './Products.css';

import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import './Products.css';

function Products() {
  return (
    <div className="products-page">
      <aside className="filters-sidebar">
        <ProductFilters />
      </aside>
      <main className="products-main">
        <ProductList />
      </main>
    </div>
  );
}

export default Products;
