import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';


import { CartProvider, useCart } from './customer/contexts/CartContext';
import { OrderProvider } from './customer/contexts/OrderContext';
import { LocationProvider } from './customer/contexts/LocationContext';
import Header from './customer/components/layout/Header';
import Cart from './customer/components/cart/Cart';
import AppRoutes from './routes';

import RestaurantDashboard from './restaurant/components/dashboard/RestaurantDashboard';
import RestaurantOrders from './restaurant/components/orders/RestaurantOrders';
import RestaurantOrderDetail from './restaurant/components/orders/RestaurantOrderDetail';
import RestaurantLayout from './restaurant/components/layout/RestaurantLayout';
import RestaurantDishes from './restaurant/components/dishes/RestaurantDishes';
import DishForm from './restaurant/components/dishes/DishForm';
import './index.css';
import { RestaurantAuthProvider } from './restaurant/contexts/RestaurantAuthContext';
import { AuthProvider } from './customer/contexts/AuthContext';
import RestaurantLogin from './restaurant/auth/RestaurantLogin';

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
      <Route path="/merchant-login" element={<RestaurantLogin />} />
      <Route path="/merchant" element={<Navigate to="/merchant/dashboard" replace />} />
      <Route path="/merchant/dashboard" element={
        <RestaurantLayout>
          <RestaurantDashboard />
        </RestaurantLayout>
      } />
      <Route path="/merchant/orders" element={
        <RestaurantLayout>
          <RestaurantOrders />
        </RestaurantLayout>
      } />
      <Route path="/merchant/orders/:orderId" element={
        <RestaurantLayout>
          <RestaurantOrderDetail />
        </RestaurantLayout>
      } />
      {/* Routes cho quản lý món ăn */}
      <Route path="/merchant/dishes" element={
        <RestaurantLayout>
          <RestaurantDishes />
        </RestaurantLayout>
      } />
      <Route path="/merchant/dishes/add" element={
        <RestaurantLayout>
          <DishForm />
        </RestaurantLayout>
      } />
      <Route path="/merchant/dishes/edit/:dishId" element={
        <RestaurantLayout>
          <DishForm />
        </RestaurantLayout>
      } />
      <Route path="/merchant/*" element={
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
  const isRestaurantPage = location.pathname === '/merchant-login' || location.pathname.startsWith('/merchant/');
  
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