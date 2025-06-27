import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar";
import Sidebar from "./Component/Sidebar";
import Footer from "./Component/Fotter"; // Fixed import name

import Home from "./Pages/Home.jsx";
import Product from "./Pages/Product.jsx";
import Category from "./Pages/Category.jsx";
import Productdetail from "./Pages/Productdetail.jsx";
import Cart from "./Pages/Cart.jsx";
import About from "./Pages/About.jsx"; // Add About page import
import Account from "./Pages/Account.jsx";
import Subproduct from "./Pages/Subproduct.jsx";


export default function App() {
  const [isMinimized, setIsMinimized] = useState(false);
  // Cart state add करें
  const [cartProducts, setCartProducts] = useState([]);

  // Cart में product add करने का function
  const addToCart = (product) => {
    setCartProducts([...cartProducts, product]);
    console.log(`${product.title} added to cart!`);
  };

  // Cart से product remove करने का function
  const removeFromCart = (productId) => {
    setCartProducts(cartProducts.filter((product) => product.id !== productId));
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 ml-64 mb-15 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/product"
                element={<Product addToCart={addToCart} />}
              />
              <Route path="/category" element={<Category />} />
              <Route path="/about" element={<About />} />{" "}
              {/* Updated About route */}
              <Route path="/Account" element={<Account />} />
              <Route
                path="/productdetail/:id"
                element={<Productdetail addToCart={addToCart} />}
              />
              /* Fixed Cart route with proper props */
              <Route
                path="/cart"
                element={
                  <Cart
                    Cart_Products={cartProducts}
                    removeFromCart={removeFromCart}
                  />
                }
              />
              <Route path="/productsBy/:category" element={<Subproduct />} />
            </Routes>
          </div>
        </div>
        <Footer /> {/* Fixed component call */}
      </BrowserRouter>
    </div>
  );
}
