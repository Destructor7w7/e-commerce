import React from 'react'
import Header from './components/Header'

export default function App(){
  return (
    <>
      <Header />
      <main style={{ maxWidth: 980, margin: '24px auto', padding: '0 16px' }}>
        <h1>¡Hola, soy Lucho y esta es mi primera App en React!</h1>
        <p>Vamos paso a paso.</p>
      </main>
    </>
  )
}
