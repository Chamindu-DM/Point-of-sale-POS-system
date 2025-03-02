import React from 'react';
import plusIcon from '../../assets/icons/plus.svg';
import minusIcon from '../../assets/icons/minus.svg';
import './Cart.css';


const CartItem = ({ item, onRemove, onAdjustQuantity }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>Ru. {item.price.toFixed(2)}</td>
      <td className="quantity-cell">
        <div className="quantity-wrapper">
          <button className="quantity-btn" onClick={() => onAdjustQuantity(item.name, -1)}>
            <img src={minusIcon} alt="decrease" />
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button className="quantity-btn" onClick={() => onAdjustQuantity(item.name, 1)}>
            <img src={plusIcon} alt="increase" />
          </button>
        </div>
      </td>
      <td>Ru. {(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button className="remove-btn" onClick={() => onRemove(item.name)}>
          Remove
        </button>
      </td>
    </tr>
  );
};

export default CartItem;