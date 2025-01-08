import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onAddToCart }) => {
    return (
        <div className="product-list">
            <ul>
                {products.map((product) => (
                    <ProductItem
                        key={product.name}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ProductList;