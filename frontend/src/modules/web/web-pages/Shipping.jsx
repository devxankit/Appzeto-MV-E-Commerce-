import { Link } from "react-router-dom";
import { Truck, Clock, Globe } from "lucide-react";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Shipping() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Free Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Free shipping on all orders over $50. Standard delivery time applies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Standard Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    5-7 business days. $5.99 for orders under $50.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Express Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    2-3 business days. Additional charges apply.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shipping Locations</h3>
                  <p className="text-muted-foreground">
                    We currently ship to all major cities and towns. International shipping is available 
                    to select countries. Shipping costs and delivery times vary by location.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Order Processing</h3>
                  <p className="text-muted-foreground">
                    Orders are typically processed within 1-2 business days. You'll receive an email 
                    confirmation with tracking information once your order ships.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Delivery Times</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                    <li><strong>Express Shipping:</strong> 2-3 business days</li>
                    <li><strong>International Shipping:</strong> 10-15 business days (varies by country)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Tracking Your Order</h3>
                  <p className="text-muted-foreground">
                    Once your order ships, you'll receive a tracking number via email. You can track your 
                    order status in the <Link to="/orders" className="text-primary hover:underline">Orders</Link> section 
                    of your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Delivery Issues</h3>
                  <p className="text-muted-foreground">
                    If you experience any issues with delivery, please contact our customer support team 
                    immediately. We'll work with the shipping carrier to resolve the issue.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <WebFooter />
    </div>
  );
}

