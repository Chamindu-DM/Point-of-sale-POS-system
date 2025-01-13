import React from 'react';
import PropTypes from 'prop-types';
import "./ProductItemStyle.css";

const ProductItem = ({ name, price, image, stockQuantity, onAddToCart }) => {
    return (
        <div className="product-item">
            <div className="image-container">
                <img 
                    src={image} 
                    alt={name}
                    className="product-image"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = require("../../assets/images/default.jpg");
                    }}
                />
            </div>
            <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="product-price">{price}</div>
            </div>
            <div className="stock-info">
                <div className="stock-label">In stock:</div>
                <div className="stock-value">{stockQuantity}</div>
            </div>
            <button 
                className="add-to-cart-button"
                onClick={onAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
};

ProductItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    stockQuantity: PropTypes.number.isRequired,
    onAddToCart: PropTypes.func.isRequired
};

export default ProductItem;
