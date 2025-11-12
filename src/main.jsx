// Punto de entrada: envuelve la App con BrowserRouter, ErrorBoundary y CartProvider.
// BrowserRouter: manejo de rutas.
// ErrorBoundary: captura errores en la UI y muestra un mensaje legible.
// CartProvider: contexto global del carrito (persistencia en localStorage).
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
          <App />
        </CartProvider>
          </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
)
