import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cart = [], onRemoveFromCart, onAdjustQuantity, total = 0 }) => {
  return (
    <div className="cart">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>Ru. {item.price.toFixed(2)}</td>
              <td className="quantity-cell">
                <div className="quantity-wrapper">
                  <button className="quantity-btn" onClick={() => onAdjustQuantity(item.name, -1)}>-</button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button className="quantity-btn" onClick={() => onAdjustQuantity(item.name, 1)}>+</button>
                </div>
              </td>
              <td>Ru. {(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button className="remove-btn" onClick={() => onRemoveFromCart(item.name)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-total">
        <strong>Total:</strong> Ru. {total.toFixed(2)}
      </div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  onRemoveFromCart: PropTypes.func.isRequired,
  onAdjustQuantity: PropTypes.func.isRequired,
  total: PropTypes.number
};

Cart.defaultProps = {
  cart: [],
  total: 0
};

export default Cart;