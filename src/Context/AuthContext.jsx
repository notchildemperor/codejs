import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    const loginAsAdmin = () => {
        setIsAdmin(true);
    }

    const logOut = () => {
        setIsAdmin(false);
    }

    return (
        <AuthContext.Provider value={{ isAdmin, loginAsAdmin, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
