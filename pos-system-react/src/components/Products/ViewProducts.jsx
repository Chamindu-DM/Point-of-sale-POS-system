import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ViewProducts.css';

const ViewProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    };

    const handleEdit = (productId) => {
        // Make sure productId is valid before navigating
        if (productId) {
            console.log(`Navigating to edit product with ID: ${productId}`);
            navigate(`/products/edit/${productId}`);
        } else {
            alert('Invalid product ID');
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                console.log('Attempting to delete product:', productId); // Debug log

                const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                console.log('Delete response:', data); // Debug log

                if (response.ok && data.success) {
                    setProducts(prevProducts => 
                        prevProducts.filter(product => product._id !== productId)
                    );
                    alert('Product deleted successfully');
                } else {
                    throw new Error(data.message || 'Failed to delete product');
                }
            } catch (err) {
                console.error('Delete error:', err);
                alert(`Failed to delete product: ${err.message}`);
            }
        }
    };

    // Group products by category
    const groupedProducts = products.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="view-products-container">
            <div className="products-header">
                <h2>Product List</h2>
                <Link to="/products/add" className="add-product-btn">
                    Add New Product
                </Link>
            </div>

            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category} className="category-section">
                    <h3 className="category-title">{category}</h3>
                    <div className="products-grid">
                        {categoryProducts.map((product) => (
                            <div key={product._id} className="product-card">
                                <div className="product-image-container">
                                    <img 
                                        src={`http://localhost:5000${product.imageUrl}`}
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/default-product-image.png';
                                        }}
                                    />
                                </div>
                                <div className="product-details">
                                    <h3>{product.name}</h3>
                                    <p className="price">LKR {product.price.toFixed(2)}</p>
                                    <p className="stock">Stock: {product.quantity}</p>
                                </div>
                                <div className="product-actions">
                                    <button 
                                        className="edit-btn"
                                        onClick={() => handleEdit(product._id)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="delete-btn"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewProducts;