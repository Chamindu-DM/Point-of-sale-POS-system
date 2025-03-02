import React, { useState, useEffect } from 'react';
import './InventoryPage.css';

const InventoryPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Sample data - Replace this with your actual API call
    useEffect(() => {
        // Simulating API call
        const fetchProducts = async () => {
            try {
                // Replace this with your actual API endpoint
                // const response = await fetch('your-api-endpoint/products');
                // const data = await response.json();
                
                // Sample data
                const sampleData = [
                    { id: 1, name: 'Product 1', sku: 'SKU001', stock: 50, minStock: 10 },
                    { id: 2, name: 'Product 2', sku: 'SKU002', stock: 25, minStock: 15 },
                    { id: 3, name: 'Product 3', sku: 'SKU003', stock: 5, minStock: 20 },
                ];
                
                setProducts(sampleData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="inventory-page">
            <h1>Inventory Management</h1>
            
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="inventory-table">
                    <table>
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Product Name</th>
                                <th>Stock Level</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.sku}</td>
                                    <td>{product.name}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <span className={`status ${product.stock <= product.minStock ? 'low-stock' : 'in-stock'}`}>
                                            {product.stock <= product.minStock ? 'Low Stock' : 'In Stock'}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => alert(`Update stock for ${product.name}`)}>
                                            Update Stock
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;