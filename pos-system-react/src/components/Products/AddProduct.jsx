import React, { useState } from 'react';
import './AddProduct.css';

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        category: '',
        quantity: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [cart, setCart] = useState([]);

    const handleInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            // Append product data
            Object.keys(product).forEach(key => {
                formData.append(key, product[key]);
            });
            // Append image file
            if (image) {
                formData.append('image', image);
            }

            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formData // Don't set Content-Type header, let browser handle it
            });
            const data = await response.json();
            
            if (data.success) {
                setMessage({ type: 'success', text: 'Product added successfully!' });
                // Reset form
                setProduct({
                    name: '',
                    price: '',
                    category: '',
                    quantity: '',
                    description: ''
                });
                setImage(null);
            } else {
                setMessage({ type: 'error', text: 'Failed to add product' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error adding product' });
        }
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Use _id if available, otherwise use id (for local products)
            const itemId = product._id || product.id;
            const existingItem = prevCart.find((item) => (item._id || item.id) === itemId);
            
            // Check stock
            const currentQuantity = existingItem ? existingItem.quantity : 0;
            if (currentQuantity + 1 > (product.quantity || product.stockQuantity)) {
                alert(`Sorry, only ${product.quantity || product.stockQuantity} ${product.name}(s) available in stock`);
                return prevCart;
            }

            if (existingItem) {
                return prevCart.map((item) =>
                    (item._id || item.id) === itemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [
                    ...prevCart,
                    {
                        _id: product._id || product.id,
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        stockQuantity: product.quantity || product.stockQuantity
                    },
                ];
            }
        });
    };

    return (
        <div className="add-product-container">
            <h2>Add New Product</h2>
            {message.text && (
                <div className={`alert ${message.type}`}>
                    {message.text}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price (LKR)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Short Eats">Short Eats</option>
                        <option value="Cakes">Cakes</option>
                        <option value="Sweets">Sweets</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Stock Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="submit-btn">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;