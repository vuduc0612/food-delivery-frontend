import React, { createContext, useEffect, useState } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/authToken';
import { getProfile, loginApi, registerApi } from '../services/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // loading khi khởi tạo app
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const token = await loginApi(email, password);
            console.log("Login Token:", token);
            setAuthToken(token);
            const userData = await getProfile();
            setUser(userData);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            await registerApi(email, password);
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeAuthToken();
        setUser(null);
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = getAuthToken();

            if (token) {
                try {
                    setAuthToken(token); // gắn vào axios
                    const userData = await getProfile(token);
                    setUser(userData);

                } catch {
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, error, setError, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
