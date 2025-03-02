import React, { useState, useEffect } from 'react';
import './InventoryPage.css';
import axios from 'axios';

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const determineStatus = (product) => {
        // Define low stock threshold as 10 or use product-specific threshold
        const threshold = 10;
        if (product.quantity <= 0) return { label: 'Out of Stock', class: 'out-of-stock' };
        if (product.quantity <= threshold) return { label: 'Low Stock', class: 'low-stock' };
        return { label: 'In Stock', class: 'in-stock' };
    };

    const startEditing = (product) => {
        setEditingProduct(product);
        setNewQuantity(product.quantity.toString());
    };

    const cancelEditing = () => {
        setEditingProduct(null);
        setNewQuantity('');
    };

    const saveQuantity = async () => {
        if (!editingProduct) return;
        
        try {
            const quantity = parseInt(newQuantity, 10);
            if (isNaN(quantity) || quantity < 0) {
                setMessage({ text: 'Please enter a valid quantity', type: 'error' });
                return;
            }
            
            const response = await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, {
                ...editingProduct,
                quantity: quantity
            });
            
            if (response.data.success) {
                // Update the product in the local state
                setProducts(products.map(p => 
                    p._id === editingProduct._id ? {...p, quantity: quantity} : p
                ));
                setMessage({ text: 'Inventory updated successfully', type: 'success' });
                cancelEditing();
            } else {
                setMessage({ text: 'Failed to update inventory', type: 'error' });
            }
        } catch (error) {
            console.error('Error updating inventory:', error);
            setMessage({ text: 'Error updating inventory', type: 'error' });
        }
    };

    // Get unique categories from products
    const categories = ['all', ...new Set(products.map(product => product.category || 'Uncategorized'))];

    // Filter products by selected category
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => (product.category || 'Uncategorized') === selectedCategory);

    // Group products by category
    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(product);
        return acc;
    }, {});

    if (loading) return <div className="loading">Loading inventory data...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="inventory-page">
            <h1>Inventory Management</h1>
            
            {message.text && (
                <div className={`alert ${message.type}`} role="alert">
                    {message.text}
                </div>
            )}

            <div className="category-filter">
                <label htmlFor="category-select">Filter by Category:</label>
                <select 
                    id="category-select"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="category-select"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                        </option>
                    ))}
                </select>
            </div>
            
            {selectedCategory === 'all' ? (
                // Display products grouped by categories
                Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                    <div key={category} className="category-section">
                        <h2 className="category-title">{category}</h2>
                        <div className="inventory-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Price (LKR)</th>
                                        <th>Stock Level</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categoryProducts.map((product) => {
                                        const status = determineStatus(product);
                                        return (
                                            <tr key={product._id}>
                                                <td>
                                                    <img 
                                                        src={`http://localhost:5000${product.imageUrl}`} 
                                                        alt={product.name}
                                                        className="product-thumbnail"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = '/default-product-image.png';
                                                        }}
                                                    />
                                                </td>
                                                <td>{product.name}</td>
                                                <td>{product.price?.toFixed(2) || '0.00'}</td>
                                                <td>
                                                    {editingProduct && editingProduct._id === product._id ? (
                                                        <input 
                                                            type="number" 
                                                            value={newQuantity}
                                                            onChange={(e) => setNewQuantity(e.target.value)}
                                                            min="0"
                                                            className="quantity-input"
                                                        />
                                                    ) : (
                                                        product.quantity
                                                    )}
                                                </td>
                                                <td>
                                                    <span className={`status ${status.class}`}>
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td>
                                                    {editingProduct && editingProduct._id === product._id ? (
                                                        <div className="edit-actions">
                                                            <button 
                                                                onClick={saveQuantity} 
                                                                className="save-btn"
                                                            >
                                                                Save
                                                            </button>
                                                            <button 
                                                                onClick={cancelEditing} 
                                                                className="cancel-btn"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button 
                                                            onClick={() => startEditing(product)} 
                                                            className="edit-btn"
                                                        >
                                                            Update Stock
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                // Display products from a single selected category
                <div className="inventory-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price (LKR)</th>
                                <th>Stock Level</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => {
                                const status = determineStatus(product);
                                return (
                                    <tr key={product._id}>
                                        <td>
                                            <img 
                                                src={`http://localhost:5000${product.imageUrl}`} 
                                                alt={product.name}
                                                className="product-thumbnail"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/default-product-image.png';
                                                }}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.price?.toFixed(2) || '0.00'}</td>
                                        <td>
                                            {editingProduct && editingProduct._id === product._id ? (
                                                <input 
                                                    type="number" 
                                                    value={newQuantity}
                                                    onChange={(e) => setNewQuantity(e.target.value)}
                                                    min="0"
                                                    className="quantity-input"
                                                />
                                            ) : (
                                                product.quantity
                                            )}
                                        </td>
                                        <td>
                                            <span className={`status ${status.class}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td>
                                            {editingProduct && editingProduct._id === product._id ? (
                                                <div className="edit-actions">
                                                    <button 
                                                        onClick={saveQuantity} 
                                                        className="save-btn"
                                                    >
                                                        Save
                                                    </button>
                                                    <button 
                                                        onClick={cancelEditing} 
                                                        className="cancel-btn"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => startEditing(product)} 
                                                    className="edit-btn"
                                                >
                                                    Update Stock
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;