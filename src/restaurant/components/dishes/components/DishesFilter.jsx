import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Badge, Button } from 'react-bootstrap';
import { FaSearch, FaFilter } from 'react-icons/fa';

const DishesFilter = ({ 
  searchTerm, 
  categoryFilter, 
  categories, 
  onSearch, 
  onFilterCategory
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Selected category:", selectedCategory, "Previous:", categoryFilter);
    
    // Áp dụng lọc ngay khi chọn danh mục
    onFilterCategory(selectedCategory);
  };

  return (
    <>
      {/* Tìm kiếm và lọc */}
      <Row className="mb-4">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Tìm kiếm món ăn..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <Button 
                variant="primary" 
                type="submit"
              >
                Tìm
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Col md={3}></Col>
        <Col md={3}>
          <InputGroup>
            <InputGroup.Text>
              <FaFilter />
            </InputGroup.Text>
            <Form.Select
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="all">Tất cả danh mục</option>
              {Object.entries(categories).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
      </Row>

      {/* Hiển thị bộ lọc đang áp dụng */}
      {categoryFilter !== 'all' && (
        <div className="mb-3">
          <div className="d-flex gap-2 align-items-center">
            <small className="text-muted">Bộ lọc đang áp dụng:</small>
            <Badge bg="primary" className="d-flex align-items-center">
              Danh mục: {categories[categoryFilter] || categoryFilter}
            </Badge>
          </div>
        </div>
      )}
    </>
  );
};

export default DishesFilter;
