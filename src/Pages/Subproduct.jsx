import React, { useState, useEffect } from "react";

export default function SubProducts({
  Search,
  Cart_Products,
  set_Cart_Products,
}) {
  // Get category from URL path (you'll use useParams() in your actual app)
  const category = window.location.pathname.split("/").pop();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        console.log("Fetching products for category:", category);
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        console.log("All products fetched:", data.products.length);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (category && products.length > 0) {
      console.log("Filtering products for category:", category);

      // Decode the category parameter in case it was URL encoded
      const decodedCategory = decodeURIComponent(category);

      const filtered = products.filter((product) => {
        const productCategory = product.category;
        console.log("Comparing:", productCategory, "with", decodedCategory);
        return productCategory === decodedCategory;
      });

      console.log("Filtered products found:", filtered.length);
      setFilteredProducts(filtered);
    }
  }, [products, category]);

  // Apply search filter if Search prop is provided
  const displayProducts = Search
    ? filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(Search.toLowerCase()) ||
          product.description.toLowerCase().includes(Search.toLowerCase())
      )
    : filteredProducts;

  const addToCart = (product) => {
    const existingProduct = Cart_Products.find(
      (item) => item.id === product.id
    );
    if (existingProduct) {
      set_Cart_Products(
        Cart_Products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      set_Cart_Products([...Cart_Products, { ...product, quantity: 1 }]);
    }
    console.log("Added to cart:", product.title);
  };

  const navigateToProductDetails = (productId) => {
    // In your actual app, you'll use: navigate(`/productdetails/${productId}`)
    window.location.href = `/productdetails/${productId}`;
  };

  const navigateToCategory = () => {
    // In your actual app, you'll use: navigate('/category')
    window.location.href = "/category";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <button
              onClick={navigateToCategory}
              className="mb-4 inline-flex items-center px-4 py-2 text-blue-600 hover:text-purple-600 transition-colors font-medium"
            >
              ← Back to Categories
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">
              {decodeURIComponent(category || "").replace(/-/g, " ")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of{" "}
              {decodeURIComponent(category || "").replace(/-/g, " ")} products
              designed to elevate your lifestyle
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Showing {displayProducts.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {displayProducts.length > 0 ? (
            displayProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden h-64">
                  <img
                    src={
                      item.images?.[0] || "https://via.placeholder.com/300x300"
                    }
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300";
                    }}
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-4 right-4 space-y-2">
                      <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                        <svg
                          className="w-5 h-5 text-gray-600 hover:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigateToProductDetails(item.id)}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  {item.discountPercentage && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                        -{Math.round(item.discountPercentage)}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(item.rating || 4)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      ({item.rating || "4.0"})
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3
                    className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer"
                    onClick={() => navigateToProductDetails(item.id)}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${item.price}
                    </span>
                    {item.discountPercentage && (
                      <span className="text-sm text-gray-500 line-through">
                        $
                        {Math.round(
                          item.price * (1 + item.discountPercentage / 100)
                        )}
                      </span>
                    )}
                  </div>

                  {/* Stock Info */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      Stock: {item.stock || "Available"}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <button
                      onClick={() => navigateToProductDetails(item.id)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold flex items-center justify-center space-x-2"
                      disabled={item.stock === 0}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5H9.5"
                        />
                      </svg>
                      <span>
                        {item.stock === 0 ? "Out of Stock" : "Add To Cart"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                {Search
                  ? `No products match your search "${Search}" in this category.`
                  : `No products found in the "${decodeURIComponent(
                      category || ""
                    )}" category.`}
              </p>
              <button
                onClick={navigateToCategory}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
              >
                Browse Other Categories
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
