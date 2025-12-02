import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WebNavbar from "../web-components/WebNavbar";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";
import WebFooter from "../web-components/WebFooter";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Autoplay from "embla-carousel-autoplay";
import { allProducts } from "../../../data/products";

export default function WebHome() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  const banners = [
    {
      id: 1,
      image: banner1,
      alt: "Promotional Banner 1"
    },
    {
      id: 2,
      image: banner2,
      alt: "Promotional Banner 2"
    },
    {
      id: 3,
      image: banner3,
      alt: "Promotional Banner 3"
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      
      {/* Spacer for fixed navbar */}
      <div className="h-[166px]"></div>
      
      {/* Main Content Container */}
      <main className="w-full bg-white overflow-x-hidden">

      {/* Hero Banner Carousel */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {banners.map((banner) => (
                <CarouselItem key={banner.id} className="pl-0 basis-full">
                  <div className="relative w-full h-full">
                    <img
                      src={banner.image}
                      alt={banner.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current
                    ? "w-3 h-3 bg-primary"
                    : "w-2 h-2 bg-black/20 hover:bg-black/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-medium text-gray-800">Popular Categories</h2>
          <Link
            to="/category"
            className="px-6 py-2.5 bg-primary-light text-primary rounded-md shadow hover:shadow-md transition text-sm"
          >
            View More
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-gray-50 transition group"
            >
              <div className="w-full aspect-153/120 bg-white rounded-lg p-1.5 mb-2.5 overflow-hidden group-hover:shadow-md transition">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-sm font-heading font-semibold text-gray-800 text-center leading-tight">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-semibold text-foreground">Brands</h2>
          <Button asChild variant="outline" size="sm">
            <Link to="/brands">See All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.slug}`}
              className="flex flex-col items-center p-2.5 rounded-lg hover:bg-gray-50 transition group"
            >
              <div className="w-full aspect-153/100 bg-white rounded-lg p-4 mb-2.5 flex items-center justify-center group-hover:shadow-md transition">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-sm font-heading font-semibold text-gray-800 text-center">{brand.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="bg-linear-to-r from-red-500 to-pink-500 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">⚡ Flash Sale</h2>
              <p className="text-lg">Limited Time Offer - Up to 70% OFF</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">02</div>
                <div className="text-xs text-white/80">Hours</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">45</div>
                <div className="text-xs text-white/80">Minutes</div>
              </div>
              <div className="text-center bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">30</div>
                <div className="text-xs text-white/80">Seconds</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newly Launched Smartphones */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[880px_1fr] gap-3">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">
                  Newly Launched Smartphones
                </h2>
                <Badge variant="destructive" className="text-base px-3 py-1">
                  Instant 50% Discount
                </Badge>
              </div>
              <Button asChild variant="outline" size="sm" className="hidden md:flex">
                <Link to="/smartphones">View More</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allProducts.filter(p => p.category === "Smartphone").map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop"
              alt="Featured Phone"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">🔥 Trending Now</h2>
            <p className="text-lg text-muted-foreground">Most Popular Products This Week</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/trending">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">⭐ Best Sellers</h2>
            <p className="text-lg text-muted-foreground">Top Rated Products</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/bestsellers">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {bestSellers.map((product) => (
            <HorizontalProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Living Sofa */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">Best living sofa</h2>
            <p className="text-lg text-muted-foreground">Best living sofa</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/furniture">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {allProducts.filter(p => p.category === "Footwear").map((product) => (
            <HorizontalProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Biggest Deals */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[416px_1fr] gap-3">
          <Card className="hidden lg:block overflow-hidden border-0 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
              alt="Fashion"
              className="w-full h-full object-cover"
            />
          </Card>
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">
                  BIGGEST DEALS ON TOP BRANDS
                </h2>
                <Badge variant="secondary" className="text-base px-3 py-1">
                  Man's Fashion
                </Badge>
              </div>
              <Button asChild variant="outline" size="sm" className="hidden md:flex">
                <Link to="/fashion">View More</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {fashionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">✨ New Arrivals</h2>
            <p className="text-lg text-muted-foreground">Latest Products Just In</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/new-arrivals">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Daily Grocery & Watch on Sale */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">🛒 Daily Grocery Needs</h2>
            <p className="text-lg text-muted-foreground">Fresh Vegetables, Fruits & Groceries</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/groceries">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {groceryProductsData.map((product) => (
            <ProductCard key={product.id} product={product} size="large" />
          ))}
        </div>
      </section>

      {/* Watch on Sale */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">⌚ Watch on sale</h2>
            <Badge variant="default" className="text-base px-3 py-1">
              WATCH ON SALE
            </Badge>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/watches">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {watchProducts.map((product) => (
            <ProductCard key={product.id} product={product} size="large" />
          ))}
        </div>
      </section>

      {/* Top Rated Products */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-heading font-semibold text-foreground mb-1">⭐ Top Rated Products</h2>
            <p className="text-lg text-muted-foreground">Highest Customer Ratings</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to="/top-rated">View More</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {topRatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="overflow-hidden border-0 shadow-lg relative group">
            <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop"
                alt="Electronics Sale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Electronics Sale</h3>
                  <p className="text-lg mb-3">Up to 50% OFF on all electronics</p>
                  <Button variant="secondary" asChild>
                    <Link to="/electronics">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden border-0 shadow-lg relative group">
            <div className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop"
                alt="Fashion Week"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Fashion Week</h3>
                  <p className="text-lg mb-3">New collection with 40% discount</p>
                  <Button variant="secondary" asChild>
                    <Link to="/fashion">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Mobile App Promotion */}
      <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/dba3d33100eff1159badd6f31cd56590bff81850?width=1272"
              alt="Mobile App"
              className="w-full max-w-[636px] mx-auto"
            />
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-heading font-medium text-gray-800 mb-3">Appzeto MV store Mobile App</h2>
            <p className="text-2xl text-gray-600 mb-4">Affordable Ecommerce Platform</p>
            <p className="text-gray-600 mb-6">
              Shop with us at affordable prices and get exciting cashback & offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/" className="inline-block">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/09e0655aac0dc39cad8ba527512f67ae4ae2a687?width=300"
                  alt="Download on App Store"
                  className="h-11"
                />
              </Link>
              <Link to="/" className="inline-block">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/fdd11c2e885d4c4a1b1a81dfdecde7188c5dfbce?width=300"
                  alt="Get it on Google Play"
                  className="h-11"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-primary-light py-8">
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🚚"
              title="Free Shipping"
              description="Free Shipping at your door step."
            />
            <FeatureCard
              icon="↩️"
              title="Free Returns"
              description="Free return if products are damaged."
            />
            <FeatureCard
              icon="📞"
              title="Support 24/7"
              description="24/7 and 365 days support is available."
            />
            <FeatureCard
              icon="🔒"
              title="100% Safe & Secure"
              description="100% safe & secure."
            />
          </div>
        </div>
      </section>
      </main>

      <WebFooter />
    </div>
  );
}

// Product Card Component - Enhanced with Radix UI
function ProductCard({ product, size = "default" }) {
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const { addToast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [heartKey, setHeartKey] = useState(0);
  const isLarge = size === "large";
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!product || !product.id) {
      console.error('Invalid product:', product);
      return;
    }

    setIsAdding(true);
    
    // Call addToCart function
    const success = addToCart(product, 1);
    
    if (success !== false) {
      addToast({
        title: "Added to Cart!",
        description: `${product.name} has been added to your cart.`,
        icon: <Check className="w-5 h-5 text-green-600" />,
        duration: 2000,
      });
      // Visual feedback - show "Adding..." for 300ms
      setTimeout(() => {
        setIsAdding(false);
      }, 300);
    } else {
      setIsAdding(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product || !product.id) return;
    
    setHeartKey(prev => prev + 1);
    
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
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md">
      <div className="relative aspect-280/200 overflow-hidden bg-muted">
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
                key={heartKey}
                type="button"
                className="absolute top-3 left-3 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center z-10 hover:bg-background transition shadow-sm hover:shadow-md"
                onClick={handleWishlistToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: inWishlist ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={inWishlist ? "filled" : "outline"}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors duration-300 ${
                        inWishlist 
                          ? "text-red-600 fill-red-600" 
                          : "text-gray-600"
                      }`} 
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
            <h3 className="font-heading font-semibold text-foreground line-clamp-2 min-h-10 hover:text-primary transition">
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
            <span className="text-xs text-muted-foreground ml-1">
              ({product.rating || 0})
            </span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm line-through text-muted-foreground">
                  ${product.originalPrice}
                </span>
              </>
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
            onClick={handleAddToCart}
            disabled={isAdding || !product || !product.id}
          >
            <motion.div
              animate={isAdding ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
            </motion.div>
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
}

// Horizontal Product Card - Enhanced with Radix UI
function HorizontalProductCard({ product }) {
  return (
    <Card className="p-3 hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <Link to={`/product/${product.id}`}>
        <div className="flex items-center gap-3">
          <div className="relative w-[100px] h-[100px] shrink-0 rounded-lg overflow-hidden bg-muted">
            {product.discount && (
              <Badge 
                variant="destructive" 
                className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 z-10"
              >
                -{product.discount}%
              </Badge>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 space-y-1.5">
            <h3 className="font-heading font-semibold text-foreground line-clamp-1">
              {product.name}
            </h3>
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
              <span className="font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xs line-through text-muted-foreground">
                    ${product.originalPrice}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

// Feature Card Component - Enhanced with Radix UI
function FeatureCard({ icon, title, description }) {
  return (
    <Card className="text-center border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-card/50">
      <CardContent className="p-6">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

// Data
const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
  },
  {
    name: "Home",
    slug: "home",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
  },
  {
    name: "Groceries",
    slug: "groceries",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
  },
  {
    name: "Baby Care",
    slug: "baby-care",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop",
  },
  {
    name: "Watches",
    slug: "watches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
  },
  {
    name: "Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  },
  {
    name: "Mens Fashion",
    slug: "mens-fashion",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
  },
  {
    name: "Women's Fashion",
    slug: "womens-fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
  },
];

const smartphones = [
  {
    id: 1,
    name: "One plus 11 Pro 5G",
    category: "Smartphone",
    price: "56999",
    originalPrice: "56999",
    discount: 23,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/0cac868028415b3b069d857582f3f713706a9c5a?width=560",
  },
  {
    id: 2,
    name: "Oneplus Nord",
    category: "Smartphone",
    price: "27000",
    originalPrice: "27999",
    discount: 4,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/bc93bfb0e5af20c5c0064b663f11bfc06485b75f?width=560",
  },
  {
    id: 3,
    name: "Samsung s23 5G",
    category: "Smartphone",
    price: "10500",
    originalPrice: "11000",
    discount: 5,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/8ef4877525bc3b8dcf59173b009506bbfe698d91?width=560",
  },
];

const furnitureProducts = [
  {
    id: 1,
    name: "Pink Baby Shoes",
    category: "Footwear",
    price: "600",
    originalPrice: "1000",
    discount: 40,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/aaccbb9e45fdd47de40ec2d37b8b3898876ea71b?width=200",
  },
  {
    id: 2,
    name: "Slip on Loafers For Boys",
    category: "Footwear",
    price: "670",
    originalPrice: "1000",
    discount: 33,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/2cf9e8e0860731e6b0a1299b076ad1f88d8c2578?width=200",
  },
  {
    id: 3,
    name: "Baby Boy Sandal",
    category: "Footwear",
    price: "300",
    originalPrice: "1000",
    discount: 70,
    rating: 5,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a062757a612f4a3e3f0e5d0730ec1338ca8c0e92?width=200",
  },
  {
    id: 4,
    name: "Dry Fruit Hub Khenaizi...",
    category: "Groceries",
    price: "10.5",
    originalPrice: "294",
    discount: 44,
    rating: 4.5,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/c4ccb38678f6eae8e2f53fe3a143a76307265721?width=200",
  },
];

const groceryProducts = [
  {
    id: 1,
    name: "Pink Baby Shoes",
    category: "Footwear",
    price: "600",
    originalPrice: "1000",
    discount: 40,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/aaccbb9e45fdd47de40ec2d37b8b3898876ea71b?width=200",
  },
  {
    id: 2,
    name: "Slip on Loafers For Boys",
    category: "Footwear",
    price: "670",
    originalPrice: "1000",
    discount: 33,
    rating: 0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/2cf9e8e0860731e6b0a1299b076ad1f88d8c2578?width=200",
  },
  {
    id: 3,
    name: "Baby Boy Sandal",
    category: "Footwear",
    price: "300",
    originalPrice: "1000",
    discount: 70,
    rating: 5,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a062757a612f4a3e3f0e5d0730ec1338ca8c0e92?width=200",
  },
  {
    id: 4,
    name: "Dry Fruit Hub Khenaizi...",
    category: "Groceries",
    price: "10.5",
    originalPrice: "294",
    discount: 44,
    rating: 4.5,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/78fee0597ddfd1e383d76f8a417c6fb7fdf36c77?width=502",
  },
];

// Brands Data
const brands = [
  {
    id: 1,
    name: "Titan",
    slug: "titan",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Samsung",
    slug: "samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Apple",
    slug: "apple",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Nike",
    slug: "nike",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop",
  },
  {
    id: 5,
    name: "Adidas",
    slug: "adidas",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=200&fit=crop",
  },
  {
    id: 6,
    name: "Sony",
    slug: "sony",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=200&fit=crop",
  },
];

// Flash Sale Products
const flashSaleProducts = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: "29.99",
    originalPrice: "99.99",
    discount: 70,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: 102,
    name: "Smart Watch Pro",
    category: "Electronics",
    price: "79.99",
    originalPrice: "199.99",
    discount: 60,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  },
  {
    id: 103,
    name: "Running Shoes",
    category: "Footwear",
    price: "39.99",
    originalPrice: "129.99",
    discount: 69,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
  },
  {
    id: 104,
    name: "Laptop Bag",
    category: "Accessories",
    price: "24.99",
    originalPrice: "79.99",
    discount: 69,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
  },
  {
    id: 105,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "19.99",
    originalPrice: "59.99",
    discount: 67,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
  },
  {
    id: 106,
    name: "Sunglasses",
    category: "Accessories",
    price: "14.99",
    originalPrice: "49.99",
    discount: 70,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
  },
];

// Trending Products
const trendingProducts = [
  {
    id: 201,
    name: "iPhone 15 Pro Max",
    category: "Smartphone",
    price: "1199",
    originalPrice: "1299",
    discount: 8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
  },
  {
    id: 202,
    name: "Gaming Mouse",
    category: "Electronics",
    price: "49.99",
    originalPrice: "79.99",
    discount: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
  },
  {
    id: 203,
    name: "Yoga Mat Premium",
    category: "Fitness",
    price: "34.99",
    originalPrice: "59.99",
    discount: 42,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83d34f61?w=400&h=400&fit=crop",
  },
  {
    id: 204,
    name: "Coffee Maker",
    category: "Home",
    price: "89.99",
    originalPrice: "149.99",
    discount: 40,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
  },
  {
    id: 205,
    name: "Leather Wallet",
    category: "Accessories",
    price: "29.99",
    originalPrice: "49.99",
    discount: 40,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
  },
];

// Best Sellers
const bestSellers = [
  {
    id: 301,
    name: "AirPods Pro",
    category: "Electronics",
    price: "199",
    originalPrice: "249",
    discount: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
  },
  {
    id: 302,
    name: "Denim Jacket",
    category: "Fashion",
    price: "59.99",
    originalPrice: "99.99",
    discount: 40,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
  },
  {
    id: 303,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: "79.99",
    originalPrice: "129.99",
    discount: 38,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587829741301-dc528b742250?w=400&h=400&fit=crop",
  },
  {
    id: 304,
    name: "Fitness Tracker",
    category: "Electronics",
    price: "49.99",
    originalPrice: "89.99",
    discount: 44,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
  },
];

// Fashion Products
const fashionProducts = [
  {
    id: 401,
    name: "Classic White Shirt",
    category: "Fashion",
    price: "39.99",
    originalPrice: "69.99",
    discount: 43,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
  },
  {
    id: 402,
    name: "Leather Boots",
    category: "Footwear",
    price: "89.99",
    originalPrice: "149.99",
    discount: 40,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1608256246200-53bd35f3f44e?w=400&h=400&fit=crop",
  },
  {
    id: 403,
    name: "Designer Handbag",
    category: "Accessories",
    price: "79.99",
    originalPrice: "129.99",
    discount: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
  },
  {
    id: 404,
    name: "Casual Jeans",
    category: "Fashion",
    price: "49.99",
    originalPrice: "89.99",
    discount: 44,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
  },
];

// New Arrivals
const newArrivals = [
  {
    id: 501,
    name: "Smart TV 55 inch",
    category: "Electronics",
    price: "599",
    originalPrice: "799",
    discount: 25,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
  },
  {
    id: 502,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: "79.99",
    originalPrice: "129.99",
    discount: 38,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
  },
  {
    id: 503,
    name: "Smart Home Hub",
    category: "Electronics",
    price: "99.99",
    originalPrice: "149.99",
    discount: 33,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
  {
    id: 504,
    name: "Portable Charger",
    category: "Electronics",
    price: "24.99",
    originalPrice: "39.99",
    discount: 38,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
  },
  {
    id: 505,
    name: "Tablet Stand",
    category: "Accessories",
    price: "19.99",
    originalPrice: "34.99",
    discount: 43,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
  },
];

// Grocery Products Data
const groceryProductsData = [
  {
    id: 601,
    name: "Fresh Organic Tomatoes",
    category: "Groceries",
    price: "2.99",
    originalPrice: "4.99",
    discount: 40,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1546097488-9e0c0c0e0a0a?w=400&h=400&fit=crop",
  },
  {
    id: 602,
    name: "Organic Bananas",
    category: "Groceries",
    price: "1.99",
    originalPrice: "3.49",
    discount: 43,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
  },
  {
    id: 603,
    name: "Fresh Strawberries",
    category: "Groceries",
    price: "4.99",
    originalPrice: "7.99",
    discount: 38,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
  },
  {
    id: 604,
    name: "Organic Spinach",
    category: "Groceries",
    price: "3.49",
    originalPrice: "5.99",
    discount: 42,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
  },
];

// Watch Products
const watchProducts = [
  {
    id: 701,
    name: "Luxury Gold Watch",
    category: "Watches",
    price: "299",
    originalPrice: "499",
    discount: 40,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  },
  {
    id: 702,
    name: "Classic Leather Watch",
    category: "Watches",
    price: "149",
    originalPrice: "249",
    discount: 40,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
  },
  {
    id: 703,
    name: "Sport Digital Watch",
    category: "Watches",
    price: "79.99",
    originalPrice: "129.99",
    discount: 38,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop",
  },
  {
    id: 704,
    name: "Elegant Silver Watch",
    category: "Watches",
    price: "199",
    originalPrice: "349",
    discount: 43,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=400&fit=crop",
  },
];

// Top Rated Products
const topRatedProducts = [
  {
    id: 801,
    name: "Premium Camera",
    category: "Electronics",
    price: "899",
    originalPrice: "1299",
    discount: 31,
    rating: 5,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
  },
  {
    id: 802,
    name: "Gaming Chair",
    category: "Furniture",
    price: "199",
    originalPrice: "349",
    discount: 43,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
  },
  {
    id: 803,
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: "149",
    originalPrice: "249",
    discount: 40,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  },
  {
    id: 804,
    name: "Electric Toothbrush",
    category: "Health",
    price: "49.99",
    originalPrice: "89.99",
    discount: 44,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c10?w=400&h=400&fit=crop",
  },
  {
    id: 805,
    name: "Yoga Mat Pro",
    category: "Fitness",
    price: "39.99",
    originalPrice: "69.99",
    discount: 43,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83d34f61?w=400&h=400&fit=crop",
  },
];

