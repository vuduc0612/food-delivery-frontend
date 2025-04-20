import React from 'react';
import { Table, Badge, Button, Image } from 'react-bootstrap';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const DishesTable = ({ dishes, formatCurrency, onEdit, onDelete, onToggleStatus }) => {
  return (
    <div className="table-responsive">
      <Table hover>
        <thead>
          <tr>
            <th style={{ width: '100px' }}>Hình ảnh</th>
            <th>Tên món</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td>
                <Image 
                  src={dish.thumbnail || '/images/default-dish.jpg'} 
                  alt={dish.name} 
                  width={60} 
                  height={60} 
                  className="object-fit-cover rounded"
                />
              </td>
              <td>
                <div className="fw-medium">{dish.name}</div>
                <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>
                  {dish.description}
                </small>
              </td>
              <td>{dish.category}</td>
              <td>{formatCurrency(dish.price*1000)}</td>
              <td>
                <Badge bg={dish.isAvailable === 'AVAILABLE' ? 'success' : 'dark'}>
                  {dish.isAvailable === 'AVAILABLE' ? 'Có sẵn' : 'Không có sẵn'}
                </Badge>
              </td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => onEdit(dish.id)}
                    title="Chỉnh sửa"
                  >
                    <FaEdit />
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => onDelete(dish.id)}
                    title="Xóa"
                  >
                    <FaTrash />
                  </Button>
                  <Button 
                    variant={dish.isAvailable === 'AVAILABLE' ? "outline-success" : "outline-dark"} 
                    size="sm" 
                    onClick={() => onToggleStatus(dish.id, dish.isAvailable, dish.name)}
                    title={dish.isAvailable === 'AVAILABLE' ? "Đánh dấu không có sẵn" : "Đánh dấu có sẵn"}
                  >
                    {dish.isAvailable === 'AVAILABLE' ? <FaToggleOn /> : <FaToggleOff />}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DishesTable;
