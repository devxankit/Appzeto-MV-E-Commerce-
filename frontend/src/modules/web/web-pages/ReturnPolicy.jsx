import { Link } from "react-router-dom";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Card, CardContent } from "@/components/ui/card";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Return Policy</h1>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">30-Day Return Policy</h2>
                  <p className="text-muted-foreground">
                    We want you to be completely satisfied with your purchase. If you're not happy with your order, 
                    you can return it within 30 days of delivery.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Eligibility for Returns</h3>
                  <p className="text-muted-foreground mb-2">Items must be:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>In original condition with tags attached</li>
                    <li>Unused and unwashed</li>
                    <li>In original packaging when possible</li>
                    <li>Returned within 30 days of delivery</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Non-Returnable Items</h3>
                  <p className="text-muted-foreground mb-2">The following items cannot be returned:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Personalized or customized items</li>
                    <li>Perishable goods (groceries, food items)</li>
                    <li>Items damaged by misuse</li>
                    <li>Items without proof of purchase</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Return Process</h3>
                  <ol className="list-decimal list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Contact our customer support to initiate a return</li>
                    <li>Receive a return authorization number</li>
                    <li>Package the item securely with the return label</li>
                    <li>Ship the item back to us</li>
                    <li>Receive your refund once we process the return</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Refunds</h3>
                  <p className="text-muted-foreground">
                    Refunds will be processed to the original payment method within 5-7 business days after we receive 
                    and inspect the returned item. Shipping costs are non-refundable unless the item was defective or 
                    we made an error.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                  <p className="text-muted-foreground">
                    For return requests or questions, please contact us at{" "}
                    <a href="mailto:appzetomvstore@gmail.com" className="text-primary hover:underline">
                      appzetomvstore@gmail.com
                    </a> or call us at <strong>1234567890</strong>.
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

