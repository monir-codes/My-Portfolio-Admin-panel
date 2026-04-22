import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../Firebase/firebase.init';
import { AuthContext } from '../Context/AuthContext';
const AuthProvider = ({children}) => {

const provider = new GoogleAuthProvider();
const [user, setUser] = useState(null);
const [_loading, setLoading] = useState(true);

const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  
};

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
        setUser(currentUser);
        setLoading(false);
    });
    return () => unsubscribe();
}, []);

const authData = {
    user,
    setUser,
    loading: _loading,
    signInWithGoogle
}

return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
);};

export default AuthProvider;