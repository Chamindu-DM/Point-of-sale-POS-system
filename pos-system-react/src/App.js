import React, { useState, useEffect } from "react";
import ProductItem from "./components/Products/ProductItem";
import Cart from "./components/Cart/Cart";
import CheckoutButton from "./components/Checkout/CheckoutButton";
import Payment from "./components/Payment/Payment";
import NavBar from "./components/NavBar/NavBar";
import SalesHistory from './components/Sales/SalesHistory';
import SidePanel from "./components/SidePanel/SidePanel"; 
import AddProduct from './components/Products/AddProduct';
import ViewProducts from './components/Products/ViewProducts';
import InventoryPage from './components/Inventory/InventoryPage';
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [cart, setCart] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [salesHistory, setSalesHistory] = useState([]);
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      setLoading(false);
    }
  };

  // Default products as fallback if API fails
  const defaultProducts = [
    { 
      id: 1, 
      name: "Tea Bun", 
      price: 50, 
      image: require("./assets/images/tea-bun.jpg"), 
      stockQuantity: 12 
    },
    { 
      id: 2, 
      name: "Fish Bun", 
      price: 70, 
      image: require("./assets/images/fish-bun.jpg"), 
      stockQuantity: 12 
    },
    { 
      id: 3, 
      name: "Chicken Puff", 
      price: 250, 
      image: require("./assets/images/chicken-puff.jpeg"), 
      stockQuantity: 12 
    }
  ];

  // Use API products if available, otherwise use default products
  const displayProducts = products.length > 0 ? products : defaultProducts;

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      
      // Check if adding would exceed available stock
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      if (currentQuantity + 1 > (product.quantity || product.stockQuantity)) {
        alert(`Sorry, only ${product.quantity || product.stockQuantity} ${product.name}(s) available in stock`);
        return prevCart;
      }
      
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item._id !== productId)
    );
  };

  const adjustQuantity = (productId, change) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === productId) {
          const newQuantity = item.quantity + change;
          if (newQuantity < 1) {
            return null; // Will be filtered out
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    
    // Make sure paidAmount is a valid number
    if (!paidAmount || isNaN(paidAmount) || paidAmount < calculateTotal()) {
      alert("Please enter a valid payment amount that covers the total.");
      return;
    }
    
    const sale = {
      // Remove invoiceNumber - let the server assign it
      date: new Date().toISOString(),
      items: cart.map(item => ({
        _id: item._id || item.id, // Ensure _id is included
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: calculateTotal(),
      paidAmount: paidAmount,
      balance: paidAmount - calculateTotal()
    };
  
    console.log("Sending sale data:", sale); // Debug log
  
    // Send the sale to the backend
    fetch('http://localhost:5000/api/sales', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sale)
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw new Error(err.message || "Server responded with an error");
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Sale recorded successfully:', data);
      alert(`Sale completed! Invoice #: ${data.invoiceNumber}`);
      setSalesHistory(prevHistory => [...prevHistory, data]);
      setCart([]);
      setPaidAmount(0);
    })
    .catch(error => {
      console.error('Error recording sale:', error);
      alert(`Failed to record sale: ${error.message}`);
    });
  };

  const handlePaidAmountChange = (e) => {
    setPaidAmount(parseFloat(e.target.value) || 0);
  };

  const calculateBalance = () => {
    return paidAmount - calculateTotal();
  };

  return (
    <Router>
      <div className="app">
        <NavBar />
        <SidePanel />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="pos-container">
                <main>
                  {loading ? (
                    <div className="loading">Loading products...</div>
                  ) : error ? (
                    <div className="error">{error}</div>
                  ) : (
                    <div className="product-grid">
                      {displayProducts.map((product) => (
                        <ProductItem 
                          key={product._id || product.id} 
                          id={product._id || product.id}
                          name={product.name}
                          price={product.price}
                          image={product.imageUrl ? `http://localhost:5000${product.imageUrl}` : (product.image || '/default-product-image.png')}
                          stockQuantity={product.quantity || product.stockQuantity}
                          onAddToCart={() => addToCart(product)} 
                        />
                      ))}
                    </div>
                  )}
                  <Cart 
                    cart={cart} 
                    onRemoveFromCart={removeFromCart} 
                    onAdjustQuantity={adjustQuantity}
                    total={calculateTotal()}
                  />
                  <Payment 
                    total={calculateTotal()} 
                    paidAmount={paidAmount} 
                    onPaidAmountChange={handlePaidAmountChange} 
                  />
                  <CheckoutButton 
                    onCheckout={handleCheckout} 
                    isLoading={isProcessing} 
                    disabled={cart.length === 0 || paidAmount < calculateTotal()}
                  />
                </main>
              </div>
            } />
            <Route path="/sales" element={<SalesHistory sales={salesHistory} />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products" element={<ViewProducts />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
