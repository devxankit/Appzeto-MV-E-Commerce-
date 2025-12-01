import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Sliders, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WebNavbar from "../web-components.jsx/WebNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { allProducts } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Products() {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [addingToCart, setAddingToCart] = useState({});
  const [heartKeys, setHeartKeys] = useState({});

  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">All Products</h1>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Filters
                  </h3>
                  <Separator className="mb-4" />

                  <div>
                    <h4 className="font-semibold mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-md transition ${
                            selectedCategory === category
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {sortedProducts.length} products
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md"
                  >
                    <Link to={`/product/${product.id}`}>
                      <div className="relative aspect-[280/200] overflow-hidden bg-muted">
                        {product.discount && (
                          <Badge
                            variant="destructive"
                            className="absolute top-3 right-3 z-10 shadow-md"
                          >
                            -{product.discount}%
                          </Badge>
                        )}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <motion.button
                                key={heartKeys[product.id] || 0}
                                type="button"
                                className="absolute top-3 left-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-background transition shadow-sm hover:shadow-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  const inWishlist = isInWishlist(product.id);
                                  setHeartKeys(prev => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
                                  
                                  if (inWishlist) {
                                    removeFromWishlist(product.id);
                                    addToast({
                                      title: "Removed from Wishlist",
                                      description: `${product.name} has been removed from your wishlist.`,
                                      icon: <Heart className="w-5 h-5 text-gray-600" />,
                                      duration: 2000,
                                    });
                                  } else {
                                    addToWishlist(product);
                                    addToast({
                                      title: "Added to Wishlist!",
                                      description: `${product.name} has been added to your wishlist.`,
                                      icon: <Heart className="w-5 h-5 text-red-600 fill-red-600" />,
                                      duration: 2000,
                                    });
                                  }
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                animate={{ 
                                  scale: isInWishlist(product.id) ? [1, 1.3, 1] : 1,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={isInWishlist(product.id) ? "filled" : "outline"}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0, rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <Heart
                                      className={`w-4 h-4 transition-colors duration-300 ${
                                        isInWishlist(product.id)
                                          ? "text-red-600 fill-red-600"
                                          : "text-gray-600"
                                      }`}
                                    />
                                  </motion.div>
                                </AnimatePresence>
                              </motion.button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {isInWishlist(product.id)
                                  ? "Remove from Wishlist"
                                  : "Add to Wishlist"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Link>
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
                    <CardFooter className="p-4 pt-0">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="button"
                          className="w-full"
                          size="sm"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setAddingToCart(prev => ({ ...prev, [product.id]: true }));
                            const success = addToCart(product, 1);
                            if (success !== false) {
                              addToast({
                                title: "Added to Cart!",
                                description: `${product.name} has been added to your cart.`,
                                icon: <Check className="w-5 h-5 text-green-600" />,
                                duration: 2000,
                              });
                            }
                            setTimeout(() => {
                              setAddingToCart(prev => {
                                const newState = { ...prev };
                                delete newState[product.id];
                                return newState;
                              });
                            }, 300);
                          }}
                          disabled={addingToCart[product.id]}
                        >
                          <motion.div
                            animate={addingToCart[product.id] ? { rotate: 360 } : { rotate: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                          </motion.div>
                          {addingToCart[product.id] ? 'Adding...' : 'Add to Cart'}
                        </Button>
                      </motion.div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

