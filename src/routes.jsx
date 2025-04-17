import { Routes, Route } from 'react-router-dom';
import RestaurantList from './components/restaurant/RestaurantList';
import RestaurantDetail from './components/restaurant/RestaurantDetail';
import CheckoutPage from './components/checkout/CheckoutPage';
import OrderSuccess from './components/order/OrderSuccess';
import Profile from './components/profile/Profile';
import Orders from './components/order/Orders';
import VnpayReturnPage from './components/checkout/VnPayReturnPage';
import OrderHistory from './components/order/OrderHistory';
import OrderDetail from './components/order/OrderDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/vnpay-return" element={<VnpayReturnPage />} />
    </Routes>
  );
};

export default AppRoutes;