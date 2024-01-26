import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    console.log('userId from AuthContext:', userId);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};