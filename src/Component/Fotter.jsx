import React from "react";
import { Home, Info, Phone, ShoppingCart, Store } from "lucide-react";
import { Link } from "react-router-dom";
import "./Fotter.css";

export default function Footer() {
  return (
    <div
      className="bg-gradient-to-r from-blue-50 to-white border-t-2 border-blue-100 mt-auto ml-64 transition-all duration-300"
      style={{ width: "calc(100vw - 256px)" }}
    >
      <footer className="footer px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                🏪
              </div>
              <h3 className="text-2xl font-bold text-blue-600">DESIKART</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Your trusted online shopping destination for quality products with
              fast delivery and excellent customer service.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="w-4 h-4 text-blue-600">✉️</span>
                <span className="text-sm">support@desikart.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="w-4 h-4 text-blue-600">📞</span>
                <span className="text-sm">+91 7440 528 001</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="w-4 h-4 text-blue-600">📍</span>
                <span className="text-sm">indore, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span className="w-5 h-5 text-blue-600">➤</span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Contact</span>
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>Terms of Service</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
              <span className="w-5 h-5 text-blue-600">🛡️</span>
              <span>Our Services</span>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-600">
                <span className="w-4 h-4 text-blue-600">🚚</span>
                <span className="text-sm">Free Shipping</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <span className="w-4 h-4 text-blue-600">💳</span>
                <span className="text-sm">Secure Payment</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-600">
                <span className="w-4 h-4 text-blue-600">🛡️</span>
                <span className="text-sm">Quality Guarantee</span>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <div className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span>24/7 Support</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Follow Us</h4>
            <p className="text-gray-600 text-sm">
              Stay connected for updates and offers!
            </p>

            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 group"
                aria-label="Facebook"
              >
                <span className="text-sm">📘</span>
              </a>
              <a
                href="#"
                className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 group"
                aria-label="Twitter"
              >
                <span className="text-sm">🐦</span>
              </a>
              <a
                href="#"
                className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 group"
                aria-label="Instagram"
              >
                <span className="text-sm">📷</span>
              </a>
              <a
                href="#"
                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 group"
                aria-label="YouTube"
              >
                <span className="text-sm">📺</span>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-gray-800 mb-2">
                Newsletter
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300 flex items-center">
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span>for better shopping experience</span>
            </div>

            <div className="flex space-x-6 text-sm">
              <a
                href="/shipping"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                Shipping Info
              </a>
              <a
                href="/returns"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                Returns
              </a>
              <a
                href="/faq"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-blue-100">
            <p className="text-sm text-gray-500">
              © 2023 DESIKART. All rights reserved. | Designed & Developed with
              ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
