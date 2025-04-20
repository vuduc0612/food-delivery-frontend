import React, { createContext, useEffect, useState } from 'react';
import { 
    getRestaurantAuthToken, 
    setRestaurantAuthToken, 
    removeRestaurantAuthToken 
} from '../../shared/utils/restaurantAuthToken';
import { 
    loginRestaurantApi, 
    getRestaurantProfile, 
    registerRestaurantApi 
} from '../api/services/restaurantAuthService';

export const RestaurantAuthContext = createContext();

export const RestaurantAuthProvider = ({ children }) => {
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);
            const response = await loginRestaurantApi(email, password);
            console.log("Login Response:", response);
            
            // Lưu token vào cookie
            setRestaurantAuthToken(response.token || response);
            
            // Lấy thông tin nhà hàng
            const restaurantData = await getRestaurantProfile();
            console.log("Restaurant Data:", restaurantData);
            setRestaurant(restaurantData);
            
            return true;
        } catch (err) {
            console.error("Restaurant login error:", err);
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

    const register = async (restaurantData) => {
        try {
            setError(null);
            setLoading(true);
            await registerRestaurantApi(restaurantData);
            return true;
        } catch (err) {
            if(err.status === 409){
                setError("Nhà hàng đã tồn tại!");
            } else {
                setError("Đăng ký thất bại!");
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        removeRestaurantAuthToken();
        setRestaurant(null);
    };

    useEffect(() => {
        const initAuth = async () => {
            const token = getRestaurantAuthToken();

            if (token) {
                try {
                    const restaurantData = await getRestaurantProfile();
                    setRestaurant(restaurantData);
                } catch {
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    return (
        <RestaurantAuthContext.Provider value={{ 
            restaurant, 
            loading, 
            error, 
            setError, 
            login, 
            register,
            logout, 
            isAuthenticated: !!restaurant 
        }}>
            {children}
        </RestaurantAuthContext.Provider>
    );
};
