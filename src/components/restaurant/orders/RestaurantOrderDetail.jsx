import React from 'react';
import { Row, Col, Card, Table, Badge, Button, Dropdown, Spinner, Alert } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useRestaurantAuth } from '../../../hooks/useRestaurantAuth';
import { useRestaurantOrderDetail } from '../../../hooks/useRestaurantOrderDetail';
import { 
  CheckCircle, 
  XCircle,
  Clock,
  Truck,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';



const RestaurantOrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { loading: authLoading, isAuthenticated } = useRestaurantAuth();
  const { order, loading, error, updateOrderStatus } = useRestaurantOrderDetail(orderId);

  // Kiểm tra đăng nhập
  if (!isAuthenticated && !authLoading) {
    navigate('/merchan-login');
  }

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(newStatus);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning" className="text-dark">Chờ xác nhận</Badge>;
      case 'confirmed':
        return <Badge bg="info">Đã xác nhận</Badge>;
      case 'processing':
        return <Badge bg="primary">Đang chuẩn bị</Badge>;
      case 'delivering':
        return <Badge bg="info" style={{ backgroundColor: '#17a2b8' }}>Đang giao</Badge>;
      case 'delivered':
        return <Badge bg="success">Đã giao</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Đã hủy</Badge>;
      default:
        return <Badge bg="secondary">Không xác định</Badge>;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .replace('₫', 'đ');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (authLoading || loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="danger" className="my-3">
        <Alert.Heading>Đã xảy ra lỗi!</Alert.Heading>
        <p>{error}</p>
        <Button 
          variant="outline-danger" 
          as={Link}
          to="/merchan/orders"
          className="mt-2"
        >
          Quay lại danh sách đơn hàng
        </Button>
      </Alert>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-5">
        <div className="text-danger mb-3">
          <XCircle size={48} />
        </div>
        <h4>Không tìm thấy đơn hàng</h4>
        <Button 
          variant="primary" 
          as={Link}
          to="/merchan/orders"
          className="mt-3"
        >
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Header className="bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            variant="light" 
            className="d-flex align-items-center p-0 border-0" 
            as={Link}
            to="/merchan/orders"
          >
            <ArrowLeft size={20} className="me-2" />
            <h5 className="mb-0">Chi tiết đơn hàng #{order.id}</h5>
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="mb-4 mb-md-0">
            <h6 className="mb-3">Thông tin đơn hàng</h6>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Mã đơn hàng:</div>
              <div className="fw-medium">{order.id}</div>
            </div>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Thời gian đặt:</div>
              <div>{formatDate(order.orderTime)}</div>
            </div>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Trạng thái:</div>
              <div>{getStatusBadge(order.status)}</div>
            </div>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Phương thức thanh toán:</div>
              <div>
                <Badge bg={order.paymentMethod === 'COD' ? 'light' : 'success'} className={order.paymentMethod === 'COD' ? 'text-dark border' : 'text-white'}>
                  {order.paymentMethod === 'COD' ? 'Tiền mặt khi nhận hàng' : 'Đã thanh toán qua ngân hàng'}
                </Badge>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <h6 className="mb-3">Thông tin khách hàng</h6>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Tên khách hàng:</div>
              <div className="fw-medium">{order.customerName}</div>
            </div>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Số điện thoại:</div>
              <div>{order.phone}</div>
            </div>
            <div className="mb-2 d-flex">
              <div className="text-muted" style={{ width: '150px' }}>Địa chỉ giao hàng:</div>
              <div>{order.address}</div>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <h6 className="mb-3">Danh sách món ăn</h6>
        <Table className="mb-0">
          <thead className="bg-light">
            <tr>
              <th>Món ăn</th>
              <th className="text-center">Số lượng</th>
              <th className="text-end">Đơn giá</th>
              <th className="text-end">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-end">{formatCurrency(item.price)}</td>
                <td className="text-end">{formatCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="text-end fw-bold">Tổng cộng:</td>
              <td className="text-end fw-bold">{formatCurrency(order.total)}</td>
            </tr>
          </tbody>
        </Table>

        <div className="mt-4 d-flex justify-content-end">
          <Dropdown align="end" className="me-2" disabled={order.status === 'delivered' || order.status === 'cancelled'}>
            <Dropdown.Toggle variant="primary" className="d-flex align-items-center" disabled={order.status === 'delivered' || order.status === 'cancelled'}>
              <span className="me-1">Cập nhật trạng thái</span>
              <ChevronDown size={14} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '200px' }}>
              {order.status === 'pending' && (
                <Dropdown.Item onClick={() => handleUpdateStatus(order.id, 'confirmed')} className="d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-success" />
                  <span>Xác nhận đơn</span>
                </Dropdown.Item>
              )}
              {order.status === 'confirmed' && (
                <Dropdown.Item onClick={() => handleUpdateStatus(order.id, 'processing')} className="d-flex align-items-center">
                  <Clock size={16} className="me-2 text-primary" />
                  <span>Bắt đầu chuẩn bị</span>
                </Dropdown.Item>
              )}
              {order.status === 'processing' && (
                <Dropdown.Item onClick={() => handleUpdateStatus(order.id, 'delivering')} className="d-flex align-items-center">
                  <Truck size={16} className="me-2 text-info" />
                  <span>Bắt đầu giao hàng</span>
                </Dropdown.Item>
              )}
              {order.status === 'delivering' && (
                <Dropdown.Item onClick={() => handleUpdateStatus(order.id, 'delivered')} className="d-flex align-items-center">
                  <CheckCircle size={16} className="me-2 text-success" />
                  <span>Xác nhận đã giao</span>
                </Dropdown.Item>
              )}
              {(order.status !== 'delivered' && order.status !== 'cancelled') && (
                <Dropdown.Item onClick={() => handleUpdateStatus(order.id, 'cancelled')} className="d-flex align-items-center">
                  <XCircle size={16} className="me-2 text-danger" />
                  <span>Hủy đơn</span>
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          
          <Button 
            variant="outline-secondary" 
            className="d-flex align-items-center"
            as={Link}
            to="/merchan/orders"
          >
            <span>Quay lại</span>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RestaurantOrderDetail;