import React, { useContext } from 'react';
import { AuthContext } from '../Auth/Context/AuthContext';
import { Navigate } from 'react-router';
import StylishLoader from '../components/Loader/StylishLoader';

const PrivateRoute = ({children}) => {

    const {user, loading} = useContext(AuthContext);

    if(loading){
        return <StylishLoader></StylishLoader>
    }

    if (user){
        return children;
    }

    return <Navigate to="/admin-login" replace />
};

export default PrivateRoute;