// src/components/Header.jsx
import React from 'react'
import { Link } from 'react-router-dom' // si luego usamos rutas

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      background: '#ffffff',
      boxShadow: '0 1px 6px rgba(0, 0, 0, 0.9)',
      borderRadius: '6px'
    }}>
      <div style={{ fontWeight: 700, color: '#0a6cff' }}>
        E-commerce
      </div>

      <nav style={{ display: 'flex', gap: '12px' }}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</a>
        <a href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>Productos</a>
        <a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>Sobre</a>
      </nav>
    </header>
  )
}
