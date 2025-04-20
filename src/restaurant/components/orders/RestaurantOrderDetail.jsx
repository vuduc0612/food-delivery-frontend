import React from 'react';
import { Row, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurantAuth } from '../../hooks/useRestaurantAuth';
import { useRestaurantOrderDetail } from '../../hooks/useRestaurantOrderDetail';
import { formatCurrency, formatDate } from '../../../shared/utils/formatUtils';
import OrderHeader from './components/OrderHeader';
import OrderInfo from './components/OrderInfo';
import CustomerInfo from './components/CustomerInfo';
import OrderItems from './components/OrderItems';
import OrderStatusActions from './components/OrderStatusActions';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import NotFoundState from './components/NotFoundState';
import OrderStatusBadge from './components/OrderStatusBadge';

const RestaurantOrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { loading: authLoading, isAuthenticated } = useRestaurantAuth();
  const { order, loading, error, updateOrderStatus } = useRestaurantOrderDetail(orderId);

  // Kiểm tra đăng nhập
  if (!isAuthenticated && !authLoading) {
    navigate('/merchan-login');
  }

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const success = await updateOrderStatus(newStatus);
      return success;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };

  const getStatusBadge = (status) => {
    return <OrderStatusBadge status={status} />;
  };

  if (authLoading || loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState error={error} />;
  }

  if (!order) {
    return <NotFoundState />;
  }

  return (
    <Card className="shadow-sm">
      <OrderHeader orderId={order.id} />
      <Card.Body>
        <Row>
          <OrderInfo 
            order={order} 
            formatDate={formatDate} 
            getStatusBadge={getStatusBadge} 
          />
          <CustomerInfo order={order} />
        </Row>

        <hr className="my-4" />

        <OrderItems 
          items={order.items} 
          totalPrice={order.total_price} 
          formatCurrency={formatCurrency} 
        />

        <OrderStatusActions 
          order={order} 
          handleUpdateStatus={handleUpdateStatus} 
        />
      </Card.Body>
    </Card>
  );
};

export default RestaurantOrderDetail;