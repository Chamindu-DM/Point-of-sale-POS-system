import React, { useState, useEffect } from "react";
import "./ProductListStyle.css";
import { ProductCard } from "../Dashboard/ProductCard";

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="product-list-container">
            <h2>Available Products</h2>
            <div className="products-grid">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard 
                            key={product._id}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            quantity={product.quantity}
                            imageUrl={product.imageUrl}
                            description={product.description}
                        />
                    ))
                ) : (
                    <div>No products found</div>
                )}
            </div>
        </div>
    );
};
