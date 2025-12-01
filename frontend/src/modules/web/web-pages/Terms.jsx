import { Link } from "react-router-dom";
import WebNavbar from "../web-components.jsx/WebNavbar";
import WebFooter from "../web-components.jsx/WebFooter";
import { Card, CardContent } from "@/components/ui/card";

export default function Terms() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Last Updated: January 2024</h2>
                  <p className="text-muted-foreground">
                    Please read these Terms and Conditions carefully before using our website and services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Acceptance of Terms</h3>
                  <p className="text-muted-foreground">
                    By accessing and using Appzeto MV store, you accept and agree to be bound by these Terms and Conditions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Products and Pricing</h3>
                  <p className="text-muted-foreground mb-2">
                    We strive to provide accurate product information and pricing. However:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Prices are subject to change without notice</li>
                    <li>Product images are for illustration purposes only</li>
                    <li>We reserve the right to limit quantities</li>
                    <li>We may refuse or cancel orders at our discretion</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Orders and Payment</h3>
                  <p className="text-muted-foreground">
                    All orders are subject to product availability. Payment must be received before order processing. 
                    We accept various payment methods as specified during checkout.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Shipping and Delivery</h3>
                  <p className="text-muted-foreground">
                    Shipping times and costs are provided during checkout. We are not responsible for delays caused by 
                    shipping carriers or customs. Risk of loss passes to you upon delivery.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Returns and Refunds</h3>
                  <p className="text-muted-foreground">
                    Please refer to our <Link to="/return-policy" className="text-primary hover:underline">Return Policy</Link> for 
                    detailed information about returns and refunds.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-muted-foreground">
                    Appzeto MV store shall not be liable for any indirect, incidental, or consequential damages arising 
                    from the use of our website or products.
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

