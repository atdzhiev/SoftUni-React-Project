import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';


const Logout = () => {
    const { onLogout } = useContext(AuthContext);

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Navigate to="/" /> 
};

export default Logout;