import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Layers,
  Package,
  ShoppingCart,
  Store,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <aside
      className={`fixed left-0 top-4 h-[calc(100vh-1rem)] bg-white/90 backdrop-blur-xl border-r border-gray-200/50 shadow-xl z-40 transition-all duration-300 ${
        isMinimized ? "w-24" : "w-64"
      }`}
    >
      <nav className="sidebar p-6 h-full flex flex-col">
        {/* Logo Section with Minimize Button */}
        <div
          className={`mb-8 pb-6 border-b border-blue-200 ${
            isMinimized
              ? "flex flex-col items-center space-y-4"
              : "flex items-center justify-between"
          }`}
        >
          <div
            className={`flex items-center space-x-2 ${
              isMinimized ? "justify-center" : ""
            }`}
          >
            <Store className="w-8 h-8 mt-40 text-blue-600 flex-shrink-0" />
            {!isMinimized && (
              <span className="text-xl font-bold text-blue-700"></span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-blue-100 transition-colors duration-300 text-blue-600 hover:text-blue-700"
            title={isMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {isMinimized ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="space-y-3 flex-1">
          <li>
            <Link
              to="/"
              className={`flex items-center ${
                isMinimized ? "justify-center" : "justify-between"
              } w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-all duration-300 border-l-4 border-transparent hover:border-blue-600 group`}
              title={isMinimized ? "Home" : ""}
            >
              <div
                className={`flex items-center ${
                  isMinimized ? "" : "space-x-3"
                }`}
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {!isMinimized && <span>Home</span>}
              </div>
              {!isMinimized && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/category"
              className={`flex items-center ${
                isMinimized ? "justify-center" : "justify-between"
              } w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-all duration-300 border-l-4 border-transparent hover:border-blue-600 group`}
              title={isMinimized ? "Category" : ""}
            >
              <div
                className={`flex items-center ${
                  isMinimized ? "" : "space-x-3"
                }`}
              >
                <Layers className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {!isMinimized && <span>Category</span>}
              </div>
              {!isMinimized && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/product"
              className={`flex items-center ${
                isMinimized ? "justify-center" : "justify-between"
              } w-full px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-all duration-300 border-l-4 border-transparent hover:border-blue-600 group`}
              title={isMinimized ? "Product" : ""}
            >
              <div
                className={`flex items-center ${
                  isMinimized ? "" : "space-x-3"
                }`}
              >
                <Package className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {!isMinimized && <span>Product</span>}
              </div>
              {!isMinimized && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className={`flex items-center ${
                isMinimized ? "justify-center" : "justify-between"
              } w-full px-4 py-3 bg-blue-600 text-white-200 hover:bg-blue-700 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 group`}
              title={isMinimized ? "Cart" : ""}
            >
              <div
                className={`flex items-center ${
                  isMinimized ? "" : "space-x-3"
                }`}
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {!isMinimized && <span>Cart</span>}
              </div>
              {!isMinimized && (
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          </li>
        </ul>

        {/* Bottom Section */}
        <div className="mt-auto pt-6 border-t border-blue-200">
          <div className={`text-center ${isMinimized ? "px-0" : ""}`}>
            {!isMinimized ? (
              <>
                <p className="text-xs text-gray-500 mb-2">Version 1.0</p>
                <p className="text-xs text-gray-400">© 2023 DESIKART</p>
              </>
            ) : (
              <div
                className="w-2 h-2 bg-blue-600 rounded-full mx-auto"
                title="DESIKART v1.0"
              ></div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
