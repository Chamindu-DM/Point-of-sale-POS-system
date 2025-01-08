import React from 'react';

const CartItem = ({ item, onRemove }) => {
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>{item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button onClick={() => onRemove(item.name)}>Remove</button>
            </td>
        </tr>
    );
};

export default CartItem;