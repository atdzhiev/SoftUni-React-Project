import {  createContext,  memo,  useCallback,  useContext,  useEffect,  useMemo,  useState,} from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import * as cartService from "../services/cartService";

export const CartContext = createContext();

export const CartProvider = memo(({ children }) => {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (userId) {
      cartService.getOwnCart(userId).then((result) => {
        setCart(result);
      });
    }
  }, [userId]);

  const onCartSubmit = useCallback(
    async (data) => {
      try {
        const newCartItem = await cartService.create(data, userId);
         setCart((cart) => {
        const existing = cart.find((x) => x.productId === newCartItem.productId);

        if (existing) {
          return cart.map((x) =>
            x.productId === newCartItem.productId
              ? { ...x, ...newCartItem, quantity: x.quantity + data.quantity }
              : x
          );
        }

        return [...cart, { ...newCartItem, quantity: data.quantity }];
      });

      navigate("/shoppingcart");
    }  catch (err) {
        alert(err.message);
      }
    },
    [navigate, userId]
  );

  const onCartEdit = useCallback(async (cartItemId, quantity) => {
    try {
      const updatedItem = await cartService.edit(cartItemId, quantity);

      setCart((state) =>
        state.map((x) =>
          x._id === cartItemId ? { ...x, ...updatedItem } : x
        )
      );
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const onCartDelete = useCallback(async (cartItemId) => {
    
    
    try {
      await cartService.remove(cartItemId);
      setCart((state) => state.filter((x) => x._id !== cartItemId));
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const clearCart = () => {
  setCart([]); 
  };


  const cartContextValues = useMemo(
    () => ({
      cart,
      onCartSubmit,
      onCartEdit,
      onCartDelete,
      clearCart
    }),
    [cart, onCartSubmit, onCartEdit, onCartDelete,clearCart]
  );

  return (
    <CartContext.Provider value={cartContextValues}>
      {children}
    </CartContext.Provider>
  );
});