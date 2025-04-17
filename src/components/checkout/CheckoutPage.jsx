import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsPlus, BsGeoAlt, BsTrash, BsPencil } from 'react-icons/bs';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';
import { useLocation } from '../../contexts/LocationContext';
import { calculateDeliveryFee } from '../../services/deliveryService';
import { orderService } from '../../services/orderService';


const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeFromCart, restaurant, user, clearCart } = useCart();
  const { createOrder, loading, error } = useOrder();
  const { selectedLocation, setOnDeliveryFeeRecalculate } = useLocation();
  const [deliveryFee, setDeliveryFee] = useState(20000); // phí mặc định/fallback
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [note, setNote] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    setPromoCode("SAMPLE"); 
  };

  const calculateFee = useCallback(async (location) => {
    if (!restaurant || !location?.coordinates) return;
    // console.log("restaurant", restaurant.longitude, restaurant.latitude);
    const from = restaurant.longitude && restaurant.latitude 
      ? { lat: restaurant.latitude, lng: restaurant.longitude }
      : { lat: 20.995649, lng: 105.808653 };
    const to = location.coordinates;
    // console.log(from, to);
  
    const fee = await calculateDeliveryFee(from, to);
    setDeliveryFee(fee);
  }, [restaurant]);

  const handlePayment = async () => {
    try {
      // console.log("user address", selectedLocation);
      const deliveryAddr = selectedLocation?.address || user?.address || '';
      
      const response = await createOrder({
        deliveryAddress: deliveryAddr,
        note: note,
        paymentMethod: paymentMethod,
        isPaid: false,
        promoCode: promoCode || undefined,
        totalAmount: totalAmount*1000,
        feeShipping: Math.round(deliveryFee.fee),
        discount: 0,

      });
      
      console.log("response", response);
      if(response) {
        if(paymentMethod === 'cash') {
          clearCart();
          navigate('/order-success');
        } else {
          // Tạo URL thanh toán VNPAY
          const paymentResponse = await orderService.createPayment({
            amount: totalAmount*1000 + Math.round(deliveryFee.fee),
            bank_code: 'NCB',
            order_id: response.orderId
          });
          
          // Chuyển hướng đến trang thanh toán VNPAY
          // console.log("paymentResponse", paymentResponse);
          if(paymentResponse) {
            window.location.href = paymentResponse;
          } else {
            console.log(error)
          }
        }
      }
    } catch (err) {
      console.error('Lỗi khi tạo đơn hàng:', err);
    }
  };

  useEffect(() => {
    setOnDeliveryFeeRecalculate((location) => {
      calculateFee(location);
    });
  }, []);

  useEffect(() => {
    if (selectedLocation?.coordinates) {
      calculateFee(selectedLocation);
    }
  }, [selectedLocation, restaurant, calculateFee]);

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Card className="text-center p-5">
          <h4>Giỏ hàng trống</h4>
          <p className="text-muted">Vui lòng thêm món ăn vào giỏ hàng</p>
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <div className="checkout-page">
      <div className="restaurant-header" style={{ marginTop: '0' }}>
        <Container>
          <h2>{restaurant?.name || 'Nhà hàng'}</h2>
        </Container>
      </div>

      <Container>
        <Button
          variant="link"
          className="mb-4 p-0 text-decoration-none"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft className="me-2" />
          Quay lại
        </Button>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Row>
          <Col lg={8}>
            <Card className="delivery-card pt-0 px-3 py-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-2">Giao tới</h5>
                  {/* <Button variant="link" className="p-0 text-decoration-none">
                    <BsPencil className="me-1" />
                    Chỉnh sửa
                  </Button> */}
                </div>
                <div className="delivery-address">
                  <div className="address-icon">
                    <BsGeoAlt />
                  </div>
                  <div className="address-content">

                    <div className="user-address">{selectedLocation.address}</div>
                  </div>
                </div>
                <Form>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Ghi chú cho người giao hàng"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="address-input mt-3"
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            <Card className="order-items-card pt-1 pb-2 px-3">
              <Card.Body>
                <div className="order-items-header">
                  <h5>Đơn hàng</h5>
                  <a
                    href="#"
                    className="add-more-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/restaurant/${restaurant?.id}`);
                    }}
                  >
                    Thêm món
                  </a>
                </div>
                {items.map((item) => (
                  <div key={item.dishId} className="order-item">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h6 className="item-name">{item.name}</h6>
                      <div className="item-price">
                        {(item.price * 1000).toLocaleString()}đ
                      </div>
                    </div>
                    <div className="quantity-controls">
                      <Button
                        variant="outline-secondary"
                        className="quantity-btn p-0"
                        onClick={() => handleQuantityChange(item.dishId, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        className="quantity-btn p-0"
                        onClick={() => handleQuantityChange(item.dishId, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </Button>
                    </div>
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => removeFromCart(item.dishId)}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div className="payment-sidebar">
              <Card className="payment-card mb-3">
                <Card.Body>
                  <h5 className="mb-3">Hình thức thanh toán & ưu đãi</h5>

                  <div className="payment-method mb-3">
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="payment-select"
                    >
                      <option value="cash">
                        💵 Tiền mặt
                      </option>
                      <option value="vnpay">
                        💳 VnPay
                      </option>
                      <option value="momo">
                        💳 Momo
                      </option>

                    </Form.Select>
                  </div>

                  <div className="promo-section">
                    <div className="promo-input-group">
                      <div className="promo-label">
                        🎁 Mã khuyến mãi
                      </div>
                      <span
                        className="choose-promo-text"
                        onClick={handleApplyPromo}
                      >
                        Chọn mã
                      </span>
                    </div>

                  </div>
                  <div className="promo-hint mt-2">
                    Bạn có thể áp dụng nhiều mã giảm giá một lúc
                  </div>
                </Card.Body>
              </Card>

              <Card className="payment-summary-card">
                <Card.Body>
                  <h5 className="mb-3">Thanh toán</h5>
                  <div className="summary-row">
                    <span>Tạm tính (1 phần)</span>
                    <span>{(totalAmount * 1000).toLocaleString()}đ</span>
                  </div>
                  <div className="summary-row">
                    <span>Phí áp dụng</span>
                    <span>{(deliveryFee.fee)?.toLocaleString()}đ</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng số tiền</span>
                    <span>{(totalAmount * 1000 + deliveryFee.fee).toLocaleString()}đ</span>
                  </div>
                  <Button

                    className="checkout-btn w-100"
                    onClick={handlePayment}

                  >
                    {loading ? 'Đang xử lý...' : 'Đặt món'}
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage; 