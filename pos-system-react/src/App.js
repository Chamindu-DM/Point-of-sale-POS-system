import React, { useState } from "react";
import ProductItem from "./components/Products/ProductItem";
import Cart from "./components/Cart/Cart";
import CheckoutButton from "./components/Checkout/CheckoutButton";
import NavBar from "./components/NavBar/NavBar";
import "./styles.css";

const App = () => {
  const [cart, setCart] = useState([]);

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
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    alert(`Checkout successful! Total: $${calculateTotal().toFixed(2)}`);
    setCart([]); 
  };
// Start of the UI
  return (
    <div className="app">
      <NavBar />
      <div className="pos-container">
        <header>
          <h1>POS System</h1>
        </header>
        <main>
          <div className="product-grid">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                image={product.image}
                name={product.name}
                price={`LKR ${product.price}`}
                stockQuantity={product.stockQuantity}
                onAddToCart={() => addToCart(product)}
              />
            ))}
          </div>
          <Cart 
            cart={cart}
            onRemoveFromCart={removeFromCart}
            onAdjustQuantity={adjustQuantity}
            total={calculateTotal()}
          />
          <CheckoutButton onCheckout={handleCheckout} />
        </main>
      </div>
    </div>
  );
};

export default App;
