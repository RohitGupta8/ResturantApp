import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext with default values
const AuthContext = createContext({
    userData: null,
    setUserData: () => {}
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
