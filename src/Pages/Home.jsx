import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      {/* HERO principal: texto a la izquierda, imagen destacada a la derecha con forma */}
      <header className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Descubre</span>
            <h1>Encuentra tu producto ideal — demo e‑commerce</h1>
            <p className="lead">Simulamos una experiencia completa de tienda: catálogo filtrable, vista en grid/list, página de detalle con galería y carrito persistente. Todo listo para que pruebes interacciones y añadas tus propias imágenes.</p>

            <div className="hero-cta">
              <Link to="/products" className="btn-primary">Ver catálogo</Link>
              <Link to="/contact" className="btn-outline">Contacto</Link>
            </div>

            <ul className="feature-list">
              <li>Compra fácil</li>
              <li>Envío rápido y gratuito</li>
              <li>Soporte 24/7</li>
              <li>Garantía de devolución</li>
            </ul>
          </div>

          <div className="hero-media">
            <div className="hero-card">
              {/* imagen principal tomada de /Loislive.png en public */}
              <div className="image-placeholder">
                <img src="/Loislive.png" alt="Loislive" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* BARRA DE BENEFICIOS */}
      <section className="benefits">
        <div className="container">
          <div className="benefit">Compra fácil</div>
          <div className="benefit">Envío rápido y gratuito</div>
          <div className="benefit">Soporte 24/7</div>
          <div className="benefit">Garantía de devolución</div>
        </div>
      </section>

      {/* SECCION DE OFERTAS DESTACADAS */}
      <section className="promo-cards container">
        <FeaturedOffers />
      </section>

      {/* PRODUCTOS DESTACADOS (placeholders que pueden enlazar a /products) */}
      <section className="featured container">
        <h2>Nuestros productos más vendidos</h2>
        <FeaturedProducts />
      </section>

      {/* TESTIMONIOS / CTA */}
      <section className="testimonial container">
        <div className="testimonial-inner">
          <div className="testimonial-text">
            <h3>Lo que dicen nuestros clientes</h3>
            <p>Una tienda demo para probar flujos: añade al carrito, cambia cantidades y experimenta la persistencia local.</p>
          </div>
          <div className="testimonial-cards">
            <Testimonial name="María López" title="Compradora recurrente" text="Excelente experiencia, los productos de prueba me ayudaron a montar mi demo rápidamente." img="/placeholder-user1.png" />
            <Testimonial name="Carlos Pérez" title="Diseñador" text="Buena usabilidad y estilos limpios. Me sirvió para presentar un prototipo a clientes." img="/placeholder-user2.png" />
            <Testimonial name="Sofía García" title="Emprendedora" text="El carrito persistente es muy útil. Fácil de integrar y personalizar." img="/placeholder-user3.png" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Testimonial({ name, title, text, img }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-avatar">
        <img src={img || `https://i.pravatar.cc/150?u=${name}`} alt={name} />
      </div>
      <div className="testimonial-body">
        <p className="testimonial-text">"{text}"</p>
        <div className="testimonial-meta">
          <strong className="testimonial-name">{name}</strong>
          <span className="testimonial-role">{title}</span>
        </div>
      </div>
    </div>
  );
}

function FeaturedProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('https://dummyjson.com/products?limit=8')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list = (data && data.products) || [];
        // escoger 4 productos aleatorios o primeros 4
        setItems(list.slice(0, 4));
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setItems([]);
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="product-grid">Cargando productos...</div>;
  if (!items.length) return <div className="product-grid">No hay productos disponibles.</div>;

  return (
    <div className="product-grid">
      {items.map((p) => (
        <Link key={p.id} to={`/products/${p.id}`} className="product-card-placeholder">
          <img src={(p.thumbnail || (p.images && p.images[0]) || '/placeholder-product.jpg')} alt={p.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }} />
          <div style={{ marginTop: 8 }}>
            <div style={{ fontWeight: 700 }}>{p.title}</div>
            <div style={{ color: '#0a9', marginTop: 6 }}>${p.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function FeaturedOffers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // obtener productos y filtrar por mayor descuento
    fetch('https://dummyjson.com/products?limit=100')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const list = (data && data.products) || [];
        // ordenar por discountPercentage descendente y tomar top 3
        const sorted = list.slice().sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
        setOffers(sorted.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setOffers([]);
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="promo-grid">Cargando ofertas...</div>;
  if (!offers.length) return <div className="promo-grid">No hay ofertas disponibles.</div>;

  // helper para generar colores de muestra
  const colorPalette = ['#1f8ef1', '#ff6b6b', '#f6c85f', '#9b59b6', '#2ecc71', '#e67e22'];

  return (
    <div className="offer-grid">
      {offers.map((o, idx) => {
        const discount = o.discountPercentage || 0;
        const sale = Number(o.price);
        // estimar precio anterior usando el descuento (sólo visual)
        const oldPrice = discount ? Math.round((sale / (1 - discount / 100)) * 100) / 100 : null;
        // generar hasta 4 colores según id
        const colors = Array.from({ length: 4 }, (_, i) => colorPalette[(o.id + i) % colorPalette.length]);

        return (
          <Link key={o.id} to={`/products/${o.id}`} className="offer-card">
            <div className="badge">Rebaja</div>
            <div className="img-wrap">
              <img src={(o.thumbnail || (o.images && o.images[0]) || '/placeholder-product.jpg')} alt={o.title} loading="lazy" />
            </div>

            <div className="info">
              <div className="title">{o.title}</div>
              <div className="prices">
                {oldPrice ? <span className="old">${oldPrice}</span> : null}
                <span className="sale">${sale}</span>
              </div>

              <div className="swatches">
                {colors.map((c, i) => (
                  <button key={i} className="swatch" style={{ background: c }} aria-hidden="true" />
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
