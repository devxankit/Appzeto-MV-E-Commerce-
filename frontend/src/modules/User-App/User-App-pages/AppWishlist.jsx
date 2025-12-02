import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Check } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "../User-App-components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Star } from "lucide-react";

export default function AppWishlist() {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product) => {
    const success = addToCart(product, 1);
    if (success !== false) {
      addToast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
        icon: <Check className="w-5 h-5 text-green-600" />,
        duration: 2000,
      });
    }
  };

  const handleRemoveFromWishlist = (product) => {
    removeFromWishlist(product.id);
    addToast({
      title: "Removed from Wishlist",
      description: `${product.name} has been removed from your wishlist.`,
      icon: <Heart className="w-5 h-5 text-gray-600" />,
      duration: 2000,
    });
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 1000) {
      return `₹${numPrice.toLocaleString("en-IN")}`;
    }
    return `₹${price}`;
  };

  if (wishlistItems.length === 0) {
    return (
      <AppLayout>
        <div className="min-h-screen w-full bg-gray-50">
          <main className="w-full bg-white">
            <section className="px-4 py-12">
              <div className="text-center">
                <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
                <p className="text-muted-foreground mb-6">
                  Start adding items you love to your wishlist!
                </p>
                <Button asChild size="lg">
                  <Link to="/app/home">Continue Shopping</Link>
                </Button>
              </div>
            </section>
          </main>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen w-full bg-gray-50">
        <main className="w-full bg-white">
          <section className="px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground text-sm">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {wishlistItems.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    {product.discount && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2 right-2 z-10 shadow-md text-xs"
                      >
                        -{product.discount}%
                      </Badge>
                    )}
                    <button
                      onClick={() => handleRemoveFromWishlist(product)}
                      className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 hover:bg-gray-100 transition shadow-sm"
                    >
                      <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                    </button>
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                  </div>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-foreground line-clamp-2 min-h-10 hover:text-primary transition text-sm">
                          {product.name}
                        </h3>
                      </Link>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < product.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-base font-bold text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs line-through text-muted-foreground">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button
                        type="button"
                        className="w-full"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
    </AppLayout>
  );
}

