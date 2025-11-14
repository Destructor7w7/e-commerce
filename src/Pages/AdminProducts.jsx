import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminProducts.css';

const API = 'http://localhost:4000/products';

// Fallback: importar `db.json` local para mostrar productos cuando json-server no esté corriendo.
// Esto permite ver la lista en el panel aunque la API mock no responda. No permite CRUD.
import localDb from '../../db.json';

export default function AdminProducts() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ title: '', price: '', description: '', thumbnail: '' });
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`API error ${res.status} ${res.statusText}: ${txt}`);
      }
      const data = await res.json();
      // Manejar varios formatos: un array directo, o un objeto con clave `products` (db.json)
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        // Intentar extraer arrays dentro del objeto (fallback)
        const possible = Object.values(data).find((v) => Array.isArray(v));
        setProducts(possible || []);
      }
    } catch (e) {
      console.error('fetchProducts error', e);
      // Si falla el fetch (ej. json-server no está corriendo), usar el `db.json` local como fallback.
      try {
        if (localDb && Array.isArray(localDb.products)) {
          setProducts(localDb.products);
          setError('No se pudo conectar a la API mock; mostrando datos desde `db.json` local. Para habilitar CRUD ejecuta `npm run start:api`. Detalles: ' + (e.message || e));
        } else {
          throw e;
        }
      } catch (inner) {
        setError('Error al obtener productos. Asegúrate de que la API mock está corriendo en http://localhost:4000 (ejecuta `npm run start:api` o `npx json-server --watch db.json --port 4000`). Detalles: ' + (e.message || e));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return alert('Título y precio son requeridos');
    const payload = { ...form, price: Number(form.price) };
    try {
      const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const created = await res.json();
      setProducts((p) => [created, ...p]);
      setForm({ title: '', price: '', description: '', thumbnail: '' });
    } catch (e) {
      alert('Error creando producto');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Eliminar producto?')) return;
    try {
      await fetch(`${API}/${id}`, { method: 'DELETE' });
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (e) {
      alert('Error eliminando');
    }
  };

  const handleUpdate = async (id, changes) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(changes) });
      const updated = await res.json();
      setProducts((p) => p.map((it) => (it.id === id ? updated : it)));
    } catch (e) {
      alert('Error actualizando');
    }
  };

  // Importar productos desde DummyJSON y guardarlos en la API local (json-server)
  const importFromDummy = async () => {
    if (!confirm('¿Importar productos desde dummyjson.com? Esto añadirá muchos productos a la API local.')) return;
    setImporting(true);
    try {
      const res = await fetch('https://dummyjson.com/products?limit=0');
      if (!res.ok) throw new Error('No se pudo obtener productos externos: ' + res.status);
      const payload = await res.json();
      const remoteProducts = Array.isArray(payload.products) ? payload.products : payload;
      // Mapear y enviar a la API local; omitimos id para que json-server asigne uno propio
      const mapped = remoteProducts.map((p) => ({
        title: p.title || p.name || 'Producto',
        price: Number(p.price) || 0,
        description: p.description || p.body || '',
        thumbnail: (p.thumbnail || (p.images && p.images[0]) || ''),
        images: p.images || []
      }));

      // Intentar insertar en la API local en paralelo (limitado)
      const created = [];
      for (const item of mapped) {
        try {
          const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
          if (!r.ok) {
            const t = await r.text();
            console.warn('create failed', r.status, t);
            continue;
          }
          const c = await r.json();
          created.push(c);
        } catch (e) {
          console.warn('create error', e);
        }
      }

      if (created.length) {
        // refrescar lista
        await fetchProducts();
        alert(`Importados ${created.length} productos a la API local.`);
      } else {
        alert('No se importó ningún producto. Asegúrate de que la API local (json-server) está corriendo.');
      }
    } catch (e) {
      console.error('importFromDummy error', e);
      alert('Error importando productos: ' + (e.message || e));
    } finally {
      setImporting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="admin-products">
      <h2>Admin · Productos</h2>
      <div className="admin-grid">
        <form className="create-form" onSubmit={handleCreate}>
          <h3>Crear producto</h3>
          <input placeholder="Título" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Precio" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Thumbnail (URL)" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
          <textarea placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button className="btn" type="submit">Crear</button>
        </form>

        <div className="list-panel">
          <h3>Lista de productos</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <button className="btn" onClick={fetchProducts} disabled={loading}>Recargar</button>
            <button className="btn" onClick={importFromDummy} disabled={importing}>{importing ? 'Importando...' : 'Importar desde DummyJSON'}</button>
          </div>
          {loading ? <div>Cargando...</div> : null}
          {error && (
            <div className="error">
              {error}
              <div style={{ marginTop: 8 }}>
                <button className="btn small" onClick={fetchProducts}>Reintentar</button>
              </div>
            </div>
          )}

          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Imagen</th><th>Título</th><th>Precio</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <AdminRow key={p.id} product={p} onDelete={() => handleDelete(p.id)} onSave={(changes) => handleUpdate(p.id, { ...p, ...changes })} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminRow({ product, onDelete, onSave }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);

  return (
    <tr>
      <td>{product.id}</td>
      <td><img src={product.thumbnail || (product.images && product.images[0])} alt="" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 6 }} /></td>
      <td>
        {edit ? <input value={title} onChange={(e) => setTitle(e.target.value)} /> : <span>{product.title}</span>}
      </td>
      <td>
        {edit ? <input value={price} onChange={(e) => setPrice(e.target.value)} /> : <strong>${product.price}</strong>}
      </td>
      <td>
        {edit ? (
          <>
            <button className="btn small" onClick={() => { onSave({ title, price: Number(price) }); setEdit(false); }}>Guardar</button>
            <button className="btn small" onClick={() => { setEdit(false); setTitle(product.title); setPrice(product.price); }}>Cancelar</button>
          </>
        ) : (
          <>
            <button className="btn small" onClick={() => setEdit(true)}>Editar</button>
            <button className="btn small danger" onClick={onDelete}>Eliminar</button>
          </>
        )}
      </td>
    </tr>
  );
}
