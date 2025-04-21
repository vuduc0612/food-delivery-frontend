import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container, Button, Form, InputGroup, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRestaurantAuth } from '../../hooks/useRestaurantAuth';
import { 
  BarChart2, 
  ShoppingBag, 
  Menu, 
  Users,
  Calendar,
  Filter
} from 'lucide-react';

const RestaurantDashboard = () => {
  const { loading, error, isAuthenticated } = useRestaurantAuth();
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState('today');
  const [customRange, setCustomRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [showCustomRange, setShowCustomRange] = useState(false);

  // Xử lý thay đổi bộ lọc thời gian
  const handleDateFilterChange = (e) => {
    const value = e.target.value;
    setDateFilter(value);
    setShowCustomRange(value === 'custom');
  };

  // Xử lý thay đổi ngày tùy chỉnh
  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    setCustomRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý khi áp dụng bộ lọc
  const handleApplyFilter = () => {
    // Ở đây sẽ gọi API để lấy dữ liệu theo khoảng thời gian đã chọn
    console.log("Áp dụng bộ lọc thời gian:", dateFilter, customRange);
    // Gọi API hoặc cập nhật dữ liệu thống kê ở đây
  };

  // Định dạng hiển thị khoảng thời gian
  const getDateRangeText = () => {
    let result = 'Hôm nay';
    
    switch (dateFilter) {
      case 'today':
        result = 'Hôm nay';
        break;
      case 'yesterday':
        result = 'Hôm qua';
        break;
      case 'this_week':
        result = 'Tuần này';
        break;
      case 'last_week':
        result = 'Tuần trước';
        break;
      case 'this_month':
        result = 'Tháng này';
        break;
      case 'last_month':
        result = 'Tháng trước';
        break;
      case 'custom': {
        const start = new Date(customRange.startDate).toLocaleDateString('vi-VN');
        const end = new Date(customRange.endDate).toLocaleDateString('vi-VN');
        result = `${start} - ${end}`;
        break;
      }
      default:
        result = 'Hôm nay';
    }
    
    return result;
  };

  useEffect(() => {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isAuthenticated && !loading) {
      navigate('/merchant-login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Load dữ liệu thống kê khi bộ lọc thay đổi
  useEffect(() => {
    if (isAuthenticated && !loading) {
      handleApplyFilter();
    }
  }, [dateFilter, isAuthenticated, loading]);

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
            onClick={() => navigate('/merchant-login')}  
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
      {/* Bộ lọc thời gian */}
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 d-flex align-items-center">
              <Calendar size={20} className="me-2" /> 
              Thống kê: <Badge bg="info" className="ms-2">{getDateRangeText()}</Badge>
            </h5>
            <div className="d-flex align-items-center">
              <Form.Select 
                value={dateFilter}
                onChange={handleDateFilterChange}
                className="me-2"
                style={{ width: 'auto' }}
              >
                <option value="today">Hôm nay</option>
                <option value="yesterday">Hôm qua</option>
                <option value="this_week">Tuần này</option>
                <option value="last_week">Tuần trước</option>
                <option value="this_month">Tháng này</option>
                <option value="last_month">Tháng trước</option>
                <option value="custom">Tùy chỉnh</option>
              </Form.Select>
              <Button 
                variant="primary"
                onClick={handleApplyFilter}
                className="d-flex align-items-center"
              >
                <Filter size={16} className="me-1" /> Lọc
              </Button>
            </div>
          </div>
          
          {showCustomRange && (
            <Row className="mt-3">
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Từ ngày</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={customRange.startDate}
                    onChange={handleCustomDateChange}
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label>Đến ngày</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={customRange.endDate}
                    onChange={handleCustomDateChange}
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button 
                  variant="outline-primary" 
                  onClick={handleApplyFilter}
                  className="w-100"
                >
                  Áp dụng
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col md={3}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
                <ShoppingBag size={24} className="text-primary" />
              </div>
              <h2 className="mb-1">0</h2>
              <p className="text-muted mb-0">Đơn hàng {dateFilter === 'today' ? 'hôm nay' : ''}</p>
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
              <p className="text-muted mb-0">Doanh thu {dateFilter === 'today' ? 'hôm nay' : ''}</p>
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
              <p className="text-muted mb-0">Món ăn đã bán</p>
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
              <p className="text-muted mb-0">Khách hàng mới</p>
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
