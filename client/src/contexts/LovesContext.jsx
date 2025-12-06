import { createContext, useState, useEffect, useContext, useMemo, useCallback, memo } from "react";

import * as lovesService from '../services/lovesService';
import { AuthContext } from "./AuthContext";

export const LovesContext = createContext();

export const LovesProvider = memo(({
    children,
}) => {
    const { userId } = useContext(AuthContext);
    const [loves, setLoves] = useState([])

    useEffect(() => {
        lovesService.getOwnLoves(userId)
            .then(result => {
                if (result) {
                    setLoves(result);
                }
            })
    }, [userId]);

    const onClickLove = useCallback (async (productId) => {
        let newLove = {};
        try {
            newLove = await lovesService.love(productId);
        } catch (error) {
            return alert(error.message);
        }
        setLoves(state => [...state, newLove]);
    }, []);

    const onLoveDelete = useCallback(async (loveId) => {
        const result = confirm("Are you sure you want to remove product?")
        try {
            if(result) {
                await lovesService.remove(loveId);
                setLoves(state => state.filter(x => x._id !== loveId));
            }
        } catch (error) {
            return alert(error.message);
        }
    }, []);

    const lovesContextValues = useMemo (() => ({
        loves,
        onClickLove,
        onLoveDelete,
    }), [loves, onClickLove, onLoveDelete])

    return (
        <LovesContext.Provider value={lovesContextValues}>
            {children}
        </LovesContext.Provider>
    );
});