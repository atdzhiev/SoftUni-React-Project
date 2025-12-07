
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { LovesProvider } from './contexts/LovesContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <LovesProvider>
            <App />  
          </LovesProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </BrowserRouter>
    
 
)
