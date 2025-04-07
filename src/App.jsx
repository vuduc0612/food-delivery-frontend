import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetail from './components/restaurant/RestaurantDetail';
import CheckoutPage from './components/checkout/CheckoutPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import Cart from './components/cart/Cart';
import { useCart } from './contexts/CartContext';

const AppContent = () => {
  const { isOpen, toggleCart, items } = useCart();
  
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />
      <Cart isOpen={isOpen} onClose={toggleCart} cartItems={items} />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <AppContent />
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
