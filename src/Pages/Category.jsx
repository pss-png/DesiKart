import React, { useState, useEffect } from "react";

export default function Category() {
  const [allCategory, setAllCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        console.log("Fetching categories...");
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        console.log("API Response:", data);

        const allProducts = data.products;
        const allCategories = [
          ...new Set(allProducts.map((product) => product.category)),
        ];
        console.log("Categories found:", allCategories);
        setAllCategory(allCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleCategoryClick = (category) => {
    console.log("Navigating to category:", category);
    // In your actual app, you'll use: navigate(`/productsBy/${encodeURIComponent(category)}`);
    window.location.href = `/productsBy/${encodeURIComponent(category)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Product Categories
          </h1>
          <p className="text-xl text-gray-600">
            Explore our diverse range of product categories
          </p>
          <div className="mt-4 text-sm text-gray-500">
            {allCategory.length} categories available
          </div>
        </div>

        {allCategory.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allCategory.map((category, index) => (
              <div
                key={category}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="p-6 text-center">
                  {/* Category Icon/Image with gradient */}
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-2xl">
                      {category.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {category.replace(/-/g, " ")}
                  </h2>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category);
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
                    >
                      Explore Products
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
