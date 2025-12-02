import { Link } from "react-router-dom";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Card, CardContent } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Last Updated: January 2024</h2>
                  <p className="text-muted-foreground">
                    At Appzeto MV store, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Information We Collect</h3>
                  <p className="text-muted-foreground mb-2">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely through our payment partners)</li>
                    <li>Order history and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">How We Use Your Information</h3>
                  <p className="text-muted-foreground mb-2">We use your information to:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Process and fulfill your orders</li>
                    <li>Send you order confirmations and updates</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Improve our services and website experience</li>
                    <li>Send you promotional offers (with your consent)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Data Security</h3>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your personal information. All payment transactions are encrypted and processed securely.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                  <p className="text-muted-foreground">
                    If you have questions about this Privacy Policy, please contact us at{" "}
                    <a href="mailto:appzetomvstore@gmail.com" className="text-primary hover:underline">
                      appzetomvstore@gmail.com
                    </a>
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

