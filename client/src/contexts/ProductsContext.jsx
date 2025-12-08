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

  const onEditProductSubmit = useCallback(async (data) => {
    try {
      if (Object.values(data).includes("")) {
        throw new Error("All fields are required!");
      }
      const result = await productsService.edit(data._id, data);
      setProducts((state) => state.map((x) => (x._id === data._id ? result : x)));
      navigate(`/products/details/${data._id}`);
    } catch (error) {
      alert(error.message);
    }
  }, [navigate]);

  const onDeleteClick = useCallback(async (productId) => {
    const result = confirm("Are you sure you want to delete?");
    if (!result) return;
    try {
      await productsService.deleteProduct(productId);
      setProducts((state) => state.filter((x) => x._id !== productId));
      navigate("/products");
    } catch (error) {
      alert(error.message);
    }
  }, [navigate]);

  const productsContextValues = useMemo(
    () => ({
      products,
      onCreateProductSubmit,
      onEditProductSubmit,
      onDeleteClick
      }),
    [
      products,
      onCreateProductSubmit,
      onEditProductSubmit,
      onDeleteClick
    ]
  );

  return (
    <ProductsContext.Provider value={productsContextValues}>
      {children}
    </ProductsContext.Provider>
  );
};