import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { LocationProvider } from './contexts/LocationContext';
import Header from './components/layout/Header';
import Cart from './components/cart/Cart';
import AppRoutes from './routes';
import './index.css';

const AppContent = () => {
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

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LocationProvider>
          <CartProvider>
            <OrderProvider>
              <AppContent />
            </OrderProvider>
          </CartProvider>
        </LocationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App; 