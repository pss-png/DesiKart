import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Heart,
  ArrowLeft,
} from "lucide-react";

export default function Productdetail({ addToCart }) {
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  function handleCart() {
    if (!addToCart) {
      console.warn("addToCart function not provided");
      return;
    }

    // Add multiple quantities of the same product
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        selectedImage: selectedImage,
      });
    }

    // Success feedback
    alert(`Added ${quantity} ${product.title} to cart!`);

    // Reset quantity after adding to cart
    setQuantity(1);
  }

  const handleBuyNow = () => {
    handleCart();
    navigate("/cart");
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // You can add wishlist functionality here
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 font-medium">
                Loading product details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product || !product.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="text-6xl text-gray-400 mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Product Not Found
              </h2>
              <p className="text-gray-600 mb-4">
                {error || "The product you're looking for doesn't exist."}
              </p>
              <button
                onClick={goBack}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Back Button */}
        <button
          onClick={goBack}
          className="mb-6 flex items-center space-x-2 text-purple hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Product Images Section */}
              <div className="p-8 lg:p-12 bg-gray-50">
                <div className="sticky top-8">
                  {/* Main Image */}
                  <div className="mb-6 relative group">
                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[selectedImage]
                          : product.thumbnail
                      }
                      alt={product.title}
                      className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/500x500?text=Image+Not+Found";
                      }}
                    />

                    {/* Wishlist Button */}
                    <button
                      onClick={toggleWishlist}
                      className={`absolute top-4 right-4 w-12 h-12 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${isWishlisted
                          ? "bg-red-500 text-red w-13 h-13 hover:bg-red-600"
                          : "bg-red text-red-600 hover:bg-gray-100"
                        }`}
                    >
                      <Heart
                        className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""
                          }`}
                      />
                    </button>

                    {/* Discount Badge */}
                    {product.discountPercentage && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        -{Math.round(product.discountPercentage)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {product.images && product.images.length > 1 && (
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className={`w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-xl cursor-pointer transition-all duration-300 flex-shrink-0 ${selectedImage === index
                              ? "ring-4 ring-blue-500 shadow-lg transform scale-105"
                              : "hover:shadow-md hover:scale-105 opacity-70 hover:opacity-100"
                            }`}
                          onClick={() => handleImageSelect(index)}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="p-8 lg:p-12">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-blue-600 font-semibold bg-blue-100 px-4 py-2 rounded-full capitalize">
                      {product.category}
                    </span>
                    {product.brand && (
                      <span className="text-sm text-gray-500 font-medium">
                        by {product.brand}
                      </span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium text-gray-700">
                      {product.rating} ({Math.floor(Math.random() * 500) + 100}{" "}
                      reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    {product.discountPercentage && (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg text-gray-500 line-through">
                          $
                          {(
                            product.price /
                            (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                        <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                          {Math.round(product.discountPercentage)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${product.stock > 10
                          ? "bg-green-500"
                          : product.stock > 0
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">
                      {product.stock > 10
                        ? "In Stock"
                        : product.stock > 0
                          ? `Only ${product.stock} left`
                          : "Out of Stock"}
                    </span>
                  </div>

                  {/* Quantity Selector */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Quantity
                    </h3>
                    <div className="flex items-center bg-white text-black space-x-4">
                      <div className="flex items-center space-x-2 bg-white rounded-full p-2 border border-gray-200">
                        <button
                          onClick={decrementQuantity}
                          className="w-10 h-10 bg-white-100 text-white hover:bg-white-200 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm disabled:opacity-50"
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4 text-black" />
                        </button>
                        <span className="text-xl font-semibold w-16 text-center text-black">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200 shadow-sm disabled:opacity-50"
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="w-4 h-4 text-black" />
                        </button>
                      </div>
                    </div>
                    <span className="text-lg text-gray-600">
                      Total:{" "}
                      <span className="font-bold text-blue-600">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-6">
                  <button
                    onClick={handleCart}
                    disabled={product.stock === 0}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="w-full px-8 py-4 bg-purple-100 text-white-700 text-lg font-semibold rounded-2xl hover:bg-purple-200 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Product Specifications */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.brand && (
                      <div className="flex justify-between py-2">
                        <span className="font-medium text-gray-700">
                          Brand:
                        </span>
                        <span className="text-gray-600">{product.brand}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2">
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium text-gray-700">Stock:</span>
                      <span className="text-gray-600">
                        {product.stock} units
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium text-gray-700">SKU:</span>
                      <span className="text-gray-600">
                        #{product.id.toString().padStart(6, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}