import React from "react";
import './Cart.css';

const Cart = ({ cart, onRemoveFromCart, onAdjustQuantity, total }) => {
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
        <div className="cart-total">
          <p>Total: LKR {total.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {cart.map((item) => (
          <li key={item._id || item.id} className="cart-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-price">LKR {item.price} x {item.quantity}</span>
            </div>
            <div className="item-actions">
              <button onClick={() => onAdjustQuantity(item._id || item.id, -1)} className="quantity-btn">-</button>
              <span className="item-quantity">{item.quantity}</span>
              <button onClick={() => onAdjustQuantity(item._id || item.id, 1)} className="quantity-btn">+</button>
              <button onClick={() => onRemoveFromCart(item._id || item.id)} className="remove-btn">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <p>Total: LKR {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;