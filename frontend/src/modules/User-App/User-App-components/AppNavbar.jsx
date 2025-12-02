import { Heart, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export default function AppNavbar() {
  const { wishlistItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 h-14">
        {/* Left: MV store text */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-orange-600">MV store</h1>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-2">
          <Link
            to="/app/wishlist"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-6 h-6 text-gray-700" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {wishlistItems.length > 9 ? "9+" : wishlistItems.length}
              </span>
            )}
          </Link>
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </nav>
  );
}

