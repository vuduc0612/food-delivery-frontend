import React, { createContext, useEffect, useState } from 'react';
import { getAuthToken, setAuthToken, removeAuthToken } from '../utils/authToken';
import { getProfile, loginApi, registerApi, verifyOtpApi } from '../services/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // loading khi khởi tạo app
    const [error, setError] = useState(null);
    const [registeredUser, setRegisteredUser] = useState(null); // Lưu thông tin người dùng đăng ký để xác thực OTP

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
            if(err.status === 401){
                setError("Tài khoản hoặc mật khẩu không chính xác!");
            } else {
                setError("Đăng nhập thất bại!");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setError(null);
            setLoading(true);
            await registerApi(userData);
            // Lưu thông tin người dùng để xác thực OTP sau này
            setRegisteredUser(userData);
            return true;
        } catch (err) {
            if(err.status === 409){
                setError("Tài khoản đã tồn tại!");
            } else {
                setError("Đăng ký thất bại!");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (otp) => {
        if (!registeredUser) {
            setError("Không có thông tin đăng ký!");
            return false;
        }

        try {
            setError(null);
            setLoading(true);
            await verifyOtpApi(registeredUser, otp);
            return true;
        } catch (err) {
            setError("Xác thực OTP thất bại!");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const clearRegisteredUser = () => {
        setRegisteredUser(null);
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
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            error, 
            setError, 
            login, 
            register, 
            verifyOtp,
            registeredUser,
            clearRegisteredUser,
            logout, 
            isAuthenticated: !!user 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
