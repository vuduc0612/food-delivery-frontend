import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { orderService } from '../../services/orderService';
import { useCart } from '../../contexts/CartContext';

const VnpayReturnPage = () => {
  const {clearCart} = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Gọi API backend để kiểm tra thanh toán
        const queryString = location.search.substring(1); // Loại bỏ dấu ? ở đầu
        console.log("queryString", queryString);
        // Chuyển đổi queryString thành object
        const searchParams = new URLSearchParams(queryString);
        const paymentData = Object.fromEntries(searchParams.entries());
        const response = await orderService.callbackPayment(paymentData);
        console.log("response", response);
        if(response.success) {
          clearCart();
          setPaymentStatus({
            success: true,
            message: response.message
          });
        }else{
          setPaymentStatus({
            success: false,
            message: response.message
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi xác minh thanh toán:', error);
        setPaymentStatus({
          success: false,
          message: 'Có lỗi xảy ra khi xác minh thanh toán'
        });
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location]);

  const handleContinue = () => {
    if (paymentStatus && paymentStatus.success) {
      navigate('/order-success');
    } else {
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
        <p className="mt-3">Đang xác thực thanh toán...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="text-center p-5">
        {paymentStatus && paymentStatus.success ? (
          <>
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
            </div>
            <h3 className="mb-3">Thanh toán thành công</h3>
            <p className="text-muted">Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được thanh toán.</p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }}></i>
            </div>
            <h3 className="mb-3">Thanh toán thất bại</h3>
            <p className="text-muted">{paymentStatus?.message || 'Đã xảy ra lỗi trong quá trình thanh toán'}</p>
            <p>Vui lòng thử lại hoặc chọn phương thức thanh toán khác.</p>
          </>
        )}

        <Button
          variant={paymentStatus && paymentStatus.success ? "primary" : "secondary"}
          className="mt-4"
          onClick={handleContinue}
        >
          {paymentStatus && paymentStatus.success ? 'Tiếp tục' : 'Quay lại thanh toán'}
        </Button>
      </Card>
    </Container>
  );
};

export default VnpayReturnPage;