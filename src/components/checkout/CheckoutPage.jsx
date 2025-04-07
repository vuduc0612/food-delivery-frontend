import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsPlus, BsGeoAlt, BsTrash, BsPencil } from 'react-icons/bs';
import { useCart } from '../../contexts/CartContext';
import { useOrder } from '../../contexts/OrderContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeFromCart, restaurant, user } = useCart();
  const { createOrder, loading, error } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    // TODO: Implement promo code logic
    setPromoError('Mã giảm giá không hợp lệ');
  };

  const handlePayment = async (e) => {
    try {
      console.log("user address", user?.address);
      setAddress(user?.address);
      await createOrder({
        items,
        address,
        note,
        paymentMethod,
        promoCode: promoCode || undefined
      });
      navigate('/order-success');
    } catch (err) {
      console.error('Lỗi khi tạo đơn hàng:', err);
    }
  };

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
            <Card className="delivery-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Giao tới</h5>
                  <Button variant="link" className="p-0 text-decoration-none">
                    <BsPencil className="me-1" />
                    Chỉnh sửa
                  </Button>
                </div>
                <div className="delivery-address">
                  <div className="address-icon">
                    <BsGeoAlt />
                  </div>
                  <div className="address-content">
                    
                    <div className="user-address">{user?.address}</div>
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

            <Card className="order-items-card">
              <Card.Body>
                <div className="order-items-header">
                  <h5>Đơn hàng</h5>
                  <Button
                    variant="link"
                    className="add-more-btn p-0"
                    onClick={() => navigate(`/restaurant/${restaurant?.id}`)}
                  >
                    <BsPlus />
                    Thêm món
                  </Button>
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
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.dishId, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        className="quantity-btn"
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
                      <option value="zalo">
                        💳 ZaloPay
                      </option>
                      <option value="momo">
                        💳 Momo
                      </option>
                      <option value="card">
                        💳 Thẻ ngân hàng
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
                    <span>20.000đ</span>
                  </div>
                  <div className="summary-row total">
                    <span>Tổng số tiền</span>
                    <span>{(totalAmount * 1000 + 20000).toLocaleString()}đ</span>
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