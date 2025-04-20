import { Routes, Route } from 'react-router-dom';
import RestaurantList from './customer/components/restaurants/RestaurantList';
import RestaurantDetail from './customer/components/restaurants/RestaurantDetail';
import CheckoutPage from './customer/components/checkout/CheckoutPage';
import OrderSuccess from './customer/components/orders/OrderSuccess';
import Profile from './customer/components/profile/Profile';
import OrderHistory from './customer/components/orders/OrderHistory';
import OrderDetail from './customer/components/orders/OrderDetail';
import VnpayReturnPage from './customer/components/checkout/VnPayReturnPage';

// Import routes merchant
import RestaurantDashboard from './restaurant/components/dashboard/RestaurantDashboard';
import RestaurantOrders from './restaurant/components/orders/RestaurantOrders';
import RestaurantOrderDetail from './restaurant/components/orders/RestaurantOrderDetail';
import RestaurantDishes from './restaurant/components/dishes/RestaurantDishes';
import DishForm from './restaurant/components/dishes/DishForm';
import RestaurantLogin from './restaurant/auth/RestaurantLogin';
import RestaurantLayout from './restaurant/components/layout/RestaurantLayout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/" element={<RestaurantList />} />
      <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/vnpay-return" element={<VnpayReturnPage />} />
      
      {/* Restaurant/Merchant Routes */}
      <Route path="/merchant-login" element={<RestaurantLogin />} />
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
    </Routes>
  );
};

export default AppRoutes;