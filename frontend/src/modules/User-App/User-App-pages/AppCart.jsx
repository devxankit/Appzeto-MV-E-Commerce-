import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import AppLayout from "../User-App-components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart } from "../../../context/CartContext";

export default function AppCart() {
  const { cartItems, updateCartQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  const handleQuantityChange = (cartId, delta) => {
    const item = cartItems.find((item) => item.cartId === cartId);
    if (item) {
      updateCartQuantity(cartId, item.quantity + delta);
    }
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 1000) {
      return `₹${numPrice.toLocaleString("en-IN")}`;
    }
    return `₹${price}`;
  };

  if (cartItems.length === 0) {
    return (
      <AppLayout>
        <div className="min-h-screen w-full bg-gray-50">
          <main className="w-full bg-white">
            <section className="px-4 py-12">
              <div className="text-center">
                <ShoppingCart className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-6">
                  Looks like you haven't added anything to your cart yet.
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
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <Button variant="outline" onClick={clearCart} size="sm">
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <Card key={item.cartId} className="border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Link to={`/product/${item.id}`} className="shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.id}`}>
                              <h3 className="font-semibold text-foreground mb-1 hover:text-primary transition line-clamp-2">
                                {item.name}
                              </h3>
                            </Link>
                            {item.selectedColor && (
                              <p className="text-xs text-muted-foreground">
                                Color: {item.selectedColor}
                              </p>
                            )}
                            {item.selectedStorage && (
                              <p className="text-xs text-muted-foreground">
                                Storage: {item.selectedStorage}
                              </p>
                            )}
                            <div className="flex items-baseline gap-2 mt-2">
                              <span className="text-base font-bold text-foreground">
                                {formatPrice(item.price)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-xs line-through text-muted-foreground">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-destructive hover:text-destructive shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center gap-2 border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.cartId, -1)}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.cartId, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Subtotal</p>
                            <p className="text-base font-bold">
                              {formatPrice((parseFloat(item.price) * item.quantity).toString())}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <Card className="sticky bottom-20 border-0 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <Separator className="mb-4" />

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">
                      {formatPrice(cartTotal.toString())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">
                      {formatPrice((cartTotal * 0.1).toFixed(0))}
                    </span>
                  </div>
                </div>

                <Separator className="mb-4" />

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice((cartTotal * 1.1).toFixed(0))}
                  </span>
                </div>

                <Button asChild className="w-full mb-3" size="lg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>

                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link to="/app/home">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </AppLayout>
  );
}


