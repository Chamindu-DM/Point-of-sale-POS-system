import React, { useState } from "react";
import ProductItem from "./components/Products/ProductItem";
import Cart from "./components/Cart/Cart";
import CheckoutButton from "./components/Checkout/CheckoutButton";
import Payment from "./components/Payment/Payment";
import NavBar from "./components/NavBar/NavBar";
import SalesHistory from './components/Sales/SalesHistory';
import SidePanel from "./components/SidePanel/SidePanel"; 
import AddProduct from './components/Products/AddProduct';
import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [cart, setCart] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [salesHistory, setSalesHistory] = useState([]);
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const products = [
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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.name !== productName)
    );
  };

  const adjustQuantity = (productName, change) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.name === productName) {
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
    
    const sale = {
      invoiceNumber: currentInvoiceNumber,
      date: new Date().toISOString(),
      items: [...cart],
      total: calculateTotal(),
      paidAmount: paidAmount,
      balance: paidAmount - calculateTotal()
    };

    setSalesHistory([...salesHistory, sale]);
    setCurrentInvoiceNumber(prev => prev + 1);
    setCart([]);
    setPaidAmount(0);
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
                <header><h1>POS System</h1></header>
                <main>
                  <div className="product-grid">
                    {products.map((product) => (
                      <ProductItem key={product.id} {...product} onAddToCart={() => addToCart(product)} />
                    ))}
                  </div>
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
                  <CheckoutButton onCheckout={handleCheckout} />
                </main>
              </div>
            } />
            <Route path="/sales" element={<SalesHistory sales={salesHistory} />} />
            <Route path="/products/add" element={<AddProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
