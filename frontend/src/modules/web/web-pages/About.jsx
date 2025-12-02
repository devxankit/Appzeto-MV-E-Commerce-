import { Link } from "react-router-dom";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            
            <Card className="mb-8 border-0 shadow-md">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Appzeto MV store</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Appzeto MV store is your one-stop destination for all your shopping needs. 
                  We are committed to providing you with the best products at affordable prices, 
                  along with exceptional customer service.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our mission is to make online shopping easy, convenient, and enjoyable for everyone. 
                  We offer a wide range of products including electronics, fashion, groceries, 
                  home essentials, and much more.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With fast shipping, secure payment options, and a hassle-free return policy, 
                  we strive to ensure your complete satisfaction with every purchase.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground text-sm">
                    To provide quality products at affordable prices with excellent customer service.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">💡</div>
                  <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                  <p className="text-muted-foreground text-sm">
                    To become the most trusted and preferred online shopping platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                  <p className="text-muted-foreground text-sm">
                    Integrity, quality, customer satisfaction, and innovation.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <WebFooter />
    </div>
  );
}

