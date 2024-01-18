import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};