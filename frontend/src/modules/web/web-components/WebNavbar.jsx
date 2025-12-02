import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";

export default function WebNavbar() {
  const location = useLocation();
  const { cartCount, wishlistItems } = useCart();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navigation bar
        setIsScrolledDown(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show navigation bar
        setIsScrolledDown(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Header - Always visible */}
      <header 
        className="fixed top-0 left-0 right-0 w-full bg-white border-b shadow-sm"
        style={{ zIndex: 50 }}
      >
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[86px] gap-4 sm:gap-8">
            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center gap-3">
              <div className="relative">
                <div className="w-[50px] h-[50px] bg-primary rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 text-white text-xs font-bold">€</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-primary">Appzeto MV store</span>
                <span className="text-xs text-primary/70">Shop Smart, Live Better!</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-[811px] hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products"
                  className="w-full h-[46px] px-4 pr-12 rounded-[20px] border border-gray-300/35 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              </div>
            </div>

            {/* Top Nav Links */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/support" className="text-sm font-semibold text-gray-800/77 hover:text-primary transition">
                Support
              </Link>
              <Link to="/about" className="text-sm font-semibold text-gray-800/77 hover:text-primary transition">
                About Us
              </Link>
              <Link to="/faqs" className="text-sm font-semibold text-gray-800/77 hover:text-primary transition">
                FAQs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Bar - Hides on scroll down */}
      <nav 
        className={`fixed top-[86px] left-0 right-0 w-full transition-all duration-300 ease-in-out ${
          isScrolledDown ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100 pointer-events-auto'
        }`}
        style={{ 
          backgroundColor: 'hsl(var(--primary-light))',
          zIndex: 40
        }}
      >
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Link
                to="/"
                className={`px-4 py-2.5 rounded-[20px] font-semibold text-sm whitespace-nowrap transition ${
                  isHome
                    ? "bg-white text-primary-dark hover:shadow-md"
                    : "text-primary-dark hover:bg-white/50"
                }`}
              >
                Home
              </Link>
                  <Link
                    to="/category"
                    className={`px-4 py-2.5 rounded-[20px] font-semibold text-sm whitespace-nowrap transition ${
                      location.pathname.startsWith("/category")
                        ? "bg-white text-primary-dark hover:shadow-md"
                        : "text-primary-dark hover:bg-white/50"
                    }`}
                  >
                    Category
                  </Link>
              <Link
                to="/products"
                className="px-4 py-2.5 rounded-[20px] text-primary-dark font-semibold text-sm whitespace-nowrap hover:bg-white/50 transition"
              >
                Products
              </Link>
              <Link
                to="/offers"
                className="px-4 py-2.5 rounded-[20px] text-primary-dark font-semibold text-sm whitespace-nowrap hover:bg-white/50 transition"
              >
                Top Offers
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2.5 rounded-[20px] text-primary-dark font-semibold text-sm whitespace-nowrap hover:bg-white/50 transition"
              >
                Contact Us
              </Link>
              <Link
                to="/about"
                className="px-4 py-2.5 rounded-[20px] text-primary-dark font-semibold text-sm whitespace-nowrap hover:bg-white/50 transition"
              >
                About Us
              </Link>
            </div>

            {/* Language Selector and Action Icons */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition">
                <span className="text-sm font-semibold text-primary-dark">En</span>
                <ChevronDown className="w-4 h-4 text-primary-dark" />
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-2">
                <Link
                  to="/cart"
                  className="w-12 h-12 rounded-full border-2 border-primary-light flex items-center justify-center hover:shadow-md transition relative"
                >
                  <ShoppingBag className="w-5 h-5 text-primary-dark" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wishlist"
                  className="w-12 h-12 rounded-full border-2 border-primary-light flex items-center justify-center hover:shadow-md transition relative"
                >
                  <Heart className="w-5 h-5 text-primary-dark" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                      {wishlistItems.length > 99 ? '99+' : wishlistItems.length}
                    </span>
                  )}
                </Link>
                <Link
                  to="/account"
                  className="w-12 h-12 rounded-full border-2 border-primary-light flex items-center justify-center hover:shadow-md transition"
                >
                  <User className="w-5 h-5 text-primary-dark" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

