import React, { useEffect } from 'react';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRestaurantAuth } from '../../../hooks/useRestaurantAuth';
import { 
  BarChart2, 
  ShoppingBag, 
  Menu, 
  Users
} from 'lucide-react';

const RestaurantDashboard = () => {
  const { loading, error, isAuthenticated } = useRestaurantAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated && !loading) {
      navigate('/restaurant-login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <Container fluid className="p-0 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-2">Đang tải thông tin nhà hàng...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-0 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="bi bi-exclamation-triangle-fill fs-1"></i>
          </div>
          <h4>{error}</h4>
          <Button 
            variant="primary" 
            onClick={() => navigate('/merchan-login')}
            className="mt-3"
            style={{ backgroundColor: "#7ed6df", borderColor: "#7ed6df" }}
          >
            Đăng nhập lại
          </Button>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="p-0 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <div className="text-danger mb-3">
            <i className="bi bi-exclamation-triangle-fill fs-1"></i>
          </div>
          <h4>{error}</h4>
          <Button 
            variant="primary" 
            onClick={() => navigate('/merchan-login')}
            className="mt-3"
            style={{ backgroundColor: "#7ed6df", borderColor: "#7ed6df" }}
          >
            Đăng nhập lại
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Row className="g-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
                <ShoppingBag size={24} className="text-primary" />
              </div>
              <h2 className="mb-1">0</h2>
              <p className="text-muted mb-0">Đơn hàng mới</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-3">
                <BarChart2 size={24} className="text-success" />
              </div>
              <h2 className="mb-1">0₫</h2>
              <p className="text-muted mb-0">Doanh thu hôm nay</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 mb-3">
                <Menu size={24} className="text-warning" />
              </div>
              <h2 className="mb-1">0</h2>
              <p className="text-muted mb-0">Món ăn</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 mb-3">
                <Users size={24} className="text-info" />
              </div>
              <h2 className="mb-1">0</h2>
              <p className="text-muted mb-0">Khách hàng</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col md={8}>
          <Card>
            <Card.Header className="bg-white">
              <h5 className="mb-0">Đơn hàng gần đây</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-5">
                <p className="text-muted">Chưa có đơn hàng nào</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header className="bg-white">
              <h5 className="mb-0">Món ăn bán chạy</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-5">
                <p className="text-muted">Chưa có dữ liệu</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default RestaurantDashboard;
