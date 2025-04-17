import { Container, Card, Row, Col, Badge, ListGroup } from "react-bootstrap"
import { GeoAltFill, Shop } from "react-bootstrap-icons"
import useOrder from "../../hooks/useOrder";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../restaurant/common/Error";
import Loader from "../restaurant/common/Loader";


const OrderDetail = () => {
  const { id } = useParams();
  const { loading, error, fetchOrderById } = useOrder();
  const [orderData, setOrderData] = useState(null);
  const defaultImageUrl = "https://c8.alamy.com/comp/2YCF22X/pizza-cartoon-vector-icon-fast-food-concept-isolated-in-flat-design-2YCF22X.jpg";

  useEffect(() => {
    const getOrderDetails = async () => {
      if (!id) return;
      
      try {
        const data = await fetchOrderById(id);
        setOrderData(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };

    getOrderDetails();
  }, [id]);

  if (loading) {
    return <Loader message="Đang tải thông tin đơn hàng..." />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!orderData) {
    return <Error error="Không tìm thấy thông tin đơn hàng" />;
  }

  const formatPrice = (price) => {
    return `${(price*1000).toLocaleString("vi-VN")}đ`
  }

  return (
    <Container className="my-4">
      <Card className="order-card">
        <Card.Body>
          {/* Order Header */}
          <Row className="mb-3 align-items-center">
            <Col xs={1}>
              <div>
                <img src={defaultImageUrl} alt="Restaurant" className="rounded" 
                style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                />
              </div>
            </Col>
            <Col xs={7}>
              <div className="order-date">
                <strong>
                  {new Date(orderData.createdAt).toLocaleDateString('vi-VN')} | {new Date(orderData.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </strong>
                <div className="text-muted small">Mã đơn hàng: {orderData.orderId}</div>
              </div>
            </Col>
            <Col xs={4} className="text-end">
              <Badge className="success-badge">
                {orderData.status === "DELIVERED" ? "GIAO THÀNH CÔNG" : 
                 orderData.status === "OUT_FOR_DELIVERY" ? "ĐANG GIAO" :
                 orderData.status === "PENDING" ? "CHƯA GIAO" : orderData.status}
              </Badge>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col>
              <h5>{orderData.restaurantName}</h5>
              <div className="text-muted small">
                {orderData.orderDetailResponses?.length || 0} phần · {formatPrice(orderData.totalAmount)}
              </div>
            </Col>
          </Row>

          {/* Order Items */}
          <ListGroup variant="flush" className="order-items">
            {orderData.orderDetailResponses?.map((item) => (
              <ListGroup.Item key={item.id} className="px-0 py-2 border-bottom">
                <Row className="align-items-center">
                  <Col xs={2}>
                    <img src={item.thumbnail} alt={item.dishName} className="item-image" />
                  </Col>
                  <Col xs={7}>
                    <div className="item-quantity">
                      {item.quantity}X {item.dishName}
                    </div>
                    <div className="item-price">{formatPrice(item.totalPrice || 0)}</div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Order Summary */}
          <div className="order-summary mt-3">
            <Row className="mb-2">
              <Col>Tạm tính ({orderData.orderDetailResponses?.length || 0} phần)</Col>
              <Col xs="auto" className="text-end">
                {formatPrice(orderData.totalAmount)}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                Phí áp dụng <span className="info-icon">ⓘ</span>
              </Col>
              <Col xs="auto" className="text-end">
                {formatPrice(35000)}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>Giảm 40K, thêm nhiều ưu đãi</Col>
              <Col xs="auto" className="text-end discount-text">
                -{formatPrice(40000)}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>Giảm 2K phí giao hàng</Col>
              <Col xs="auto" className="text-end discount-text">
                -{formatPrice(2000)}
              </Col>
            </Row>
            <Row className="mt-3 total-row">
              <Col>
                Trả qua tiền mặt <span className="money-icon">💵</span>
              </Col>
              <Col xs="auto" className="text-end total-price">
                {formatPrice(orderData.totalAmount)}
              </Col>
            </Row>
          </div>

          {/* Restaurant and Delivery Address */}
          <div className="address-section mt-4">
            <Row className="mb-3 align-items-start">
              <Col xs={1} className="pe-0">
                <Shop className="address-icon" />
              </Col>
              <Col>
                <div className="fw-bold">{orderData.restaurantName}</div>
                <div className="text-muted small">Địa chỉ nhà hàng</div>
              </Col>
            </Row>
            <Row className="align-items-start">
              <Col xs={1} className="pe-0">
                <GeoAltFill className="address-icon" />
              </Col>
              <Col>
                <div className="fw-bold">Địa chỉ giao hàng</div>
                <div className="text-muted small">{orderData.deliveryAddress}</div>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default OrderDetail
