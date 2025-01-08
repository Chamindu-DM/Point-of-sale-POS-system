import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
    return (
        <li>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
            </div>
            <button
                className="add-to-cart"
                onClick={() => onAddToCart(product)}
            >
                Add to Cart
            </button>
        </li>
    );
};

export default ProductItem;