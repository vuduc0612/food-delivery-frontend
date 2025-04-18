import React from 'react';
import { Table } from 'react-bootstrap';

const OrderItems = ({ items, totalPrice, formatCurrency }) => {
  return (
    <>
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
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.dish_name}</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-end">{formatCurrency(item.dish_price * 1000)}</td>
              <td className="text-end">{formatCurrency(item.dish_price * item.quantity * 1000)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="3" className="text-end fw-bold">Tổng cộng:</td>
            <td className="text-end fw-bold">{formatCurrency(totalPrice)}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default OrderItems;
