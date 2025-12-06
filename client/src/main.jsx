
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProductsProvider } from './contexts/ProductsContext.jsx';
import { LovesProvider } from './contexts/LovesContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductsProvider>
        <LovesProvider>
          <App />  
        </LovesProvider>
      </ProductsProvider>
    </AuthProvider>
  </BrowserRouter>
    
 
)
