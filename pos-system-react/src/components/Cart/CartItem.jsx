import React from 'react';

const CartItem = ({ item, onRemove, onAdjustQuantity }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>${item.price.toFixed(2)}</td>
      <td>
        <button className="quantity-btn" onClick={() => onAdjustQuantity(item.name, -1)}>
          <svg viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z"/>
          </svg>
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button className="quantity-btn" onClick={() => onAdjustQuantity(item.name, 1)}>
          <svg viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>
      </td>
      <td>${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button onClick={() => onRemove(item.name)}>Remove</button>
      </td>
    </tr>
  );
};

export default CartItem;