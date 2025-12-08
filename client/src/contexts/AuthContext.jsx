import { createContext } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";

import * as authService from '../services/authService';
import { useError } from "../contexts/ErrorContext"

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user",{});
     const { addError } = useError(); 

    const isAdmin = Boolean(user.role === "admin");
    
    const onLogin = async (values) => {
        let newUser = {};
        try {
            newUser = await authService.login(values);
        } catch (error) {
            addError(error.message); 
            return;
        }
        setUser(newUser);
        navigate('/products');
    };
    
    const onLogout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            addError(error.message);
        }
        setUser({});
        localStorage.clear();
    };
    
    const onRegister = async (values) => {
        let newUser = {};
        const { repeatPassword, ...registerData } = values;
 
        try {
            if (repeatPassword !== registerData.password) {
                throw new Error ("Passwords don't match!")
            };

            newUser = await authService.register(registerData);
            
        } catch (error) {
            addError(error.message); 
            return;
        }
        setUser(newUser);
        navigate('/products');
    };

    const authContextValues = {
        onLogin,
        onLogout,
        onRegister,
        isAdmin,
        userId: user._id,
        token: user.accessToken,
        userEmail: user.email,
        isAuthenticated: !!user.accessToken,
    }
    
    return (
            <AuthContext.Provider value={authContextValues}>
                {children}
            </AuthContext.Provider>
    );
};