import { Link } from "react-router-dom";

export default function WebFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-gray-800">
          <div className="flex items-start gap-4">
            <div className="text-2xl">📍</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Find Us</h3>
              <p className="text-gray-400">
                Time Square Empire, WRTeam, Mirzapar Highway, Bhuj, Kutch, Gujarat - 370001
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl">📞</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
              <p className="text-gray-400">1234567890</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-2xl">✉️</div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Mail Us</h3>
              <p className="text-gray-400">appzetomvstore@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Subscribe */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Appzeto MV store</h2>
            <h3 className="text-xl font-bold text-white mb-4">Subscribe</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition">
                <span className="text-white">𝕏</span>
              </button>
              <button className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition">
                <span className="text-white">📷</span>
              </button>
              <button className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-gray-800 transition">
                <span className="text-white">▶️</span>
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/category" className="text-gray-400 hover:text-white transition">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition">
                  Terms & Condition
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-400 hover:text-white transition">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-heading font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/android" className="text-gray-400 hover:text-white transition">
                  Android App
                </Link>
              </li>
              <li>
                <Link to="/ios" className="text-gray-400 hover:text-white transition">
                  Ios App
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white transition">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            Copyright © 2024 - 2025 Appzeto MV store - ecommerce, All Right Reserved WRTeam.
          </p>
        </div>
      </div>
    </footer>
  );
}

