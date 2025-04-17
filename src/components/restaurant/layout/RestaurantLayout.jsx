import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRestaurantAuth } from '../../../hooks/useRestaurantAuth';
import { 
  BarChart2, 
  ShoppingBag, 
  Menu, 
  Users, 
  Settings, 
  LogOut,
  Home,
  User,
  ChevronDown
} from 'lucide-react';
import { Dropdown } from 'react-bootstrap';

const RestaurantLayout = ({ children }) => {
  const { restaurant, logout } = useRestaurantAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/merchan-login');
  };

  // Kiểm tra đường dẫn hiện tại để highlight menu item tương ứng
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Container fluid className="p-0 min-vh-100 d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3 border-bottom border-secondary">
          <h5 className="mb-0 d-flex align-items-center">
            <span className="me-2">🍽️</span>
            <span>Quản lý nhà hàng</span>
          </h5>
        </div>
        
        <Nav className="flex-column mt-3">
          <Nav.Link 
            as={Link} 
            to="/merchan/dashboard" 
            className={`text-white d-flex align-items-center px-3 py-2 ${isActive('/merchan/dashboard') ? 'active' : ''}`}
          >
            <Home size={18} className="me-2" />
            <span>Tổng quan</span>
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/merchan/orders" 
            className={`text-white d-flex align-items-center px-3 py-2 ${isActive('/merchan/orders') ? 'active' : ''}`}
          >
            <ShoppingBag size={18} className="me-2" />
            <span>Đơn hàng</span>
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/merchan/menu" 
            className={`text-white d-flex align-items-center px-3 py-2 ${isActive('/merchan/menu') ? 'active' : ''}`}
          >
            <Menu size={18} className="me-2" />
            <span>Thực đơn</span>
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/merchan/analytics" 
            className={`text-white d-flex align-items-center px-3 py-2 ${isActive('/merchan/analytics') ? 'active' : ''}`}
          >
            <BarChart2 size={18} className="me-2" />
            <span>Thống kê</span>
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/merchan/customers" 
            className={`text-white d-flex align-items-center px-3 py-2 ${isActive('/merchan/customers') ? 'active' : ''}`}
          >
            <Users size={18} className="me-2" />
            <span>Khách hàng</span>
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/merchan/settings" 
            className={`text-white d-flex align-items-center px-3 py-2 ${isActive('/merchan/settings') ? 'active' : ''}`}
          >
            <Settings size={18} className="me-2" />
            <span>Cài đặt</span>
          </Nav.Link>
          
          <div className="mt-auto border-top border-secondary pt-2 mt-3">
            <Nav.Link onClick={handleLogout} className="text-white d-flex align-items-center px-3 py-2">
              <LogOut size={18} className="me-2" />
              <span>Đăng xuất</span>
            </Nav.Link>
          </div>
        </Nav>
      </div>
      
      {/* Main content */}
      <div className="flex-grow-1 bg-light">
        {/* Header */}
        <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            {isActive('/merchan/dashboard') && 'Bảng điều khiển'}
            {isActive('/merchan/orders') && 'Quản lý đơn hàng'}
            {isActive('/merchan/menu') && 'Quản lý thực đơn'}
            {isActive('/merchan/analytics') && 'Thống kê doanh thu'}
            {isActive('/merchan/customers') && 'Quản lý khách hàng'}
            {isActive('/merchan/settings') && 'Cài đặt nhà hàng'}
          </h4>
          <div>
            <Dropdown align="end">
              <Dropdown.Toggle 
                as="div" 
                className="d-flex align-items-center cursor-pointer" 
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                    <User size={18} className="text-primary" />
                  </div>
                  <span className="me-2">{restaurant?.name || 'Nhà hàng'}</span>
                  <ChevronDown size={16} />
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow border-0">
                <Dropdown.Item as="div" className="px-3 py-2">
                  <div className="fw-bold">{restaurant?.name}</div>
                  <div className="small text-muted">{restaurant?.email}</div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/merchan/profile" className="d-flex align-items-center px-3 py-2">
                  <User size={16} className="me-2" />
                  <span>Thông tin nhà hàng</span>
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/merchan/settings" className="d-flex align-items-center px-3 py-2">
                  <Settings size={16} className="me-2" />
                  <span>Cài đặt</span>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center px-3 py-2 text-danger">
                  <LogOut size={16} className="me-2" />
                  <span>Đăng xuất</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        
        {/* Page content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </Container>
  );
};

export default RestaurantLayout;
