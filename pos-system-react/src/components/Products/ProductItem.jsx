import React from "react";
import "./ProductItem.css";

const ProductItem = ({ id, name, price, image, stockQuantity, onAddToCart }) => {
  return (
    <div className="product-item">
      <img 
        src={image} 
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/default-product-image.png';
        }}
      />
      <h3>{name}</h3>
      <p className="product-price">LKR {price}</p>
      <p className="stock-info">Stock: {stockQuantity}</p>
      <button onClick={onAddToCart} className="add-btn">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
