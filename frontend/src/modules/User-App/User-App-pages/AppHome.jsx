import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Mic, Star, Heart, ChevronRight, ShoppingCart, ArrowRight, MapPin, ChevronDown, ShoppingBag, Gift, Snowflake, Headphones, Sparkles, Store, Clock, Shirt, Gamepad2, Baby, Car, Utensils, Dumbbell, Watch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "../User-App-components/AppLayout";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { allProducts } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import { FireworksBackground } from "@/components/animate-ui/components/backgrounds/fireworks";
import { SnowBackground } from "@/components/animate-ui/components/backgrounds/snow";
import AnimatedSectionTitle from "@/components/animated/AnimatedSectionTitle";
import AnimatedCard from "@/components/animated/AnimatedCard";
import AnimatedBadge from "@/components/animated/AnimatedBadge";
import ScrollReveal from "@/components/animated/ScrollReveal";

// Categories with icons in dark circular backgrounds - Blinkit style
const categories = [
  {
    id: 1,
    name: "All",
    icon: ShoppingBag,
    isNew: false,
  },
  {
    id: 2,
    name: "Wedding",
    icon: Gift,
    isNew: false,
  },
  {
    id: 3,
    name: "Winter",
    icon: Snowflake,
    isNew: false,
  },
  {
    id: 4,
    name: "Electronics",
    icon: Headphones,
    isNew: false,
  },
  {
    id: 5,
    name: "Beauty",
    icon: Sparkles,
    isNew: false,
  },
  {
    id: 6,
    name: "Fashion",
    icon: Shirt,
    isNew: false,
  },
  {
    id: 7,
    name: "Groceries",
    icon: ShoppingBag,
    isNew: false,
  },
  {
    id: 8,
    name: "Gaming",
    icon: Gamepad2,
    isNew: false,
  },
  {
    id: 9,
    name: "Baby",
    icon: Baby,
    isNew: false,
  },
  {
    id: 10,
    name: "Automotive",
    icon: Car,
    isNew: false,
  },
  {
    id: 11,
    name: "Food",
    icon: Utensils,
    isNew: false,
  },
  {
    id: 12,
    name: "Fitness",
    icon: Dumbbell,
    isNew: false,
  },
  {
    id: 13,
    name: "Watches",
    icon: Watch,
    isNew: false,
  },
];

// Mock data for banners - Warm and inviting
const banners = [
  {
    id: 1,
    image: banner1,
    title: "🎉 Special Offer",
    subtitle: "Up to 50% OFF on Everything!",
  },
  {
    id: 2,
    image: banner2,
    title: "✨ New Collection",
    subtitle: "Discover Fresh Arrivals",
  },
  {
    id: 3,
    image: banner3,
    title: "⚡ Flash Sale",
    subtitle: "Limited Time - Grab Now!",
  },
];

// Mock data for brands
const brands = [
  {
    id: 1,
    name: "Adidas",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Aeropostale",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Aldo",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Allen Solly",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Amante",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "Nike",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 7,
    name: "Puma",
    image:
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 8,
    name: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 9,
    name: "Apple",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 10,
    name: "Sony",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 11,
    name: "Titan",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&auto=format",
  },
  {
    id: 12,
    name: "Fastrack",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop&auto=format",
  },
];

export default function AppHome() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const { addToast } = useToast();
  
  // Animated placeholder texts (only the changing part)
  const placeholderTexts = [
    "'must read books'",
    "'electronics'",
    "'fashion trends'",
    "'home decor'",
    "'gaming accessories'",
    "'beauty products'",
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  // Get smartphone products
  const smartphoneProducts = allProducts.filter(
    (p) => p.category === "Smartphone"
  );

  // Get products on sale (products with discount)
  const saleProducts = allProducts
    .filter((p) => p.discount && p.discount > 0)
    .slice(0, 8);

  // Get top rated furniture products
  const furnitureProducts = allProducts
    .filter((p) => p.category === "Furniture" || p.category === "Footwear")
    .filter((p) => p.rating && p.rating >= 4)
    .slice(0, 6);

  // Spotlight's on data
  const spotlightItems = [
    {
      id: 1,
      title: "boAt, realme, Mivi & m...",
      offer: "Min 50% Off",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      title: "Men's High Tops",
      offer: "Min. 40% Off",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      title: "Loose fits & more",
      offer: "Min 70% Off",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      title: "Sports Shoes",
      offer: "Min 40% Off",
      image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=400&fit=crop",
    },
  ];

  // Sponsored products data
  const sponsoredProducts = [
    {
      id: 1,
      brand: "NOISE",
      productName: "Buds E1: new launch",
      price: "Spl. price ₹1,099",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      brand: "boat",
      productName: "Today's special deal",
      price: "₹1,399 ₹3,290",
      originalPrice: "₹3,290",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      brand: "VO",
      productName: "Biggest price drop",
      price: "Up to 90% Off",
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      brand: "NOISE",
      productName: "1.39\" | BT calling",
      price: "Just ₹1,499",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      brand: "boat",
      productName: "Just Launched",
      price: "Spl. Price ₹1,099",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      brand: "VO",
      productName: "Win an iphone",
      price: "Launch 3rd Dec",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    },
  ];

  // Get trending products
  const trendingProducts = allProducts
    .filter((p) => p.rating && p.rating >= 3.5)
    .slice(0, 6);

  // Get new arrivals
  const newArrivals = allProducts.slice(0, 4);

  // Suggested products
  const suggestedProducts = allProducts
    .filter((p) => p.rating && p.rating >= 4)
    .slice(0, 6);

  // Get featured products for compact scrollable list
  const featuredProducts = allProducts
    .filter((p) => p.rating && p.rating >= 3.5)
    .slice(0, 12);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Animate placeholder text every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [placeholderTexts.length]);

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    const inWishlist = isInWishlist(product.id);

    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        duration: 2000,
      });
    } else {
      addToWishlist(product);
      addToast({
        title: "Added to Wishlist!",
        description: `${product.name} has been added to your wishlist.`,
        duration: 2000,
      });
    }
  };

  return (
    <AppLayout>
      <div className="bg-white min-h-screen">
        {/* Hero Section - Extended gradient background from top to promotional banner */}
        <div className="bg-gradient-to-br from-orange-300 via-orange-200 to-orange-300 relative overflow-hidden">
          {/* Falling Snow Background */}
          <div className="absolute inset-0 z-0">
            <SnowBackground
              count={80}
              speed={{ min: 0.2, max: 0.8 }}
              size={{ min: 2, max: 5 }}
              opacity={{ min: 0.4, max: 0.9 }}
              className="opacity-60"
            />
          </div>
          
          {/* Subtle animated background effects */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <motion.div
              className="absolute top-10 right-10 w-32 h-32 bg-orange-300/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-10 left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Top Section: Tagline & Location */}
            <section className="px-4 pt-3 pb-2">
              <div className="flex items-center justify-between mb-2">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-base font-bold text-gray-900"
                >
                  Shop Smart, Shop Fast - Your Store, Your Style
                </motion.h2>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <MapPin className="w-4 h-4 text-gray-700" />
                <span className="text-xs font-medium text-gray-800">Ward 40, Indore Division</span>
                <ChevronDown className="w-4 h-4 text-gray-700" />
              </div>
            </section>

            {/* Search Bar - Dark grey Blinkit style */}
            <section className="px-4 pb-3">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                  <Search className="w-5 h-5 text-gray-500" />
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 pr-12 py-2.5 bg-gray-700 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-medium text-white placeholder:text-transparent"
                  />
                  {/* Animated placeholder overlay - only show when input is empty */}
                  {!searchValue && (
                    <div className="absolute left-10 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1 overflow-hidden">
                      <span className="text-sm font-medium text-gray-400">Search</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentPlaceholderIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="text-sm font-medium text-gray-400 whitespace-nowrap"
                        >
                          {placeholderTexts[currentPlaceholderIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-600 rounded transition-colors"
                  aria-label="Voice search"
                >
                  <Mic className="w-4 h-4 text-gray-300" />
                </motion.button>
              </motion.div>
            </section>

            {/* Categories - Icons in dark circular backgrounds */}
            <section className="pb-4">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
                {categories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 150,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`shrink-0 relative ${index === 0 ? 'pl-4' : ''} ${index === categories.length - 1 ? 'pr-4' : ''}`}
                    >
                      <Link
                        to={`/app/categories/${category.name.toLowerCase()}`}
                        className="flex flex-col items-center gap-1.5 w-16"
                      >
                        <div className="relative">
                          <motion.div
                            className="w-12 h-12 rounded-full bg-gray-700 shadow-md flex items-center justify-center"
                            whileHover={{ 
                              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </motion.div>
                          {/* New badge */}
                          {category.isNew && (
                            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full px-1.5 py-0.5">
                              <span className="text-[8px] font-bold text-white">New</span>
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-900 text-center font-semibold w-full truncate leading-tight">
                          {category.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Carousel Banners - Blinkit style with warm colors */}
          <section className="py-3 px-4">
          <div className="relative h-40 rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm shadow-lg border border-white/30">
            {/* Carousel with Banner Images */}
            <div className="relative z-10 w-full h-full">
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
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Carousel Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === current
                        ? "w-1.5 h-1.5 bg-white shadow-md"
                        : "w-1 h-1 bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          </section>
        </div>

        {/* Brands & Promotional Banner Section with Subtle Gradient Background */}
        <div className="relative bg-gradient-to-b from-orange-50 via-orange-50/50 to-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-10 left-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, 20, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-32 right-20 w-32 h-32 bg-orange-300/15 rounded-full blur-2xl"
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute bottom-20 left-1/4 w-36 h-36 bg-yellow-200/15 rounded-full blur-3xl"
              animate={{
                x: [0, 25, 0],
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          <div className="relative z-10">
            {/* Featured Products - Simple Product Image with Price */}
            <section className="py-4">
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                {featuredProducts.map((product, index) => {
                  const formatPrice = (price) => {
                    const numPrice = parseFloat(price);
                    if (numPrice >= 1000) {
                      return `₹${numPrice.toLocaleString("en-IN")}`;
                    }
                    return `₹${price}`;
                  };

                  // Calculate discounted price
                  const discountedPrice = product.discount
                    ? Math.round((parseFloat(product.price) / 100) * (100 - product.discount))
                    : parseFloat(product.price) / 100;

                  return (
                    <Link
                      key={product.id}
                      to={`/app/product/${product.id}`}
                      className={`shrink-0 flex flex-col cursor-pointer group ${index === 0 ? 'pl-4' : ''} ${index === featuredProducts.length - 1 ? 'pr-4' : ''}`}
                    >
                      {/* Product Image with Light Orange Background */}
                      <div className="relative w-24 h-28 bg-orange-100 overflow-hidden rounded-xl">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Light Orange Price Banner */}
                      <div className="bg-orange-400 px-2 py-1 rounded-b-xl">
                        <p className="text-white text-[10px] font-bold text-center">
                          {product.discount ? `Just ${formatPrice(String(discountedPrice * 100))}` : `Spl. price ${formatPrice(product.price)}`}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Large Promotional Banner - GOLDEN WEEK */}
            <section className="px-4 pt-2 pb-6">
              <div className="relative h-60 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-2xl">
                {/* Elegant decorative overlays - Static */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-yellow-200/15 rounded-full blur-2xl"></div>
                </div>

                {/* Product Image - Elegant placement on the right */}
                <div className="absolute right-0 bottom-0 w-36 h-full">
                  <div className="relative w-full h-full">
                    {/* Red background panel */}
                    <div className="absolute right-0 bottom-0 w-32 h-44 bg-red-600 rounded-tl-3xl rounded-br-3xl shadow-2xl"></div>
                    {/* Product image */}
                    <div className="absolute right-2 bottom-4 w-28 h-36">
                      <img
                        src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=400&fit=crop"
                        alt="Nike Running Shoe"
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none rounded-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Content - Enhanced Typography */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-gray-900 text-xs font-extrabold uppercase tracking-[0.15em] leading-none">
                      APPZETO MV
                    </p>
                    <h1 
                      className="text-white text-3xl font-black leading-[1.1] tracking-tight"
                      style={{ 
                        textShadow: '3px 3px 12px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.2)',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      GOLDEN WEEK
                    </h1>
                    <p 
                      className="text-white text-lg font-extrabold leading-tight"
                      style={{ 
                        textShadow: '2px 2px 8px rgba(0,0,0,0.35), 0 0 15px rgba(0,0,0,0.15)',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      EXPLOSIVE HOT DEALS
                    </p>
                    <p className="text-gray-900 text-xs font-bold mt-2 tracking-wide">
                      Scan code for exclusive offers
                    </p>
                  </div>

                  {/* Discount Badge - Simple & Clean */}
                  <div className="flex items-end justify-between">
                    <div className="bg-gray-900/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-2xl border border-gray-800/50">
                      <span 
                        className="text-white text-2xl font-black block leading-none"
                        style={{ letterSpacing: '-0.03em' }}
                      >
                        70%
                      </span>
                      <span className="text-white text-xs font-extrabold block mt-1 tracking-[0.2em] uppercase">
                        OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Brands */}
            <section className="py-4">
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
                {brands.map((brand, index) => (
                  <div
                    key={brand.id}
                    className={`shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group ${index === 0 ? 'pl-4' : ''} ${index === brands.length - 1 ? 'pr-4' : ''}`}
                  >
                    <div className="w-20 h-20 overflow-hidden rounded-xl transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300 rounded-xl"
                      />
                    </div>
                    <span className="text-[10px] text-gray-700 text-center font-semibold max-w-[80px] leading-tight group-hover:text-gray-900 transition-colors">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Smartphones & Basic Mobiles */}
        <ScrollReveal>
          <section className="px-4 py-2 bg-white">
            <div className="flex items-center justify-between mb-2">
              <AnimatedSectionTitle 
                title="Smartphones & Basic Mobiles"
                subtitle="Top deals on smartphones"
              />
            <Link
              to="/app/categories/smartphone"
              className="text-sm text-red-600 font-medium flex items-center gap-1"
            >
              Show All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {smartphoneProducts.slice(0, 5).map((product, index) => (
                <AnimatedCard key={product.id} delay={index * 0.1} className="shrink-0">
                  <ProductCard
                    product={product}
                    onWishlistToggle={handleWishlistToggle}
                  />
                </AnimatedCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

         {/* Products On Sale - Horizontal Scroll */}
         <ScrollReveal>
           <section className="px-4 py-2 bg-white">
             <div className="flex items-center justify-between mb-2">
               <AnimatedSectionTitle 
                 title="Products On Sale"
                 subtitle="Products On Sale"
               />
             <Link
               to="/app/products/sale"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
             <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
               {saleProducts.slice(0, 6).map((product, index) => (
                 <AnimatedCard key={product.id} delay={index * 0.1} className="shrink-0">
                   <ProductCard
                     product={product}
                     onWishlistToggle={handleWishlistToggle}
                     variant="horizontal"
                   />
                 </AnimatedCard>
               ))}
             </div>
           </section>
         </ScrollReveal>

         {/* Spotlight's on Section - Middle of page */}
         <ScrollReveal>
           <section className="px-4 py-2">
             <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 shadow-lg">
             {/* Fireworks Background Container */}
             <div className="absolute inset-0 z-0 rounded-xl">
               <FireworksBackground
                 population={2}
                 color={['#00D4FF', '#00BFFF', '#1E90FF', '#00CED1', '#40E0D0', '#00FFFF']}
                 fireworkSpeed={{ min: 3, max: 6 }}
                 fireworkSize={{ min: 2, max: 4 }}
                 particleSpeed={{ min: 1.5, max: 5 }}
                 particleSize={{ min: 1, max: 4 }}
                 className="opacity-60"
               />
             </div>

             {/* Container Border Effect */}
             <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none z-10" />

             {/* Content Container */}
             <div className="relative z-10 p-3">
               <h2 className="text-lg font-bold text-white mb-2">Spotlight's on</h2>
               <div className="grid grid-cols-2 gap-2">
                 {spotlightItems.map((item, index) => (
                   <AnimatedCard key={item.id} delay={index * 0.1}>
                     <div className="bg-white rounded-lg overflow-hidden shadow-md">
                     <div className="relative h-32 bg-gray-100">
                       <img
                         src={item.image}
                         alt={item.title}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="p-2">
                       <h3 className="text-xs font-semibold text-gray-800 mb-0.5">
                         {item.title}
                       </h3>
                       <p className="text-xs font-bold text-gray-900">
                         {item.offer}
                       </p>
                     </div>
                   </div>
                   </AnimatedCard>
                 ))}
               </div>
             </div>
           </div>
         </section>
         </ScrollReveal>

         {/* Trending Products */}
         <ScrollReveal>
           <section className="px-4 py-2 bg-white">
             <div className="flex items-center justify-between mb-2">
               <AnimatedSectionTitle 
                 title="Trending Now"
                 subtitle="Popular this week"
               />
             <Link
               to="/app/products/trending"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
             <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
               {trendingProducts.map((product, index) => (
                 <AnimatedCard key={product.id} delay={index * 0.1} className="shrink-0">
                   <ProductCard
                     product={product}
                     onWishlistToggle={handleWishlistToggle}
                     variant="horizontal"
                   />
                 </AnimatedCard>
               ))}
             </div>
           </section>
         </ScrollReveal>

         {/* Black Friday Promotional Banner */}
         <section className="px-4 py-2 bg-white">
           <div className="relative h-40 rounded-lg overflow-hidden">
             <div className="absolute inset-0 flex">
               {/* Orange Section */}
               <div className="w-1/2 bg-orange-500 flex flex-col justify-center items-start pl-4 pr-2">
                 <div className="flex items-center gap-2 mb-2">
                   <ShoppingCart className="w-4 h-4 text-white" />
                   <span className="text-white text-xs font-semibold">
                     SALE ON ALL ITEMS
                   </span>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2">
                   BLACK FRIDAY
                 </h3>
                 <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
                   <p className="text-white text-[10px] font-medium">
                     CONTACT US
                   </p>
                   <p className="text-white text-xs font-bold">323-517-4946</p>
                 </div>
               </div>
               {/* Black Section */}
               <div className="w-1/2 bg-black flex flex-col justify-center items-center relative">
                 <div className="text-center mb-2">
                   <p className="text-3xl font-bold text-white">50% OFF</p>
                   <p className="text-orange-500 text-sm font-semibold">
                     LIMITED OFFER
                   </p>
                 </div>
                 <div className="absolute bottom-2 right-2 flex gap-2">
                   <img
                     src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop"
                     alt="Headphones"
                     className="w-12 h-12 object-cover rounded"
                   />
                   <img
                     src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=60&h=60&fit=crop"
                     alt="Headphones"
                     className="w-12 h-12 object-cover rounded"
                   />
                 </div>
               </div>
             </div>
           </div>
         </section>

         {/* Sponsored Section - Middle of page */}
         <ScrollReveal>
           <section className="px-4 py-2 bg-white">
             <AnimatedSectionTitle title="Sponsored" className="mb-2" />
             <div className="grid grid-cols-2 gap-2">
               {sponsoredProducts.map((product, index) => (
                 <AnimatedCard key={product.id} delay={index * 0.1}>
                   <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm relative">
                 <div className="relative h-32 bg-gray-100">
                   <div className="absolute top-1.5 left-1.5 z-10">
                     <span className="text-[10px] font-bold text-gray-800 bg-white/90 px-1.5 py-0.5 rounded">
                       {product.brand}
                     </span>
                   </div>
                   <img
                     src={product.image}
                     alt={product.productName}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white px-1.5 py-0.5">
                     <p className="text-[10px] font-semibold">{product.price}</p>
                   </div>
                 </div>
                 <div className="p-1.5">
                   <p className="text-xs text-gray-700 line-clamp-2">{product.productName}</p>
                 </div>
                   </div>
                 </AnimatedCard>
               ))}
             </div>
           </section>
         </ScrollReveal>

         {/* Top Rated Furniture Products */}
        <ScrollReveal>
          <section className="px-4 py-2 bg-white">
            <div className="flex items-center justify-between mb-2">
              <AnimatedSectionTitle 
                title="Top Rated Furniture Products"
                subtitle="Top Rated Products"
              />
             <Link
               to="/app/categories/furniture"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {furnitureProducts.length > 0 ? (
                furnitureProducts.map((product, index) => (
                  <AnimatedCard key={product.id} delay={index * 0.1} className="shrink-0">
                    <ProductCard
                      product={product}
                      onWishlistToggle={handleWishlistToggle}
                      variant="horizontal"
                    />
                  </AnimatedCard>
                ))
              ) : (
                <div className="text-gray-500 text-sm py-8">
                  No furniture products available
                </div>
              )}
            </div>
          </section>
        </ScrollReveal>

         {/* New Arrivals */}
        <ScrollReveal>
          <section className="px-4 py-2 bg-white">
            <div className="flex items-center justify-between mb-2">
              <AnimatedSectionTitle 
                title="New Arrivals"
                subtitle="Just added to store"
              />
             <Link
               to="/app/products/new"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
            <div className="grid grid-cols-2 gap-2">
              {newArrivals.map((product, index) => (
                <AnimatedCard key={product.id} delay={index * 0.1}>
                  <ProductCard
                    product={product}
                    onWishlistToggle={handleWishlistToggle}
                    variant="grid"
                  />
                </AnimatedCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

         {/* Suggested For You Section - Near bottom */}
        <ScrollReveal>
          <section className="px-4 py-2 bg-white">
            <div className="flex items-center justify-between mb-2">
              <AnimatedSectionTitle title="Suggested For You" />
             <button className="text-gray-600">
               <ArrowRight className="w-5 h-5" />
             </button>
           </div>
            <div className="grid grid-cols-2 gap-2">
              {suggestedProducts.map((product, index) => (
                <AnimatedCard key={product.id} delay={index * 0.1}>
                  <SuggestedProductCard
                    product={product}
                    onWishlistToggle={handleWishlistToggle}
                  />
                </AnimatedCard>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Bottom padding for bottom nav */}
        <div className="h-2"></div>
      </div>
    </AppLayout>
  );
}

// Product Card Component
function ProductCard({ product, onWishlistToggle, variant = "horizontal" }) {
  const { isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 1000) {
      return `₹${numPrice.toLocaleString("en-IN")}`;
    }
    return `₹${price}`;
  };

  if (variant === "grid") {
    return (
      <Link
        to={`/product/${product.id}`}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
      >
        <div className="relative aspect-square bg-gray-100">
          {product.discount && (
            <div className="absolute top-2 left-2 z-20">
              <AnimatedBadge variant="discount">
                {product.discount}%
              </AnimatedBadge>
            </div>
          )}
          <button
            onClick={(e) => onWishlistToggle(product, e)}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 hover:bg-gray-100 transition shadow-sm"
          >
            <Heart
              className={`w-4 h-4 ${
                inWishlist
                  ? "text-red-600 fill-red-600"
                  : "text-gray-600"
              }`}
            />
          </button>
          {/* Rating badge on image */}
          {(product.rating || product.reviews) && (
            <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-0.5 z-10">
              <Star className="w-2.5 h-2.5 fill-white text-white" />
              <span className="text-white text-[10px] font-medium">
                {product.rating || 0}.00 | {product.reviews || 0}
              </span>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-10">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-red-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Horizontal scroll variant
  return (
    <Link
      to={`/product/${product.id}`}
      className="shrink-0 w-40 bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
    >
      <div className="relative aspect-square bg-gray-100">
        {product.discount && (
          <div className="absolute top-2 left-2 z-20">
            <AnimatedBadge variant="discount">
              {product.discount}%
            </AnimatedBadge>
          </div>
        )}
        <button
          onClick={(e) => onWishlistToggle(product, e)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 hover:bg-gray-100 transition shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${
              inWishlist
                ? "text-red-600 fill-red-600"
                : "text-gray-600"
            }`}
          />
        </button>
        {/* Rating badge on image */}
        {(product.rating || product.reviews) && (
          <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1 flex items-center gap-1 z-10">
            <Star className="w-3 h-3 fill-white text-white" />
            <span className="text-white text-xs font-medium">
              {product.rating || 0}.00 | {product.reviews || 0}
            </span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-10">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice !== product.price && (
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

// Suggested Product Card Component
function SuggestedProductCard({ product, onWishlistToggle }) {
  const { isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 1000) {
      return `₹${numPrice.toLocaleString("en-IN")}`;
    }
    return `₹${price}`;
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
    >
      <div className="relative aspect-square bg-gray-100">
        <button
          onClick={(e) => onWishlistToggle(product, e)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 hover:bg-gray-100 transition shadow-sm"
        >
          <Heart
            className={`w-4 h-4 ${
              inWishlist ? "text-red-600 fill-red-600" : "text-gray-600"
            }`}
          />
        </button>
        {/* Rating badge on image */}
        {product.rating && (
          <div className="absolute bottom-2 left-2 bg-green-500 text-white rounded px-2 py-0.5 flex items-center gap-1 z-10">
            <Star className="w-3 h-3 fill-white text-white" />
            <span className="text-white text-xs font-medium">
              {product.rating}
            </span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 min-h-10">
          {product.name}
        </h3>
        <div className="space-y-1">
          {product.originalPrice && product.originalPrice !== product.price && (
            <p className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
          <p className="text-base font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}

