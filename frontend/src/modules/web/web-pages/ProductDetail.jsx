import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  Star, Heart, ShoppingCart, Share2, Minus, Plus, Facebook, Twitter, 
  Linkedin, MessageCircle, ChevronRight, ZoomIn, Check, Truck, 
  Shield, RotateCcw, ArrowLeft, StarIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WebNavbar from "../web-components.jsx/WebNavbar";
import WebFooter from "../web-components.jsx/WebFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { allProducts } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, addToWishlist, removeFromWishlist } = useCart();
  const { addToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageZoom, setImageZoom] = useState(false);
  const [zipcode, setZipcode] = useState("");
  const [heartKey, setHeartKey] = useState(0);

  const product = allProducts.find((p) => p.id === parseInt(id));

  // Ensure page scrolls to top when component mounts or product changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <WebNavbar />
        <div className="h-[166px]"></div>
        <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Go Back Home</Link>
          </Button>
        </div>
        <WebFooter />
      </div>
    );
  }

  // Generate product images (using same image for demo, in real app these would be different)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const colors = product.colors && product.colors[0] !== "N/A" ? product.colors : ["Default"];
  const sizes = product.storage && product.storage[0] !== "N/A" ? product.storage : ["One Size"];
  const isInWishlistState = isInWishlist(product.id);

  // Get related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    const success = addToCart(product, quantity, colors[selectedColor] || "Default", sizes[selectedSize] || "One Size");
    if (success !== false) {
      addToast({
        title: "Added to Cart!",
        description: `${product.name} (${quantity}x) has been added to your cart.`,
        icon: <Check className="w-5 h-5 text-green-600" />,
        duration: 2000,
      });
    }
  };

  const handleBuyNow = () => {
    const success = addToCart(product, quantity, colors[selectedColor] || "Default", sizes[selectedSize] || "One Size");
    if (success !== false) {
      navigate('/checkout');
    }
  };

  const handleWishlistToggle = () => {
    setHeartKey(prev => prev + 1);
    const inWishlist = isInWishlistState;
    
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

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent product! Very satisfied with the quality and delivery.",
      verified: true
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      date: "2024-01-10",
      comment: "Good product, fast shipping. Would recommend.",
      verified: true
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      date: "2024-01-05",
      comment: "Amazing quality! Exceeded my expectations.",
      verified: false
    }
  ];

  const averageRating = product.rating || 0;
  const totalReviews = product.reviews || reviews.length;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        {/* Breadcrumb Navigation */}
        <section className="bg-gray-50 border-b">
          <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-muted-foreground hover:text-primary transition">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link to="/products" className="text-muted-foreground hover:text-primary transition">
                Products
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link 
                to={`/category/${encodeURIComponent(product.category)}`} 
                className="text-muted-foreground hover:text-primary transition"
              >
                {product.category}
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Detail Section */}
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images - Left Side */}
            <div className="lg:sticky lg:top-[186px] lg:self-start">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex lg:flex-col gap-2 order-2 lg:order-1">
                  {productImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 relative order-1 lg:order-2">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <div 
                      className="aspect-square overflow-hidden rounded-lg bg-muted relative group cursor-zoom-in"
                      onMouseEnter={() => setImageZoom(true)}
                      onMouseLeave={() => setImageZoom(false)}
                      onClick={() => setImageZoom(!imageZoom)}
                    >
                      <img
                        src={productImages[selectedImage]}
                        alt={product.name}
                        className={`w-full h-full object-contain p-4 transition-transform duration-300 ${
                          imageZoom ? "scale-150" : "scale-100"
                        }`}
                      />
                      {imageZoom && (
                        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                          <ZoomIn className="w-4 h-4" />
                          Click to zoom out
                        </div>
                      )}
                    </div>
                  </Card>
                  {product.discount && (
                    <Badge 
                      variant="destructive" 
                      className="absolute top-4 left-4 text-lg px-4 py-2 shadow-lg z-10"
                    >
                      -{product.discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Product Information - Right Side */}
            <div className="space-y-6">
              {/* Back Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {/* Product Title & Category */}
              <div>
                <Badge variant="outline" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {product.features || "Premium quality product with excellent features"}
                </p>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground">
                  {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
                </span>
                <Separator orientation="vertical" className="h-6" />
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Check className="w-3 h-3 mr-1" />
                  In Stock
                </Badge>
              </div>

              {/* Price */}
              <div className="bg-primary-light/20 rounded-lg p-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-foreground">
                    ${parseFloat(product.price).toLocaleString()}
                  </span>
                  {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
                    <>
                      <span className="text-2xl line-through text-muted-foreground">
                        ${parseFloat(product.originalPrice).toLocaleString()}
                      </span>
                      {product.discount && (
                        <Badge variant="destructive" className="text-base px-3 py-1">
                          Save {product.discount}%
                        </Badge>
                      )}
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Inclusive of all taxes • Free shipping on orders over $50
                </p>
              </div>

              <Separator />

              {/* Color Selection */}
              {colors[0] !== "Default" && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Color: <span className="text-primary">{colors[selectedColor]}</span>
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === index
                            ? "border-primary scale-110 ring-2 ring-primary/20"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "blue"
                              ? "#3b82f6"
                              : color.toLowerCase() === "black"
                              ? "#000000"
                              : color.toLowerCase() === "pink"
                              ? "#ec4899"
                              : color.toLowerCase() === "white"
                              ? "#ffffff"
                              : color.toLowerCase() === "brown"
                              ? "#92400e"
                              : color.toLowerCase() === "red"
                              ? "#ef4444"
                              : "#e5e7eb",
                        }}
                        aria-label={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size/Storage Selection */}
              {sizes[0] !== "One Size" && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    {product.category === "Smartphone" ? "Storage" : "Size"}: <span className="text-primary">{sizes[selectedSize]}</span>
                  </label>
                  <div className="flex gap-3 flex-wrap">
                    {sizes.map((size, index) => (
                      <Button
                        key={index}
                        variant={selectedSize === index ? "default" : "outline"}
                        onClick={() => setSelectedSize(index)}
                        size="sm"
                        className="min-w-[80px]"
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <label className="text-sm font-semibold">Quantity:</label>
                <div className="flex items-center gap-2 border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  (Max 10 per order)
                </span>
              </div>

              {/* Zipcode Check */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter zipcode"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={6}
                />
                <Button variant="outline" onClick={() => alert("Checking availability...")}>
                  Check
                </Button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button 
                    size="lg" 
                    variant="default" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </motion.div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          size="lg" 
                          variant="outline"
                          className={`${isInWishlistState ? "border-red-500 text-red-600" : ""}`}
                          onClick={handleWishlistToggle}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={isInWishlistState ? "filled" : "outline"}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Heart 
                                className={`w-5 h-5 transition-colors duration-300 ${
                                  isInWishlistState 
                                    ? "text-red-600 fill-red-600" 
                                    : "text-gray-600"
                                }`} 
                              />
                            </motion.div>
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isInWishlistState ? "Remove from Wishlist" : "Add to Wishlist"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm font-semibold">Share:</span>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Facebook className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on Facebook</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Twitter className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on Twitter</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on LinkedIn</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Share on WhatsApp</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Guarantees & Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t">
                <div className="text-center p-3 rounded-lg bg-gray-50">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders $50+</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">100% Protected</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30 Day Return</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-50">
                  <Check className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-xs font-semibold">Warranty</p>
                  <p className="text-xs text-muted-foreground">1 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Separator className="mb-8" />
            
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 max-w-2xl">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({totalReviews})</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.features || "This is a premium quality product designed to meet your needs. Made with the finest materials and attention to detail."}
                    </p>
                    {product.about && product.about.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {product.about.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {product.specs && Object.entries(product.specs).map(([key, value]) => (
                        value !== "N/A" && (
                          <div key={key} className="flex justify-between items-center py-3 border-b">
                            <span className="font-semibold text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-foreground">{value}</span>
                          </div>
                        )
                      ))}
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="font-semibold text-muted-foreground">Category:</span>
                        <span className="text-foreground">{product.category}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b">
                        <span className="font-semibold text-muted-foreground">Available Colors:</span>
                        <span className="text-foreground">{colors.join(", ")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Customer Reviews</CardTitle>
                      <Button variant="outline" size="sm">
                        Write a Review
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6 last:border-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{review.name}</span>
                                  {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified Purchase
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "fill-gray-300 text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-muted-foreground">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-muted-foreground mt-2">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        No reviews yet. Be the first to review this product!
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping & Returns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Truck className="w-5 h-5 text-primary" />
                        Shipping Information
                      </h4>
                      <ul className="space-y-2 text-muted-foreground ml-7">
                        <li>• Free shipping on orders over $50</li>
                        <li>• Standard shipping: 5-7 business days</li>
                        <li>• Express shipping: 2-3 business days (additional charges apply)</li>
                        <li>• International shipping available</li>
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <RotateCcw className="w-5 h-5 text-primary" />
                        Return Policy
                      </h4>
                      <ul className="space-y-2 text-muted-foreground ml-7">
                        <li>• 30-day return policy</li>
                        <li>• Items must be in original condition</li>
                        <li>• Free returns for defective items</li>
                        <li>• Refund processed within 5-7 business days</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">You May Also Like</h2>
              <p className="text-muted-foreground">Similar products you might be interested in</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 shadow-md"
                >
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="relative aspect-[280/200] overflow-hidden bg-muted">
                      {relatedProduct.discount && (
                        <Badge
                          variant="destructive"
                          className="absolute top-3 right-3 z-10 shadow-md"
                        >
                          -{relatedProduct.discount}%
                        </Badge>
                      )}
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-heading font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">
                          {relatedProduct.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {relatedProduct.category}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (relatedProduct.rating || 0)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-foreground">
                            ${parseFloat(relatedProduct.price).toLocaleString()}
                          </span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm line-through text-muted-foreground">
                              ${parseFloat(relatedProduct.originalPrice).toLocaleString()}
                            </span>
                          )}
                        </div>
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
                              const success = addToCart(relatedProduct, 1);
                              if (success !== false) {
                                addToast({
                                  title: "Added to Cart!",
                                  description: `${relatedProduct.name} has been added to your cart.`,
                                  icon: <Check className="w-5 h-5 text-green-600" />,
                                  duration: 2000,
                                });
                              }
                            }}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      <WebFooter />
    </div>
  );
}
