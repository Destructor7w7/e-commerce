import './Cart.css';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

// Página de carrito: diseño con textos claros y resumen separado
export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  // Formateador simple de moneda
  const fmt = (n) => Number(n).toFixed(2);

  if (!items.length) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p className="muted">Aún no agregaste productos. Explora nuestra selección y añade lo que te guste.</p>
        <Link to="/products" className="btn primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <div>
          <h1>Carrito de compras</h1>
          <p className="muted">Tienes {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito</p>
        </div>
        <div className="cart-header-actions">
          <Link to="/products" className="btn">Continuar comprando</Link>
          <button onClick={clearCart} className="btn danger">Vaciar carrito</button>
        </div>
      </header>

      <section className="cart-grid">
        <div className="cart-list">
          <div className="cart-list-head">
            <div>Producto</div>
            <div>Precio unitario</div>
            <div>Cantidad</div>
            <div>Subtotal</div>
            <div>Acciones</div>
          </div>

          {items.map((it) => {
            const qty = it.quantity || 1;
            const subtotal = (Number(it.price) || 0) * qty;
            return (
              <div className="cart-item" key={it.id}>
                <div className="cart-item-product">
                  <img src={it.thumbnail} alt={it.title} />
                  <div>
                    <h3>{it.title}</h3>
                    {it.description && <p className="muted small">{it.description}</p>}
                  </div>
                </div>

                <div className="cart-item-price">${fmt(it.price)}</div>

                <div className="cart-item-qty">
                  <button aria-label={`Disminuir cantidad de ${it.title}`} onClick={() => updateQuantity(it.id, qty - 1)} disabled={qty <= 1}>-</button>
                  <span>{qty}</span>
                  <button aria-label={`Aumentar cantidad de ${it.title}`} onClick={() => updateQuantity(it.id, qty + 1)}>+</button>
                </div>

                <div className="cart-item-subtotal">${fmt(subtotal)}</div>

                <div className="cart-item-actions">
                  <button onClick={() => removeFromCart(it.id)} className="btn small">Eliminar</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="cart-summary">
          <h2>Resumen del pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${fmt(totalPrice)}</strong>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="muted">Calculado al pagar</span>
          </div>
          <div className="summary-row">
            <span>Impuestos</span>
            <span className="muted">Incluidos cuando corresponda</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <strong>${fmt(totalPrice)}</strong>
          </div>

          <div className="summary-actions">
            <button className="btn primary checkout">Proceder al pago</button>
            <Link to="/products" className="btn">Seguir comprando</Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
