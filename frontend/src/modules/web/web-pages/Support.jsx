import { Link } from "react-router-dom";
import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Customer Support</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Live Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Chat with our support team in real-time. Available 24/7.
                  </p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Send us an email and we'll respond within 24 hours.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Phone Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">
                    Call us at: <strong>1234567890</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9 AM - 6 PM
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    FAQs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Find answers to commonly asked questions.
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/faqs">View FAQs</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Common Issues</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Tracking</h3>
                  <p className="text-muted-foreground text-sm">
                    Track your order status in the <Link to="/orders" className="text-primary hover:underline">Orders</Link> section of your account.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Returns & Refunds</h3>
                  <p className="text-muted-foreground text-sm">
                    Learn about our return policy <Link to="/return-policy" className="text-primary hover:underline">here</Link>.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Information</h3>
                  <p className="text-muted-foreground text-sm">
                    Check our <Link to="/shipping" className="text-primary hover:underline">shipping policy</Link> for delivery times and costs.
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

