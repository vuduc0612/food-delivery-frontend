import React from 'react';
import { BsX, BsTrash } from 'react-icons/bs';
import { useCart } from '../../contexts/CartContext';

const Cart = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.idDish, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.idDish, item.quantity - 1);
    } else {
      removeFromCart(item.idDish);
    }
  };

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
      <div className={`cart-sidebar ${isOpen ? 'show' : ''}`}>
        <div className="cart-header">
          <h5 className="mb-0">Giỏ đồ ăn</h5>
          <button className="cart-close" onClick={onClose}>
            <BsX />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart3 fs-1 text-muted"></i>
            <p className="mt-3 text-muted">Giỏ hàng trống</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.idDish} className="cart-item">
                  <img src={item.thumbnail} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-content">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h6 className="cart-item-title mb-0">{item.name}</h6>
                      <button
                        className="btn text-danger p-0"
                        onClick={() => removeFromCart(item.idDish)}
                      >
                        <BsTrash />
                      </button>
                    </div>
                    <div className="cart-item-price mb-2">
                      {(item.price * 1000).toLocaleString()}đ
                    </div>
                    <div className="cart-quantity">
                      <button
                        className="cart-quantity-btn"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="cart-quantity-btn"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Tổng cộng</span>
                <span className="cart-total-amount">
                  {(totalAmount * 1000).toLocaleString()}đ
                </span>
              </div>
              <button className="btn w-100" style={{ backgroundColor: '#7ed6df', color: 'white' }}>
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
