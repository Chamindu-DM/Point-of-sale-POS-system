import React from "react";
import "./ProductListStyle.css";
import { ProductCard } from "../Dashboard/ProductCard";

export const ProductList = ({ products }) => {
  return (
    <div className="product-list-container">
      <h2>Available Products</h2>
      <div className="products-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard 
              key={product._id}
              {...product}
            />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};
