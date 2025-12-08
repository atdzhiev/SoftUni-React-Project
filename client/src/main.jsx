import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { LovesProvider } from './contexts/LovesContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import {  CartProvider } from './contexts/CartContext.jsx';
import { ErrorProvider } from './contexts/ErrorContext.jsx';


createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <ErrorProvider>
        <AuthProvider>
        <CartProvider>
          <ProductsProvider>
              <LovesProvider>
                  <App />
              </LovesProvider>
          </ProductsProvider>
        </CartProvider>
        </AuthProvider>
      </ErrorProvider>
   </BrowserRouter>
  
)
