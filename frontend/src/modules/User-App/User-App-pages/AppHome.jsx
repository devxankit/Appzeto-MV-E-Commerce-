import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Mic, Star, Heart, ChevronRight, ShoppingCart, ArrowRight } from "lucide-react";
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

// Mock data for categories with background colors
const categories = [
  {
    id: 1,
    name: "Furniture",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    bgColor: "bg-orange-100",
  },
  {
    id: 2,
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop",
    bgColor: "bg-pink-100",
  },
  {
    id: 3,
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
    bgColor: "bg-blue-100",
  },
  {
    id: 4,
    name: "Digital product",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=200&h=200&fit=crop",
    bgColor: "bg-purple-100",
  },
  {
    id: 5,
    name: "Home appliance",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=200&h=200&fit=crop",
    bgColor: "bg-green-100",
  },
  {
    id: 6,
    name: "Groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop",
    bgColor: "bg-yellow-100",
  },
  {
    id: 7,
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    bgColor: "bg-indigo-100",
  },
  {
    id: 8,
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
    bgColor: "bg-red-100",
  },
];

// Mock data for banners
const banners = [
  {
    id: 1,
    image: banner1,
    title: "Special Offer",
    subtitle: "Up to 50% OFF",
  },
  {
    id: 2,
    image: banner2,
    title: "New Collection",
    subtitle: "Shop Now",
  },
  {
    id: 3,
    image: banner3,
    title: "Flash Sale",
    subtitle: "Limited Time",
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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
        {/* Search Bar */}
        <section className="px-4 py-3 bg-white">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items here"
              className="w-full pl-10 pr-12 py-3 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            />
            <button
              className="absolute right-3 p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Voice search"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </section>

        {/* Categories */}
        <section className="px-4 py-4 bg-white">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0"
              >
                <Link
                  to={`/app/categories/${category.name.toLowerCase()}`}
                  className="flex flex-col items-center gap-2 w-20"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-full overflow-hidden ${category.bgColor} border border-gray-200 shadow-sm relative`}
                    whileHover={{ 
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <span className="text-xs text-gray-700 text-center font-medium w-full truncate">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Carousel Banners */}
        <section className="px-4 py-4 bg-white">
          <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-red-500 via-red-600 to-orange-600 shadow-lg">
            {/* Fireworks Background Container */}
            <div className="absolute inset-0 z-0 rounded-xl">
              <FireworksBackground
                population={2}
                color={['#FFD700', '#FFA500', '#FF6B6B', '#FF8C00', '#FFE135']}
                fireworkSpeed={{ min: 3, max: 6 }}
                fireworkSize={{ min: 2, max: 4 }}
                particleSpeed={{ min: 1.5, max: 5 }}
                particleSize={{ min: 1, max: 4 }}
                className="opacity-70"
              />
            </div>

            {/* Container Border Effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none z-10" />

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
                          className="w-full h-full object-cover rounded-xl opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Carousel Indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === current
                        ? "w-2.5 h-2.5 bg-white shadow-lg"
                        : "w-2 h-2 bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="px-4 py-4 bg-white">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="shrink-0 flex flex-col items-center gap-2"
              >
                <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs text-gray-700 text-center font-medium max-w-[96px]">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Smartphones & Basic Mobiles */}
        <section className="px-4 py-4 bg-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                Smartphones & Basic Mobiles
              </h2>
              <p className="text-xs text-gray-500">Top deals on smartphones</p>
            </div>
            <Link
              to="/app/categories/smartphone"
              className="text-sm text-red-600 font-medium flex items-center gap-1"
            >
              Show All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {smartphoneProducts.slice(0, 5).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
        </section>

         {/* Products On Sale - Horizontal Scroll */}
         <section className="px-4 py-4 bg-white">
           <div className="flex items-center justify-between mb-3">
             <div>
               <h2 className="text-lg font-bold text-gray-800">
                 Products On Sale
               </h2>
               <p className="text-xs text-gray-500">Products On Sale</p>
             </div>
             <Link
               to="/app/products/sale"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
           <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
             {saleProducts.slice(0, 6).map((product) => (
               <ProductCard
                 key={product.id}
                 product={product}
                 onWishlistToggle={handleWishlistToggle}
                 variant="horizontal"
               />
             ))}
           </div>
         </section>

         {/* Spotlight's on Section - Middle of page */}
         <section className="px-4 py-4">
           <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 shadow-lg">
             {/* Fireworks Background Container */}
             <div className="absolute inset-0 z-0 rounded-xl">
               <FireworksBackground
                 population={2}
                 color={['#FFD700', '#FFA500', '#FF6B6B', '#FF8C00', '#FFE135', '#FFB347']}
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
             <div className="relative z-10 p-4">
               <h2 className="text-xl font-bold text-white mb-4">Spotlight's on</h2>
               <div className="grid grid-cols-2 gap-3">
                 {spotlightItems.map((item) => (
                   <div
                     key={item.id}
                     className="bg-white rounded-lg overflow-hidden shadow-md"
                   >
                     <div className="relative h-40 bg-gray-100">
                       <img
                         src={item.image}
                         alt={item.title}
                         className="w-full h-full object-cover"
                       />
                     </div>
                     <div className="p-3">
                       <h3 className="text-sm font-semibold text-gray-800 mb-1">
                         {item.title}
                       </h3>
                       <p className="text-sm font-bold text-gray-900">
                         {item.offer}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </section>

         {/* Trending Products */}
         <section className="px-4 py-4 bg-white">
           <div className="flex items-center justify-between mb-3">
             <div>
               <h2 className="text-lg font-bold text-gray-800">
                 Trending Now
               </h2>
               <p className="text-xs text-gray-500">Popular this week</p>
             </div>
             <Link
               to="/app/products/trending"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
           <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
             {trendingProducts.map((product) => (
               <ProductCard
                 key={product.id}
                 product={product}
                 onWishlistToggle={handleWishlistToggle}
                 variant="horizontal"
               />
             ))}
           </div>
         </section>

         {/* Black Friday Promotional Banner */}
         <section className="px-4 py-4 bg-white">
           <div className="relative h-48 rounded-lg overflow-hidden">
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
         <section className="px-4 py-4 bg-white">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Sponsored</h2>
           <div className="grid grid-cols-2 gap-3">
             {sponsoredProducts.map((product) => (
               <div
                 key={product.id}
                 className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm relative"
               >
                 <div className="relative h-40 bg-gray-100">
                   <div className="absolute top-2 left-2 z-10">
                     <span className="text-xs font-bold text-gray-800 bg-white/90 px-2 py-1 rounded">
                       {product.brand}
                     </span>
                   </div>
                   <img
                     src={product.image}
                     alt={product.productName}
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white px-2 py-1">
                     <p className="text-xs font-semibold">{product.price}</p>
                   </div>
                 </div>
                 <div className="p-2">
                   <p className="text-xs text-gray-700">{product.productName}</p>
                 </div>
               </div>
             ))}
           </div>
         </section>

         {/* Top Rated Furniture Products */}
         <section className="px-4 py-4 bg-white">
           <div className="flex items-center justify-between mb-3">
             <div>
               <h2 className="text-lg font-bold text-gray-800">
                 Top Rated Furniture Products
               </h2>
               <p className="text-xs text-gray-500">Top Rated Products</p>
             </div>
             <Link
               to="/app/categories/furniture"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
           <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
             {furnitureProducts.length > 0 ? (
               furnitureProducts.map((product) => (
                 <ProductCard
                   key={product.id}
                   product={product}
                   onWishlistToggle={handleWishlistToggle}
                   variant="horizontal"
                 />
               ))
             ) : (
               <div className="text-gray-500 text-sm py-8">
                 No furniture products available
               </div>
             )}
           </div>
         </section>

         {/* New Arrivals */}
         <section className="px-4 py-4 bg-white">
           <div className="flex items-center justify-between mb-3">
             <div>
               <h2 className="text-lg font-bold text-gray-800">
                 New Arrivals
               </h2>
               <p className="text-xs text-gray-500">Just added to store</p>
             </div>
             <Link
               to="/app/products/new"
               className="text-sm text-red-600 font-medium flex items-center gap-1"
             >
               Show All
               <ChevronRight className="w-4 h-4" />
             </Link>
           </div>
           <div className="grid grid-cols-2 gap-3">
             {newArrivals.map((product) => (
               <ProductCard
                 key={product.id}
                 product={product}
                 onWishlistToggle={handleWishlistToggle}
                 variant="grid"
               />
             ))}
           </div>
         </section>

         {/* Suggested For You Section - Near bottom */}
         <section className="px-4 py-4 bg-white">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-800">
               Suggested For You
             </h2>
             <button className="text-gray-600">
               <ArrowRight className="w-5 h-5" />
             </button>
           </div>
           <div className="grid grid-cols-2 gap-3">
             {suggestedProducts.map((product) => (
               <SuggestedProductCard
                 key={product.id}
                 product={product}
                 onWishlistToggle={handleWishlistToggle}
               />
             ))}
           </div>
         </section>

        {/* Bottom padding for bottom nav */}
        <div className="h-4"></div>
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
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}%
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
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}%
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

