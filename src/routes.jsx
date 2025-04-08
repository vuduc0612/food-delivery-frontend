import { Routes, Route } from 'react-router-dom';
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetail from './components/restaurant/RestaurantDetail';
import CheckoutPage from './components/checkout/CheckoutPage';
import OrderSuccess from './components/order/OrderSuccess';
import Profile from './components/profile/Profile';
import Orders from './components/order/Orders';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default AppRoutes; 