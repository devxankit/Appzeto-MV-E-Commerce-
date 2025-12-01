import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Check } from "lucide-react";
import { motion } from "framer-motion";
import WebNavbar from "../web-components.jsx/WebNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";
import { Star } from "lucide-react";

export default function Wishlist() {
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

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <WebNavbar />
        <div className="h-[166px]"></div>
        <main className="w-full bg-white">
          <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-6">
                Start adding items you love to your wishlist!
              </p>
              <Button asChild size="lg">
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md"
              >
                <div className="relative aspect-[280/200] overflow-hidden bg-muted">
                  {product.discount && (
                    <Badge
                      variant="destructive"
                      className="absolute top-3 right-3 z-10 shadow-md"
                    >
                      -{product.discount}%
                    </Badge>
                  )}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 left-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-background transition shadow-sm hover:shadow-md"
                  >
                    <Heart className="w-4 h-4 text-destructive fill-destructive" />
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-heading font-semibold text-foreground line-clamp-2 min-h-[2.5rem] hover:text-primary transition">
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
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-muted text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-xl font-bold text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm line-through text-muted-foreground">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(product)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

