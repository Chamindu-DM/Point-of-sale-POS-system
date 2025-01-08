import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cart, onRemoveFromCart, total }) => {
    return (
        <div className="cart">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="empty-cart-message">
                                Your cart is empty
                            </td>
                        </tr>
                    ) : (
                        cart.map((item) => (
                            <CartItem
                                key={item.name}
                                item={item}
                                onRemove={onRemoveFromCart}
                            />
                        ))
                    )}
                </tbody>
            </table>
            <div className="cart-total">
                <strong>Total:</strong> ${total.toFixed(2)}
            </div>
        </div>
    );
};

export default Cart;