import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// 1. BrowserRouter ko import karo
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* 2. Pure app structure ko BrowserRouter ke andar daal do */}
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)