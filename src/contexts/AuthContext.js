import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "../axiosConfig"
// Create a Context for the auth state
const AuthContext = createContext();

// Provide AuthContext to components
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // Mock login function
    const login = async (email, password) => {
        try{
            const response= await axios.post("/auth/login", {email,password})
            localStorage.setItem('accesToken',response.data.token)
            setUser(response.data);
            return true
        }catch(error){
            console.error("Error logging in:", error)
            return false
        }
        
    };

    // Mock logout function
    const logout = async () => {
        try{
            await axios.post("/auth/logout",{})
            setUser(null)
        }catch(error){
            console.error('Error logging out:', error)
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
