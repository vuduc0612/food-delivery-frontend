import React, { createContext, useContext, useState } from 'react';
import { orderService } from '../services/orderService';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.createOrder(orderData);
      setCurrentOrder(response);
      return response;
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const applyPromoCode = async (code) => {
    try {
      setError(null);
      const response = await orderService.applyPromoCode(code);
      setPromoDiscount(response.discount);
      return response;
    } catch (err) {
      setError(err.message || 'Mã giảm giá không hợp lệ');
      return null;
    }
  };

  const value = {
    loading,
    error,
    currentOrder,
    promoDiscount,
    createOrder,
    applyPromoCode
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}; 