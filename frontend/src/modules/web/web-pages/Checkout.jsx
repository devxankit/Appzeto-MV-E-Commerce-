import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  CreditCard, MapPin, Truck, Shield, Lock, CheckCircle2, 
  Plus, Edit, Trash2, Wallet, Smartphone, Building2, 
  Gift, ArrowRight, ArrowLeft, Info, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../../context/CartContext";
import { useToast } from "@/components/ui/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Saved addresses
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "+1 234 567 8900",
      address: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
      type: "Home"
    }
  ]);
  
  const [selectedAddressId, setSelectedAddressId] = useState(1);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    netBankingBank: "",
    walletType: "",
  });

  const selectedAddress = savedAddresses.find(addr => addr.id === selectedAddressId) || savedAddresses[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = () => {
    if (!formData.firstName || !formData.address || !formData.phone) {
      addToast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    
    const newAddress = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      isDefault: savedAddresses.length === 0,
      type: "Home"
    };
    
    setSavedAddresses([...savedAddresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setShowAddAddress(false);
    addToast({
      title: "Address Added",
      description: "New address has been saved successfully.",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      duration: 2000,
    });
  };

  const handleApplyPromo = () => {
    const validPromos = {
      "SAVE10": { discount: 10, minAmount: 50 },
      "WELCOME20": { discount: 20, minAmount: 100 },
      "FLASH50": { discount: 50, minAmount: 200 },
    };
    
    if (validPromos[promoCode.toUpperCase()]) {
      const promo = validPromos[promoCode.toUpperCase()];
      if (cartTotal >= promo.minAmount) {
        setAppliedPromo(promo);
        addToast({
          title: "Promo Code Applied!",
          description: `You saved ${promo.discount}% on your order.`,
          icon: <Gift className="w-5 h-5 text-green-600" />,
          duration: 2000,
        });
        setShowPromoInput(false);
      } else {
        addToast({
          title: "Minimum Amount Required",
          description: `This promo code requires a minimum order of $${promo.minAmount}.`,
          variant: "destructive",
          duration: 2000,
        });
      }
    } else {
      addToast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid.",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const calculateShipping = () => {
    if (deliveryOption === "express") return 9.99;
    if (deliveryOption === "standard") return 4.99;
    return 0; // free
  };

  const calculateDiscount = () => {
    if (appliedPromo) {
      return (cartTotal * appliedPromo.discount) / 100;
    }
    return 0;
  };

  const shipping = calculateShipping();
  const tax = (cartTotal - calculateDiscount()) * 0.1;
  const discount = calculateDiscount();
  const total = cartTotal - discount + tax + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD-${Date.now()}`;
    clearCart();
    
    addToast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderId} has been confirmed.`,
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      duration: 3000,
    });
    
    navigate(`/order-confirmation/${orderId}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <WebNavbar />
        <div className="h-[166px]"></div>
        <main className="w-full bg-white">
          <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </section>
        </main>
        <WebFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep >= step
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {currentStep > step ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="text-xs mt-2 text-center">
                      {step === 1 && "Delivery"}
                      {step === 2 && "Payment"}
                      {step === 3 && "Review"}
                    </span>
                  </div>
                  {step < 3 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        currentStep > step ? "bg-primary" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Step 1: Delivery Address */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Delivery Address
                          </CardTitle>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAddAddress(!showAddAddress)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Address
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Saved Addresses */}
                        <div className="space-y-3">
                          {savedAddresses.map((address) => (
                            <label
                              key={address.id}
                              className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedAddressId === address.id
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddressId === address.id}
                                onChange={() => setSelectedAddressId(address.id)}
                                className="mt-1 w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">{address.name}</span>
                                    {address.isDefault && (
                                      <Badge variant="secondary" className="text-xs">
                                        Default
                                      </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                      {address.type}
                                    </Badge>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        // Edit functionality
                                      }}
                                    >
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    {!address.isDefault && (
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSavedAddresses(savedAddresses.filter(a => a.id !== address.id));
                                        }}
                                      >
                                        <Trash2 className="w-4 h-4 text-destructive" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {address.address}, {address.city}, {address.state} {address.zipCode}
                                </p>
                                <p className="text-sm text-muted-foreground">{address.phone}</p>
                              </div>
                            </label>
                          ))}
                        </div>

                        {/* Add New Address Form */}
                        {showAddAddress && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t pt-4 space-y-4"
                          >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  First Name *
                                </label>
                                <input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  Last Name *
                                </label>
                                <input
                                  type="text"
                                  name="lastName"
                                  value={formData.lastName}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="+1 (555) 000-0000"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Address *
                              </label>
                              <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Street address, apartment, suite, etc."
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  City *
                                </label>
                                <input
                                  type="text"
                                  name="city"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  State *
                                </label>
                                <input
                                  type="text"
                                  name="state"
                                  value={formData.state}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  ZIP Code *
                                </label>
                                <input
                                  type="text"
                                  name="zipCode"
                                  value={formData.zipCode}
                                  onChange={handleInputChange}
                                  required
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Country *
                              </label>
                              <Select
                                value={formData.country}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({ ...prev, country: value }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="United States">United States</SelectItem>
                                  <SelectItem value="Canada">Canada</SelectItem>
                                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                  <SelectItem value="India">India</SelectItem>
                                  <SelectItem value="Australia">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                type="button"
                                onClick={handleAddAddress}
                                className="flex-1"
                              >
                                Save Address
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => setShowAddAddress(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </motion.div>
                        )}

                        {/* Delivery Options */}
                        <div className="border-t pt-4">
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <Truck className="w-5 h-5" />
                            Delivery Options
                          </h3>
                          <div className="space-y-2">
                            <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              deliveryOption === "free" ? "border-primary bg-primary/5" : "border-gray-200"
                            }`}>
                              <input
                                type="radio"
                                name="delivery"
                                value="free"
                                checked={deliveryOption === "free"}
                                onChange={(e) => setDeliveryOption(e.target.value)}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">Free Delivery</span>
                                  <span className="text-sm font-semibold text-green-600">Free</span>
                                </div>
                                <p className="text-sm text-muted-foreground">5-7 business days</p>
                              </div>
                            </label>
                            <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              deliveryOption === "standard" ? "border-primary bg-primary/5" : "border-gray-200"
                            }`}>
                              <input
                                type="radio"
                                name="delivery"
                                value="standard"
                                checked={deliveryOption === "standard"}
                                onChange={(e) => setDeliveryOption(e.target.value)}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">Standard Delivery</span>
                                  <span className="text-sm font-semibold">$4.99</span>
                                </div>
                                <p className="text-sm text-muted-foreground">3-5 business days</p>
                              </div>
                            </label>
                            <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              deliveryOption === "express" ? "border-primary bg-primary/5" : "border-gray-200"
                            }`}>
                              <input
                                type="radio"
                                name="delivery"
                                value="express"
                                checked={deliveryOption === "express"}
                                onChange={(e) => setDeliveryOption(e.target.value)}
                                className="w-4 h-4"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">Express Delivery</span>
                                  <span className="text-sm font-semibold">$9.99</span>
                                </div>
                                <p className="text-sm text-muted-foreground">1-2 business days</p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 2: Payment Method */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Payment Method
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Credit/Debit Card */}
                        <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "card" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === "card"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <CreditCard className="w-6 h-6" />
                            <span className="font-semibold">Credit/Debit Card</span>
                          </div>
                        </label>

                        {formData.paymentMethod === "card" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="ml-8 space-y-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Card Number *
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                maxLength={19}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Cardholder Name *
                              </label>
                              <input
                                type="text"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  Expiry Date *
                                </label>
                                <input
                                  type="text"
                                  name="expiryDate"
                                  value={formData.expiryDate}
                                  onChange={handleInputChange}
                                  maxLength={5}
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-semibold mb-2 block">
                                  CVV *
                                </label>
                                <input
                                  type="text"
                                  name="cvv"
                                  value={formData.cvv}
                                  onChange={handleInputChange}
                                  maxLength={4}
                                  placeholder="123"
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Lock className="w-4 h-4" />
                              <span>Your payment information is secure and encrypted</span>
                            </div>
                          </motion.div>
                        )}

                        {/* UPI */}
                        <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="upi"
                            checked={formData.paymentMethod === "upi"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <Smartphone className="w-6 h-6" />
                            <span className="font-semibold">UPI</span>
                          </div>
                        </label>

                        {formData.paymentMethod === "upi" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="ml-8 space-y-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                UPI ID *
                              </label>
                              <input
                                type="text"
                                name="upiId"
                                value={formData.upiId}
                                onChange={handleInputChange}
                                placeholder="yourname@paytm"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          </motion.div>
                        )}

                        {/* Net Banking */}
                        <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "netbanking" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="netbanking"
                            checked={formData.paymentMethod === "netbanking"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <Building2 className="w-6 h-6" />
                            <span className="font-semibold">Net Banking</span>
                          </div>
                        </label>

                        {formData.paymentMethod === "netbanking" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="ml-8 space-y-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Select Bank *
                              </label>
                              <Select
                                value={formData.netBankingBank}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({ ...prev, netBankingBank: value }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your bank" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                  <SelectItem value="icici">ICICI Bank</SelectItem>
                                  <SelectItem value="sbi">State Bank of India</SelectItem>
                                  <SelectItem value="axis">Axis Bank</SelectItem>
                                  <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </motion.div>
                        )}

                        {/* Wallets */}
                        <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="wallet"
                            checked={formData.paymentMethod === "wallet"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <Wallet className="w-6 h-6" />
                            <span className="font-semibold">Wallets</span>
                          </div>
                        </label>

                        {formData.paymentMethod === "wallet" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="ml-8 space-y-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <label className="text-sm font-semibold mb-2 block">
                                Select Wallet *
                              </label>
                              <Select
                                value={formData.walletType}
                                onValueChange={(value) =>
                                  setFormData((prev) => ({ ...prev, walletType: value }))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select wallet" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="paytm">Paytm</SelectItem>
                                  <SelectItem value="phonepe">PhonePe</SelectItem>
                                  <SelectItem value="gpay">Google Pay</SelectItem>
                                  <SelectItem value="amazonpay">Amazon Pay</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </motion.div>
                        )}

                        {/* Cash on Delivery */}
                        <label className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-gray-200"
                        }`}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={handleInputChange}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-3 flex-1">
                            <Truck className="w-6 h-6" />
                            <div>
                              <span className="font-semibold">Cash on Delivery (COD)</span>
                              <p className="text-sm text-muted-foreground">Pay when you receive</p>
                            </div>
                          </div>
                        </label>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Step 3: Review Order */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <Card className="border-0 shadow-md">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Review Your Order
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Delivery Address Summary */}
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            Delivery Address
                          </h3>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="font-semibold">{selectedAddress.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}
                            </p>
                            <p className="text-sm text-muted-foreground">{selectedAddress.phone}</p>
                          </div>
                        </div>

                        {/* Payment Method Summary */}
                        <div>
                          <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <CreditCard className="w-5 h-5" />
                            Payment Method
                          </h3>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            {formData.paymentMethod === "card" && (
                              <div>
                                <p className="font-semibold">Credit/Debit Card</p>
                                <p className="text-sm text-muted-foreground">
                                  **** **** **** {formData.cardNumber.slice(-4) || "1234"}
                                </p>
                              </div>
                            )}
                            {formData.paymentMethod === "upi" && (
                              <p className="font-semibold">UPI: {formData.upiId || "yourname@paytm"}</p>
                            )}
                            {formData.paymentMethod === "netbanking" && (
                              <p className="font-semibold">Net Banking: {formData.netBankingBank || "Selected Bank"}</p>
                            )}
                            {formData.paymentMethod === "wallet" && (
                              <p className="font-semibold">Wallet: {formData.walletType || "Selected Wallet"}</p>
                            )}
                            {formData.paymentMethod === "cod" && (
                              <p className="font-semibold">Cash on Delivery</p>
                            )}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div>
                          <h3 className="font-semibold mb-3">Order Items</h3>
                          <div className="space-y-3">
                            {cartItems.map((item) => (
                              <div key={item.cartId} className="flex gap-4 p-3 border rounded-lg">
                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Quantity: {item.quantity}
                                  </p>
                                  <p className="text-sm font-semibold mt-1">
                                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Security Badge */}
                        <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold text-green-900">Secure Checkout</p>
                            <p className="text-sm text-green-700">
                              Your payment information is encrypted and secure
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  )}
                  <div className="ml-auto">
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(currentStep + 1)}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isProcessing}
                        className="min-w-[200px]"
                      >
                        {isProcessing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Place Order
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-[186px] border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Items List */}
                    <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
                      {cartItems.map((item) => (
                        <div key={item.cartId} className="flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-semibold">
                              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="mb-4" />

                    {/* Promo Code */}
                    <div className="mb-4">
                      {!appliedPromo && !showPromoInput ? (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => setShowPromoInput(true)}
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Apply Promo Code
                        </Button>
                      ) : showPromoInput ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Enter promo code"
                              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={handleApplyPromo}
                            >
                              Apply
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setShowPromoInput(false);
                                setPromoCode("");
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-900">
                              {promoCode.toUpperCase()} Applied
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setAppliedPromo(null);
                              setPromoCode("");
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount ({appliedPromo?.discount}%)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {shipping === 0 ? (
                            <span className="text-green-600 font-semibold">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator className="mb-4" />

                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-xl font-bold text-primary">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    {/* Security Info */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                      <Lock className="w-3 h-3" />
                      <span>Secure SSL encrypted payment</span>
                    </div>

                    <Button asChild variant="outline" className="w-full" size="sm">
                      <Link to="/cart">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Cart
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </section>
      </main>
      <WebFooter />
    </div>
  );
}
