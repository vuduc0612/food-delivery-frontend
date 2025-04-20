import { Container, Card, Row, Col, Badge, ListGroup } from "react-bootstrap"
import { GeoAltFill, Shop } from "react-bootstrap-icons"
import useOrder from "../../hooks/useOrder";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "../../../shared/components/common/Error";
import Loader from "../../../shared/components/common/Loader";


const OrderDetail = () => {
  const { id } = useParams();
  const { loading, error, fetchOrderById } = useOrder();
  const [orderData, setOrderData] = useState(null);
  const defaultImageUrl = "https://c8.alamy.com/comp/2YCF22X/pizza-cartoon-vector-icon-fast-food-concept-isolated-in-flat-design-2YCF22X.jpg";

  // Memoize fetchOrderById để tránh re-render không cần thiết
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
    return `${(price*1).toLocaleString("vi-VN")}đ`
  }

  return (
    <Container  className="my-4">
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
                  {new Date(orderData.order_time).toLocaleDateString('vi-VN')} | {new Date(orderData.order_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </strong>
                <div className="text-muted small">Mã đơn hàng: {orderData.id}</div>
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
              <h5>{orderData.restaurant?.name || "Nhà hàng chưa xác định"}</h5>
              <div className="text-muted small">
                {orderData.items?.length || 0} phần · {formatPrice(orderData.total_price)}
              </div>
            </Col>
          </Row>

          {/* Order Items */}
          <ListGroup variant="flush" className="order-items">
            {orderData.items?.map((item) => (
              <ListGroup.Item key={item.id} className="px-0 py-2 border-bottom">
                <Row className="align-items-center">
                  <Col xs={2}>
                    <img src={item.thumbnail} alt={item.dish_name} className="item-image" />
                  </Col>
                  <Col xs={7}>
                    <div className="item-quantity">
                      {item.quantity}X {item.dish_name}
                    </div>
                    <div className="item-price">{formatPrice(item.totalPrice*1000 || 0)}</div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Order Summary */}
          <div className="order-summary mt-3">
            <Row className="mb-2">
              <Col>Tạm tính ({orderData.items?.length || 0} phần)</Col>
              <Col xs="auto" className="text-end">
                {formatPrice(orderData.total_price)}
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                Phí áp dụng <span className="info-icon">ⓘ</span>
              </Col>
              <Col xs="auto" className="text-end">
                {formatPrice(orderData.delivery_fee || 20000)}
              </Col>
            </Row>
            {/* <Row className="mb-2">
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
            </Row> */}
            <Row className="mt-3 total-row">
              <Col>
                Trả qua tiền mặt <span className="money-icon">💵</span>
              </Col>
              <Col xs="auto" className="text-end total-price">
                {formatPrice(orderData.total_price + (orderData.delivery_fee || 20000))}
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
                <div className="fw-bold">{orderData.restaurant?.name || "Nhà hàng chưa xác định"}</div>
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
