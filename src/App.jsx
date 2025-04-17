import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import { CartProvider, useCart } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { LocationProvider } from './contexts/LocationContext';
import Header from './components/layout/Header';
import Cart from './components/cart/Cart';
import AppRoutes from './routes';
import RestaurantLogin from './components/restaurant/RestaurantLogin';
import RestaurantDashboard from './components/restaurant/dashboard/RestaurantDashboard';
import RestaurantOrders from './components/restaurant/orders/RestaurantOrders';
import RestaurantOrderDetail from './components/restaurant/orders/RestaurantOrderDetail';
import RestaurantLayout from './components/restaurant/layout/RestaurantLayout';
import './index.css';
import { RestaurantAuthProvider } from './contexts/RestaurantAuthContext';

// Layout cho các trang khách hàng (có header và cart)
const CustomerLayout = () => {
  const { isOpen, toggleCart, items } = useCart();
  
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <Cart isOpen={isOpen} onClose={toggleCart} cartItems={items} />
      <main className="flex-grow-1">
        <AppRoutes />
      </main>
    </div>
  );
};

// Layout cho các trang nhà hàng
const RestaurantRoutes = () => {
  return (
    <Routes>
      <Route path="/merchan-login" element={<RestaurantLogin />} />
      <Route path="/merchan" element={<Navigate to="/merchan/dashboard" replace />} />
      <Route path="/merchan/dashboard" element={
        <RestaurantLayout>
          <RestaurantDashboard />
        </RestaurantLayout>
      } />
      <Route path="/merchan/orders" element={
        <RestaurantLayout>
          <RestaurantOrders />
        </RestaurantLayout>
      } />
      <Route path="/merchan/orders/:orderId" element={
        <RestaurantLayout>
          <RestaurantOrderDetail />
        </RestaurantLayout>
      } />
      <Route path="/merchan/*" element={
        <RestaurantLayout>
          <RestaurantDashboard />
        </RestaurantLayout>
      } />
    </Routes>
  );
};

// Component để quyết định sử dụng layout nào
const AppContent = () => {
  const location = useLocation();
  
  // Kiểm tra xem đường dẫn hiện tại có phải là trang nhà hàng không
  const isRestaurantPage = location.pathname === '/merchan-login' || location.pathname.startsWith('/merchan/');
  
  return isRestaurantPage ? <RestaurantRoutes /> : <CustomerLayout />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <RestaurantAuthProvider>
          <LocationProvider>
            <CartProvider>
              <OrderProvider>
                <AppContent />
              </OrderProvider>
            </CartProvider>
          </LocationProvider>
        </RestaurantAuthProvider>
      </AuthProvider>
    </Router>
  );
};

export default App; 