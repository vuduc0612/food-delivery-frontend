import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col, Spinner, Alert, Image } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useRestaurantAuth } from '../../hooks/useRestaurantAuth';
import useRestaurantDishes from '../../hooks/useRestaurantDishes';
import { restaurantDishService } from '../../api/services/restaurantDishService';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

const DishForm = () => {
  const navigate = useNavigate();
  const { dishId } = useParams();
  const isEditMode = !!dishId;
  const { loading: authLoading, isAuthenticated } = useRestaurantAuth();
  const { 
    fetchDishById, 
    dishLoading, 
    dishError 
  } = useRestaurantDishes();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    categoryName: '',
    thumbnail: '',
    file: null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!isAuthenticated && !authLoading) {
      navigate('/merchant-login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Tải danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await restaurantDishService.getCategories();
        console.log("Categories from API:", response);
        if (response && response.data) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Nếu là chế độ chỉnh sửa, tải thông tin món ăn
  useEffect(() => {
    const loadDish = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const dish = await fetchDishById(dishId);
          console.log("Dish data from API:", dish); // Log toàn bộ dữ liệu từ API
          
          if (dish) {
            const category = dish.category || '';
            // Kiểm tra nếu category có trong danh sách hay không
            const categoryExists = categories.some(cat => cat.name === category);
            
            setFormData({
              name: dish.name || '',
              price: dish.price || '',
              description: dish.description || '',
              categoryName: categoryExists ? category : '',
              thumbnail: dish.thumbnail || '', // Lưu URL ảnh hiện tại
              file: null // Không có file mới
            });
            
            // Nếu category không có trong danh sách, coi như category tùy chỉnh
            if (!categoryExists && category) {
              setUseCustomCategory(true);
              setCustomCategory(category);
            }
            
            setImagePreview(dish.thumbnail || '');
          }
          
        } catch (err) {
          setError('Không thể tải thông tin món ăn');
        } finally {
          setLoading(false);
        }
      }
    };

    loadDish();
  }, [dishId, isEditMode, fetchDishById]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    
    if (value === 'custom') {
      setUseCustomCategory(true);
      setFormData(prev => ({
        ...prev,
        categoryName: customCategory
      }));
    } else {
      setUseCustomCategory(false);
      setFormData(prev => ({
        ...prev,
        categoryName: value
      }));
    }
  };

  // Xử lý nhập danh mục tùy chỉnh
  const handleCustomCategoryChange = (e) => {
    const value = e.target.value;
    setCustomCategory(value);
    setFormData(prev => ({
      ...prev,
      categoryName: value
    }));
  };

  // Xử lý thay đổi file ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file: file
      }));

      // Tạo preview ảnh
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu
    if (!formData.name || !formData.price || !formData.categoryName) {
      setError('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    // Kiểm tra ảnh
    if (!isEditMode && !formData.file) {
      setError('Vui lòng chọn ảnh cho món ăn');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Chuẩn bị dữ liệu để gửi
      const submitData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      console.log("Submit data:", submitData);

      let result;
      if (isEditMode) {
        result = await restaurantDishService.updateDish(dishId, submitData);
      } else {
        result = await restaurantDishService.createDish(submitData);
      }

      console.log("API Response:", result);
      
      if (result && (result.status === "CREATED" || result.status === "OK")) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/merchant/dishes');
        }, 5000);
      } else {
        setError(result?.message || 'Có lỗi xảy ra khi lưu món ăn');
      }
    } catch (err) {
      console.error("Error saving dish:", err);
      setError(err.message || 'Có lỗi xảy ra khi lưu món ăn');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý quay lại
  const handleBack = () => {
    navigate('/merchant/dishes');
  };

  if (authLoading || loading || dishLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Đang tải...</p>
      </div>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">{isEditMode ? 'Chỉnh sửa món ăn' : 'Thêm món ăn mới'}</h5>
          <Button 
            variant="outline-secondary" 
            onClick={handleBack}
            className="d-flex align-items-center"
          >
            <FaArrowLeft className="me-2" /> Quay lại
          </Button>
        </div>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {dishError && (
          <Alert variant="danger" className="mb-4">
            {dishError}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-4">
            {isEditMode ? 'Cập nhật món ăn thành công!' : 'Thêm món ăn mới thành công!'}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Tên món ăn <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên món ăn"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Giá (VNĐ) <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price*1000}
                  onChange={handleChange}
                  placeholder="Nhập giá món ăn"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Danh mục <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  value={useCustomCategory ? 'custom' : formData.categoryName}
                  onChange={handleCategoryChange}
                  required
                  disabled={loadingCategories}
                  className="mb-2"
                >
                  <option value="">Chọn danh mục</option>
                  {/* Render danh mục từ API */}
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="custom">Khác (nhập tùy chỉnh)</option>
                </Form.Select>
                
                {useCustomCategory && (
                  <Form.Control
                    type="text"
                    value={customCategory}
                    onChange={handleCustomCategoryChange}
                    placeholder="Nhập tên danh mục mới"
                    required={useCustomCategory}
                  />
                )}
                
                {loadingCategories && <div className="text-muted small mt-1">Đang tải danh mục...</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả món ăn"
                  rows={4}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Hình ảnh món ăn</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Form.Text className="text-muted">
                  Chọn ảnh có kích thước tối đa 2MB
                </Form.Text>
              </Form.Group>

              {imagePreview && (
                <div className="mt-3 text-center">
                  <p className="mb-2">Xem trước:</p>
                  <Image 
                    src={imagePreview} 
                    alt="Preview" 
                    className="img-thumbnail" 
                    style={{ maxHeight: '200px' }} 
                  />
                </div>
              )}
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loading}
              className="d-flex align-items-center"
            >
              {loading && <Spinner animation="border" size="sm" className="me-2" />}
              <FaSave className="me-2" /> 
              {isEditMode ? 'Cập nhật món ăn' : 'Thêm món ăn'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DishForm;
