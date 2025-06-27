import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about bringing you the best products with
            exceptional quality and outstanding service
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded with a vision to revolutionize online shopping, we've been
              committed to providing our customers with an exceptional
              experience since day one. Our journey began with a simple idea:
              make quality products accessible to everyone.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we're proud to serve thousands of satisfied customers
              worldwide, offering a carefully curated selection of products that
              meet the highest standards of quality and value.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To empower our customers by providing them with access to
              high-quality products, exceptional service, and an seamless
              shopping experience that exceeds expectations.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe in building lasting relationships with our customers
              through trust, reliability, and continuous innovation in
              everything we do.
            </p>
          </div>
        </div>

        {/* Features/Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">Q</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Premium Quality
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every product is carefully selected and tested to ensure it
                meets our high standards of quality and durability.
              </p>
            </div>

            {/* Fast Shipping */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Fast Shipping
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quick and reliable delivery service to get your products to you
                as fast as possible, wherever you are.
              </p>
            </div>

            {/* Customer Support */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">♥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated customer support team is always ready to help you
                with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <p className="text-gray-600 font-medium">Happy Customers</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <p className="text-gray-600 font-medium">Products Sold</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                99%
              </div>
              <p className="text-gray-600 font-medium">Satisfaction Rate</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                5+
              </div>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers and discover amazing products
            today
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg">
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
}
