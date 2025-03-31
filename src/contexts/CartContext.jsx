import { createContext, useContext, useEffect, useState } from 'react';
import {
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
  getCart1,
} from '../services/cartService';
import { useAuth } from '../hooks/useAuth';
import { getAuthToken } from '../utils/authToken';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotalAmount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const cartData = await getCart1(token);
      //console.log("Cart Data from API:", cartData);

      if (cartData && Array.isArray(cartData.items)) {
        setItems(cartData.items);
        setTotalAmount(cartData.totalAmount || 0);
      } else {
        console.warn("Invalid cart data format:", cartData);
        setItems([]);
        setTotalAmount(0);
      }
    } catch (err) {
      console.error('Lỗi lấy giỏ hàng:', err);
      setError('Không thể lấy thông tin giỏ hàng');
      setItems([]);
      setTotalAmount(0);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (dish) => {
    if (!isAuthenticated) {
      setError('Vui lòng đăng nhập để thêm món vào giỏ hàng');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Dish:", dish);
      await apiAddToCart(dish.id, 1);
      await fetchCart();
    } catch (err) {
      console.error('Lỗi thêm vào giỏ hàng:', err);
      setError('Không thể thêm món vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (dishId, quantity) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      await updateCartItem(dishId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('Lỗi cập nhật số lượng:', err);
      setError('Không thể cập nhật số lượng');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (dishId) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      await removeCartItem(dishId);
      await fetchCart();
    } catch (err) {
      console.error('Lỗi xóa món:', err);
      setError('Không thể xóa món khỏi giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const toggleCart = () => setIsOpen(prev => !prev);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setItems([]);
      setTotalAmount(0);
    }
  }, [isAuthenticated]);

  const value = {
    isOpen,
    items,
    totalAmount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
