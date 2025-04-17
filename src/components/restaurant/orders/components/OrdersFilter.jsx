import React from 'react';
import { Row, Col, Form, Dropdown, Badge } from 'react-bootstrap';
import { Search, Filter } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';

const OrdersFilter = ({ searchTerm, statusFilter, onSearch, onFilterStatus }) => {
  const handleSearch = (e) => {
    const term = e.target.value;
    onSearch(term);
  };

  const getStatusLabel = (status) => {
    return status === 'all' ? 'Tất cả' : <OrderStatusBadge status={status} />;
  };

  return (
    <Row className="mb-3" style={{ position: 'relative', zIndex: 1030 }}>
      <Col md={6} className="mb-3 mb-md-0">
        <div className="position-relative">
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo mã đơn, tên khách hàng hoặc số điện thoại"
            value={searchTerm}
            onChange={handleSearch}
            className="ps-4"
          />
          <Search size={18} className="position-absolute" style={{ top: '10px', left: '10px' }} />
        </div>
      </Col>
      <Col md={6} className="d-flex justify-content-md-end">
        <Dropdown autoClose="outside" align="end">
          <Dropdown.Toggle variant="outline-secondary" className="d-flex align-items-center">
            <Filter size={16} className="me-2" />
            <span>Trạng thái: {getStatusLabel(statusFilter)}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu 
            style={{ minWidth: '230px', maxHeight: '400px', overflowY: 'auto' }} 
            popperConfig={{ 
              strategy: 'fixed', 
              placement: 'bottom-end', 
              modifiers: [
                { name: 'preventOverflow', options: { padding: 8, boundary: 'viewport' } }, 
                { name: 'flip', enabled: true }
              ] 
            }}
          >
            <Dropdown.Item onClick={() => onFilterStatus('all')}>Tất cả</Dropdown.Item>
            <Dropdown.Item onClick={() => onFilterStatus('pending')} className="d-flex align-items-center">
              <span className="me-2">Chờ xác nhận</span>
              <Badge bg="warning" className="text-dark ms-auto">Chờ xác nhận</Badge>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onFilterStatus('confirmed')} className="d-flex align-items-center">
              <span className="me-2">Đã xác nhận</span>
              <Badge bg="info" className="ms-auto">Đã xác nhận</Badge>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onFilterStatus('preparing')} className="d-flex align-items-center">
              <span className="me-2">Đang chuẩn bị</span>
              <Badge bg="primary" className="ms-auto">Đang chuẩn bị</Badge>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onFilterStatus('out_for_delivery')} className="d-flex align-items-center">
              <span className="me-2">Đang giao</span>
              <Badge bg="info" style={{ backgroundColor: '#17a2b8' }} className="ms-auto">Đang giao</Badge>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onFilterStatus('delivered')} className="d-flex align-items-center">
              <span className="me-2">Đã giao</span>
              <Badge bg="success" className="ms-auto">Đã giao</Badge>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onFilterStatus('cancelled')} className="d-flex align-items-center">
              <span className="me-2">Đã hủy</span>
              <Badge bg="danger" className="ms-auto">Đã hủy</Badge>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default OrdersFilter;
