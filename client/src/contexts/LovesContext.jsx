import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  memo,
} from "react";

import * as lovesService from "../services/lovesService";
import { AuthContext } from "./AuthContext";
import { useError } from "./ErrorContext"; 

export const LovesContext = createContext();

export const LovesProvider = memo(({ children }) => {
  const { userId } = useContext(AuthContext);
  const { addError } = useError(); 
  const [loves, setLoves] = useState([]);

 
  useEffect(() => {
    if (!userId) return;

    lovesService
      .getOwnLoves(userId)
      .then((result) => {
        if (result) {
          setLoves(result);
        }
      })
      .catch((err) => {
        if (err.code === 404 || err.message.includes("404")) {
         
          setLoves([]);
        } else {
          addError(err.message);
        }
      });
  }, [userId, addError]);

  
  const onClickLove = useCallback(
    async (productId) => {
      try {
        const newLove = await lovesService.love(productId);
        setLoves((state) => [...state, newLove]);
      } catch (error) {
        addError(error.message);
      }
    },
    [addError]
  );

  
  const onLoveDelete = useCallback(
    async (loveId) => {
       try {
        await lovesService.remove(loveId);
        setLoves((state) => state.filter((x) => x._id !== loveId));
      } catch (error) {
        addError(error.message);
      }
    },
    [addError]
  );

  const lovesContextValues = useMemo(
    () => ({
      loves,
      onClickLove,
      onLoveDelete,
    }),
    [loves, onClickLove, onLoveDelete]
  );

  return (
    <LovesContext.Provider value={lovesContextValues}>
      {children}
    </LovesContext.Provider>
  );
});