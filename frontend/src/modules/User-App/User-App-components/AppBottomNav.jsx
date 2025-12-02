import { Link, useLocation } from "react-router-dom";
import { Home, Grid3x3, Crown, ShoppingCart, User } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export default function AppBottomNav() {
  const location = useLocation();
  const { cartCount } = useCart();

  const navItems = [
    { icon: Home, label: "Home", path: "/app/home" },
    { icon: Grid3x3, label: "Categories", path: "/app/categories" },
    { icon: Crown, label: "Explore", path: "/app/explore" },
    { icon: ShoppingCart, label: "Cart", path: "/app/cart" },
    { icon: User, label: "Profile", path: "/app/profile" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          const isCart = item.path === "/app/cart";

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                active
                  ? "text-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 ${active ? "text-orange-600" : ""}`}
                />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-orange-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

