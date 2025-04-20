import { createContext, useContext, useEffect, useState } from "react";
import {
  addToCart as apiAddToCart,
  updateCartItem,
  removeCartItem,
  getCart1,
} from "../api/services/cartService";
import { useAuth } from "../hooks/useAuth";
import { getAuthToken } from "../../shared/utils/authToken";
import { Modal } from "react-bootstrap";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [restaurant, setRestaurant] = useState(null);
  const [user, setUser] = useState(null);
  // Modal xác nhận thêm món từ nhà hàng khác
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    dish: null,
    newRestaurant: null,
  });

  // Lấy giỏ hàng từ backend
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setItems([]);
      setTotalAmount(0);
      setRestaurant(null);
      setUser(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const token = getAuthToken();
      const cartData = await getCart1(token);

      if (cartData && Array.isArray(cartData.items)) {
        // console.log("cartData", cartData);
        setItems(cartData.items);
        setTotalAmount(cartData.totalAmount || 0);
        setRestaurant(cartData.restaurant || null);
        setUser(cartData.user || null);
      } else {
        // console.warn("Invalid cart data format:", cartData);
        setItems([]);
        setTotalAmount(0);
        setRestaurant(null);
        setUser(null);
      }
    } catch (err) {
      console.error("Lỗi lấy giỏ hàng:", err);
      setError("Không thể lấy thông tin giỏ hàng");
      setItems([]);
      setTotalAmount(0);
      setRestaurant(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Thêm món vào giỏ, kiểm tra conflict nhà hàng
  const addToCart = async (dish, restaurant) => {
    if (!isAuthenticated) {
      setError("Vui lòng đăng nhập để thêm món vào giỏ hàng");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await apiAddToCart(dish.id, 1, false);

      if (response.addToCartResultType === "CONFLICT_DIFFERENT_RESTAURANT") {
        setConfirmModal({
          show: true,
          dish,
          newRestaurant: restaurant,
        });
      } else {
        await fetchCart();
      }
    } catch (err) {
      console.error("Lỗi thêm vào giỏ hàng:", err);
      setError("Không thể thêm món vào giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  // Xác nhận thay thế giỏ hàng
  const handleConfirmReplace = async () => {
    try {
      if (!confirmModal.dish) return;
      setLoading(true);
      await apiAddToCart(confirmModal.dish.id, 1, true);
      await fetchCart();
    } catch (err) {
      console.error("Lỗi khi xác nhận thay giỏ hàng:", err);
      setError("Không thể thay đổi giỏ hàng");
    } finally {
      setConfirmModal({ show: false, dish: null, newRestaurant: null });
      setLoading(false);
    }
  };

  // Huỷ thay giỏ hàng
  const handleCancelReplace = () => {
    setConfirmModal({ show: false, dish: null, newRestaurant: null });
  };

  // Cập nhật số lượng
  const updateQuantity = async (dishId, quantity) => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError(null);
      await updateCartItem(dishId, quantity);
      await fetchCart();
    } catch (err) {
      console.error("Lỗi cập nhật số lượng:", err);
      setError("Không thể cập nhật số lượng");
    } finally {
      setLoading(false);
    }
  };

  // Xoá món khỏi giỏ
  const removeFromCart = async (dishId) => {
    if (!isAuthenticated) return;
    try {
      setLoading(true);
      setError(null);
      await removeCartItem(dishId);
      await fetchCart();
    } catch (err) {
      console.error("Lỗi xóa món:", err);
      setError("Không thể xóa món khỏi giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setItems([]);
    setTotalAmount(0);
    setRestaurant(null);
    // Không xóa thông tin user
  };

  const toggleCart = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setItems([]);
      setTotalAmount(0);
      setRestaurant(null);
      setUser(null);
    }
  }, [isAuthenticated]);

  const value = {
    isOpen,
    items,
    totalAmount,
    loading,
    error,
    restaurant,
    user,
    addToCart,
    updateQuantity,
    removeFromCart,
    toggleCart,
    refreshCart: fetchCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Modal xác nhận thay giỏ hàng */}
      <Modal
        show={confirmModal.show}
        onHide={handleCancelReplace}
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi nhà hàng?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex align-items-start gap-3">
            <i className="bi bi-exclamation-triangle-fill text-warning fs-3 mt-1"></i>
            <div>
              <p className="mb-2">
                Giỏ hàng hiện tại đang chứa món ăn từ{" "}
                <strong>{restaurant?.name}</strong>.
              </p>
              <p className="mb-0">
                Bạn có muốn <strong>xóa giỏ hàng cũ</strong> và thêm món từ{" "}
                <strong>{confirmModal.newRestaurant?.name}</strong> không?
              </p>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCancelReplace}>
            Hủy
          </button>
          <button
            className="btn btn-danger"
            onClick={handleConfirmReplace}
            style={{ backgroundColor: "#6ec2cb", border: "none" }}
          >
            Đồng ý thay thế
          </button>
        </Modal.Footer>
      </Modal>
    </CartContext.Provider>
  );
};
