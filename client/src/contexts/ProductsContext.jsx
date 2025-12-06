import { createContext, useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import * as productsService from "../services/productsService";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsService.getAll().then(setProducts)    
  }, []);
  
  const onCreateProductSubmit = useCallback(async (data) => {
    try {
      if (Object.values(data).includes("")) {
        throw new Error("All fields are required!");
      }
      const newProduct = await productsService.create(data);
      setProducts((state) => [...state, newProduct]);
      
      navigate("/products");
    } catch (error) {
      alert(error.message);
    }
  }, [navigate]);

  const productsContextValues = useMemo(
    () => ({
      products,
      onCreateProductSubmit,
      }),
    [
      products,
      onCreateProductSubmit,
    ]
  );

  return (
    <ProductsContext.Provider value={productsContextValues}>
      {children}
    </ProductsContext.Provider>
  );
};