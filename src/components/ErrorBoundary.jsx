import React from 'react'

// ErrorBoundary: captura errores de render y muestra un mensaje sencillo.
// Útil para evitar pantallas en blanco y ayudar a depurar en desarrollo.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Podemos registrar el error en un servicio externo si se desea
    // console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:20, color:'#fff', background:'#1a1a1a', minHeight:'100vh'}}>
          <h2>Algo salió mal.</h2>
          <p>{String(this.state.error)}</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
