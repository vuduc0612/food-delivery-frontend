import React from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import OrderStatusBadge from './OrderStatusBadge';
import OrderActionsDropdown from './OrderActionsDropdown';

const OrdersTable = ({ orders, onUpdateStatus, formatDate, formatCurrency }) => {
  return (
    <div className="table-responsive" style={{ minHeight: '300px', position: 'relative', zIndex: 1020 }}>
      <Table hover className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Thời gian</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Thanh toán</th>
            <th className="text-end">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => {
            const isLastRow = idx === orders.length - 1;
            return (
              <tr key={order.id}>
                <td className="fw-medium">{order.id}</td>
                <td>
                  <div>{order.customerName}</div>
                  <div className="small text-muted">{order.user?.phone || order.user?.email}</div>
                </td>
                <td>{formatDate(order.order_time)}</td>
                <td className="fw-medium">{formatCurrency(order.total_price)}</td>
                <td><OrderStatusBadge status={order.status} /></td>
                <td>
                  <Badge 
                    bg={order.paid === false ? 'light' : 'success'} 
                    className={order.paid === false ? 'text-dark border' : 'text-white'}
                  >
                    {order.paid === false ? 'Chưa thanh toán' : 'Đã thanh toán'}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      as={Link}
                      to={`/merchan/orders/${order.id}`}
                    >
                      <Eye size={14} className="me-1" />
                      Chi tiết
                    </Button>
                    <OrderActionsDropdown 
                      order={order} 
                      onUpdateStatus={onUpdateStatus} 
                      isLastRow={isLastRow} 
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default OrdersTable;
