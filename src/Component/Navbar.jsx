import React, { useState, useEffect } from "react";
import { Home, Info, Phone, ShoppingCart, Store, Search } from "lucide-react";
import { Link } from "react-router-dom";

// Navbar Component
export default function Navbar({ onSearchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const placeholders = [
    "Search for products...",
    "Find your favorite items...",
    "Discover new arrivals...",
    "Search electronics, fashion & more...",
    "What are you looking for today?",
  ];

  const getPlaceholder = () => {
    if (searchQuery.length === 0) return placeholders[0];
    if (searchQuery.length <= 2) return placeholders[1];
    if (searchQuery.length <= 5) return placeholders[2];
    if (searchQuery.length <= 8) return placeholders[3];
    return placeholders[4];
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        console.log("Search results:", data.products);

        // Call the callback function to pass results to parent component
        if (onSearchResults) {
          onSearchResults(data.products, searchQuery);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white h-20 shadow-lg border-b-2 border-blue-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Store className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-600 tracking-wide hover:text-blue-700 transition-colors duration-300">
              DESIKART
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isLoading ? "animate-spin" : ""
                    }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={getPlaceholder()}
                  disabled={isLoading}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-full text-gray-700 bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isFocused ? "bg-white shadow-lg" : "hover:bg-white"
                    } ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50 group"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50 group"
              >
                <Info className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link
                to="/Account"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-blue-50 group"
              >
                <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Account</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span>Cart</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
