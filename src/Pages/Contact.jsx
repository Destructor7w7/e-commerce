import './Contact.css';
import { useState } from 'react';

// Página de contacto profesional con validación y confirmación UX
export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState('');

  const recipient = 'Contacto@loislive.tech';

  // Validación simple
  const validate = () => {
    const e = {};
    if (!name || name.trim().length < 2) e.name = 'Ingresa tu nombre completo';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Ingresa un correo válido';
    if (!message || message.trim().length < 10) e.message = 'Escribe al menos 10 caracteres';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Preparar mailto pero primero mostrar confirmación (mejor UX)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setConfirmOpen(true);
  };

  const confirmSend = () => {
    const subject = encodeURIComponent(`Contacto desde sitio - ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}%0ATeléfono: ${phone}%0ACorreo: ${email}%0A%0AMensaje:%0A${message}`);
    // Abrir cliente de correo
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setConfirmOpen(false);
    setToast('Se abrió tu cliente de correo. Si no se abre, puedes usar el enlace alternativo.');
    // toast fade out
    setTimeout(() => setToast(''), 6000);
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-left" aria-hidden={confirmOpen}>
          <img src="/Loislive.png" alt="Loislive" className="brand-img" />
          <h1>Digitalizamos tu negocio</h1>
          <p className="lead">Hacemos crecer tu presencia digital con soluciones a la medida. Contáctanos y conversemos cómo ayudar a tu proyecto.</p>

          <div className="contact-info">
            <div>
              <h4>Teléfono</h4>
              <a href="tel:+573170557573">+57 317 055 7573</a>
            </div>
            <div>
              <h4>Correo</h4>
              <a href={`mailto:${recipient}`}>{recipient}</a>
            </div>
            <div>
              <h4>Horario</h4>
              <p className="muted">Lun - Vie, 9:00 - 18:00</p>
            </div>
          </div>
        </div>

        <div className="contact-right" aria-hidden={confirmOpen}>
          <h2>Envíanos un mensaje</h2>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label>
              Nombre completo
              <input aria-label="nombre" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" />
              {errors.name && <div className="error">{errors.name}</div>}
            </label>

            <label>
              Teléfono
              <input aria-label="teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(+57) 3xx xxx xxxx" />
            </label>

            <label>
              Correo electrónico
              <input aria-label="correo" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
              {errors.email && <div className="error">{errors.email}</div>}
            </label>

            <label>
              Mensaje
              <textarea aria-label="mensaje" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Cuéntanos tu proyecto" rows={6} />
              {errors.message && <div className="error">{errors.message}</div>}
            </label>

            <div className="form-actions">
              <button type="submit" className="btn primary">Enviar mensaje</button>
              <a className="btn secondary" href={`mailto:${recipient}`}>Enviar desde mi correo</a>
            </div>

            <p className="note">Al usar el botón "Enviar mensaje" se abrirá tu cliente de correo para enviar el mensaje a <strong>{recipient}</strong>. Si prefieres, usa el enlace "Enviar desde mi correo".</p>
          </form>
        </div>

        {/* Confirmación modal simple */}
        {confirmOpen && (
          <div className="confirm-modal" role="dialog" aria-modal="true">
            <div className="confirm-body">
              <h3>Confirmar envío</h3>
              <p>Se abrirá tu cliente de correo para enviar el mensaje a <strong>{recipient}</strong>. ¿Deseas continuar?</p>
              <div className="confirm-actions">
                <button className="btn" onClick={() => setConfirmOpen(false)}>Cancelar</button>
                <button className="btn primary" onClick={confirmSend}>Continuar</button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}
