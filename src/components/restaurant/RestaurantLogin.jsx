import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsEnvelope, BsLock, BsEye, BsEyeSlash } from "react-icons/bs";
import { useRestaurantAuth } from "../../hooks/useRestaurantAuth";

const RestaurantLogin = () => {
  // Restaurant login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error, isAuthenticated } = useRestaurantAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/merchan/dashboard');
    }
  };
  
  // Nếu đã đăng nhập, chuyển hướng đến trang dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/merchan/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container fluid className="p-0 min-vh-100 d-flex">
      {/* Left side - Restaurant info */}
      <div
        className="d-none d-md-flex flex-column bg-secondary text-white"
        style={{ width: "40%" }}
      >
        <div className="h-100 d-flex flex-column justify-content-center align-items-center p-4 text-center">
          <h1 className="fw-bold mb-3">Quản lý nhà hàng</h1>
          <p className="mb-0">
            Nền tảng quản lý đơn hàng, thực đơn và doanh thu hiệu quả cho nhà
            hàng của bạn
          </p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-grow-1 d-flex flex-column">
        <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <h3 className="text-center mb-4">Đăng nhập nhà hàng 🍽️</h3>
            <p className="text-center text-muted mb-4">
              Đăng nhập để quản lý nhà hàng của bạn
            </p>

            {error && (
              <Alert variant="danger" className="mb-4 py-2">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email nhà hàng</Form.Label>
                <div className="position-relative">
                  <BsEnvelope
                    className="position-absolute ms-1"
                    style={{ top: "12px", color: "#7ed6df" }}
                  />
                  <Form.Control
                    type="email"
                    placeholder="nhahang@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="ps-4"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <div className="position-relative">
                  <BsLock
                    className="position-absolute ms-1"
                    style={{ top: "12px", color: "#7ed6df" }}
                  />
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="ps-4"
                  />
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                    className="position-absolute"
                    style={{ top: "0", right: "0", border: "none" }}
                  >
                    {showPassword ? <BsEyeSlash style={{ color: "#7ed6df" }}/> : <BsEye style={{ color: "#7ed6df" }}/>}
                  </Button>
                </div>
              </Form.Group>

              <div className="text-end mb-4">
                <Link
                  to="/restaurant-forgot-password"
                  className="text-decoration-none"
                  style={{ color: "#7ed6df" }}
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="position-relative py-2"
                  style={{ backgroundColor: "#7ed6df", borderColor: "#7ed6df" }}
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </div>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Chưa có tài khoản nhà hàng?{" "}
                  <Link
                    to="/restaurant-register"
                    className="text-decoration-none"
                    style={{ color: "#7ed6df" }}
                  >
                    Đăng ký nhà hàng mới
                  </Link>
                </p>
              </div>

              <div className="text-center mt-4">
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "#6ec2cb" }}
                >
                  ← Quay lại trang khách hàng
                </Link>
              </div>
            </Form>
          </div>
        </div>

        <div className="py-3 text-center text-muted border-top">
          <small>
            &copy; {new Date().getFullYear()} Food Delivery App. Tất cả các
            quyền được bảo lưu.
          </small>
        </div>
      </div>
    </Container>
  );
};

export default RestaurantLogin;
