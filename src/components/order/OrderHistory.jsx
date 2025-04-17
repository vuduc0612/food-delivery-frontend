import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { BsChevronRight } from 'react-icons/bs';
import { FaClock, FaTruck, FaCheckCircle } from "react-icons/fa";
import { orderService } from "../../services/orderService";
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("da-giao");
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy dữ liệu đơn hàng khi component được mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getOrdersByUserCurrent();
        setOrders(response);
      } catch (err) {
        setError(err.message || 'Không thể tải danh sách đơn hàng');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // URL ảnh mặc định cho món ăn
  const defaultImageUrl = "https://c8.alamy.com/comp/2YCF22X/pizza-cartoon-vector-icon-fast-food-concept-isolated-in-flat-design-2YCF22X.jpg";

  // Lọc đơn hàng theo tab và tìm kiếm
  const filteredOrders = orders.filter(order => {
    // Lọc theo tab
    if (activeTab === "chua-giao") {
      return order.status === "PENDING";
    } else if (activeTab === "dang-giao") {
      return order.status === "OUT_FOR_DELIVERY";
    } else if (activeTab === "da-giao") {
      return order.status === "DELIVERED";
    }

    // Nếu có từ khóa tìm kiếm
    if (searchTerm) {
      return order.restaurant?.toLowerCase().includes(searchTerm.toLowerCase());
    }

    return true;
  });

  // Format date from ISO string to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  // Format time from ISO string to HH:MM
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Xử lý chuyển hướng đến trang chi tiết đơn hàng
  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <div className="bg-white">
      <Container className="py-4">
        {/* Tabs và Search */}
        <Row className="align-items-center mb-5">
          <Col md={8} className="mb-3 mb-md-0">
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant={activeTab === "da-giao" ? "success" : "outline-secondary"}
                className="d-flex align-items-center rounded-pill px-1 py-1 small"
                onClick={() => setActiveTab("da-giao")}
              >
                <FaCheckCircle className="me-1" style={{ fontSize: "12px" }} />
                <span style={{ fontSize: "12px" }}>ĐÃ GIAO</span>
              </Button>
              <Button
                variant={activeTab === "dang-giao" ? "primary" : "outline-secondary"}
                className="d-flex align-items-center rounded-pill px-2 py-1 small"
                onClick={() => setActiveTab("dang-giao")}
              >
                <FaTruck className="me-1" style={{ fontSize: "12px" }} />
                <span style={{ fontSize: "12px" }}>ĐANG GIAO</span>
              </Button>
              <Button
                variant={activeTab === "chua-giao" ? "primary" : "outline-secondary"}
                className="d-flex align-items-center rounded-pill px-2 py-1 small"
                onClick={() => setActiveTab("chua-giao")}
              >
                <FaClock className="me-1" style={{ fontSize: "12px" }} />
                <span style={{ fontSize: "12px" }}>CHƯA GIAO</span>
              </Button>
              
            </div>
          </Col>

          <Col md={4}>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Tìm món ăn hoặc nhà hàng"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ borderRadius: 10, paddingRight: "45px", border: "1px solid #ddd", height: "34px", fontSize: "16px" }}
                className="shadow-sm w-100"
              />
              <span
                className="position-absolute"
                style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#888"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </Col>
        </Row>

        {/* Danh sách đơn hàng */}
        <div>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 text-muted">Đang tải đơn hàng...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <p className="text-danger">{error}</p>
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => window.location.reload()}
              >
                Thử lại
              </Button>
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div 
                key={order.id} 
                className="mb-3 bg-white shadow-sm hover-effect" 
                style={{ borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => handleOrderClick(order.orderId)}
              >
                <div className="p-3">
                  <Row>
                    {/* Cột trái - Logo & Thông tin */}
                    <Col xs={3} md={2} className="mb-3 mb-md-0">
                      <div className="d-flex align">
                        <div style={{ width: '55px' }}>
                          <img
                            src={order.imageUrl || defaultImageUrl}
                            alt="Food icon"
                            style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                          />
                        </div>
                        <div>
                          <div className="text-muted small">
                            {order.createdAt ? formatDate(order.createdAt) : '--/--/----'} | {order.createdAt ? formatTime(order.createdAt) : '--:--'}
                          </div>
                          <div className="text-muted small" style={{ fontSize: '11px' }}>
                            Mã đơn: {order.orderCode || order.orderId}
                          </div>
                        </div>
                      </div>
                    </Col>

                    {/* Cột giữa - Thông tin nhà hàng */}
                    <Col xs={6} md={8}>
                      <div className="mb-2">
                        <div className="fw-medium">
                          {order.restaurantName || "Nhà hàng chưa xác định"}
                        </div>
                      </div>
                      <div className="text-muted small">
                        {order.orderDetailResponses?.length || 0} phần • {formatPrice(order.totalAmount || 0)}
                      </div>
                    </Col>

                    {/* Cột phải - Trạng thái */}
                    <Col xs={3} md={2} className="text-end d-flex flex-column justify-content-between">
                      <div className="d-flex align-items-center justify-content-end">
                        <span
                          className="small py-1 px-2"
                          style={{
                            borderRadius: '4px',
                            fontSize: '12px',
                            backgroundColor:
                              order.status === "DELIVERED"
                                ? "#e3fcec"
                                : order.status === "OUT_FOR_DELIVERY"
                                ? "#fff8e1"
                                : order.status === "PENDING"
                                ? "#fceef3"
                                : "#f5f5f5",
                            color:
                              order.status === "DELIVERED"
                                ? "#27ae60"
                                : order.status === "OUT_FOR_DELIVERY"
                                ? "#e67e22"
                                : order.status === "PENDING"
                                ? "#e84393"
                                : "#999999"
                          }}
                        >
                          {order.status === "DELIVERED" 
                            ? "GIAO THÀNH CÔNG" 
                            : order.status === "OUT_FOR_DELIVERY" 
                            ? "ĐANG GIAO" 
                            : order.status === "PENDING"
                            ? "CHƯA GIAO"
                            : order.status || "KHÔNG XÁC ĐỊNH"}
                        </span>
                        <BsChevronRight className="ms-2 text-muted" style={{ fontSize: '10px' }} />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">Không tìm thấy đơn hàng nào</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default OrderHistory;