import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import WebNavbar from "../web-components.jsx/WebNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function OrderConfirmation() {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <CheckCircle className="w-20 h-20 mx-auto text-green-600 mb-4" />
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
            </div>

            <Card className="mb-6 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                    <p className="text-xl font-bold">{orderId}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Estimated Delivery</p>
                    <p className="text-lg font-semibold">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">Order Placed</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <Truck className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">Processing</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold">Delivered</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link to="/orders">View Order History</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

