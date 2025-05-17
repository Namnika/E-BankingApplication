// src/context/AuthContext.js
import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        return token && user ? { token, user: JSON.parse(user) } : null;
    });

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}