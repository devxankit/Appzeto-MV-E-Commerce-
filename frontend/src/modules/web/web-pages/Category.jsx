import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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

export default function Category() {
  const { categoryName } = useParams();
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const { addToast } = useToast();
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [addingToCart, setAddingToCart] = useState({});
  const [heartKeys, setHeartKeys] = useState({});

  // Decode category name from URL
  const decodedCategory = decodeURIComponent(categoryName || "");

  // Get all unique categories for sidebar
  const allCategories = ["All", ...new Set(allProducts.map((p) => p.category))];

  // Filter products by category
  const categoryProducts = decodedCategory
    ? allProducts.filter((p) => p.category === decodedCategory)
    : allProducts;

  // Apply price filter
  const priceFilteredProducts = categoryProducts.filter(
    (p) => parseFloat(p.price) >= priceRange[0] && parseFloat(p.price) <= priceRange[1]
  );

  // Sort products
  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // Get category display name
  const categoryDisplayName = decodedCategory || "All Categories";

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <nav className="text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Category</span>
              {decodedCategory && (
                <>
                  <span className="mx-2">/</span>
                  <span className="text-foreground">{categoryDisplayName}</span>
                </>
              )}
            </nav>
            <h1 className="text-3xl font-bold">{categoryDisplayName}</h1>
            <p className="text-muted-foreground mt-1">
              {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"} found
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <Card className="border-0 shadow-md sticky top-[186px]">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    Filters
                  </h3>
                  <Separator className="mb-4" />

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Category</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      <Link
                        to="/category"
                        className={`block w-full text-left px-3 py-2 rounded-md transition ${
                          !decodedCategory
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                      >
                        All Categories
                      </Link>
                      {allCategories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <Link
                            key={category}
                            to={`/category/${encodeURIComponent(category)}`}
                            className={`block w-full text-left px-3 py-2 rounded-md transition ${
                              decodedCategory === category
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                            }`}
                          >
                            {category}
                          </Link>
                        ))}
                    </div>
                  </div>

                  <Separator className="mb-4" />

                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold mb-3">Price Range</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">
                          Min: ${priceRange[0].toLocaleString()}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([parseInt(e.target.value), priceRange[1]])
                          }
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">
                          Max: ${priceRange[1].toLocaleString()}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], parseInt(e.target.value)])
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100000"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              parseInt(e.target.value) || 0,
                              priceRange[1],
                            ])
                          }
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100000"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              parseInt(e.target.value) || 100000,
                            ])
                          }
                          className="w-full px-2 py-1 border rounded text-sm"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPriceRange([0, 100000]);
                      setSortBy("default");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Sort and View Options */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} of {categoryProducts.length} products
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="rating">Rating: High to Low</option>
                  </select>
                </div>
              </div>

              {sortedProducts.length === 0 ? (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-12 text-center">
                    <p className="text-lg text-muted-foreground mb-4">
                      No products found in this category.
                    </p>
                    <Button asChild variant="outline">
                      <Link to="/products">Browse All Products</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
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
                              {product.rating > 0 && (
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({product.rating})
                                </span>
                              )}
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
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

