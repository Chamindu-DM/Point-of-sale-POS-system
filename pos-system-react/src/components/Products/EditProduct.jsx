import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { productId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Fetching product with ID: ${productId}`);
                
                // Try to get the product from the list of products first
                // This is a workaround if the single product endpoint doesn't exist
                const productsResponse = await fetch('http://localhost:5000/api/products');
                
                if (!productsResponse.ok) {
                    throw new Error(`Failed to fetch products (Status: ${productsResponse.status})`);
                }
                
                const products = await productsResponse.json();
                const foundProduct = products.find(p => p._id === productId);
                
                if (!foundProduct) {
                    throw new Error(`Product with ID ${productId} not found`);
                }
                
                console.log('Found product:', foundProduct);
                setProduct(foundProduct);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.message || 'Failed to fetch product details');
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        } else {
            setError('No product ID provided');
            setLoading(false);
        }
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'quantity' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log('Submitting updated product:', product);
            
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            
            console.log('Update response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Update error response:', errorData);
                throw new Error(errorData.message || `Failed to update product (Status: ${response.status})`);
            }
            
            const data = await response.json();
            console.log('Update success:', data);
            
            alert('Product updated successfully');
            navigate('/products');
        } catch (err) {
            console.error('Error updating product:', err);
            alert(`Failed to update product: ${err.message}`);
        }
    };

    if (loading) return <div className="loading">Loading product details...</div>;
    
    if (error) {
        return (
            <div className="error-container">
                <h2>Error</h2>
                <p className="error">{error}</p>
                <button 
                    className="back-btn" 
                    onClick={() => navigate('/products')}
                >
                    Back to Products
                </button>
            </div>
        );
    }

    return (
        <div className="edit-product-container">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="price">Price (LKR)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price || ''}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="quantity">Stock Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity || ''}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description || ''}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                
                <div className="form-buttons">
                    <button type="button" onClick={() => navigate('/products')} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="save-btn">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;