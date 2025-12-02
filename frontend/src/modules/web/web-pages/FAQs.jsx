import { useState } from "react";
import { ChevronDown } from "lucide-react";
import WebNavbar from "../web-components/WebNavbar";
import WebFooter from "../web-components/WebFooter";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Simply browse our products, add items to your cart, and proceed to checkout. Fill in your shipping details and payment information to complete your order."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, PayPal, and cash on delivery (COD) for eligible orders."
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. Free shipping is available on orders over $50."
  },
  {
    question: "Can I return or exchange items?",
    answer: "Yes, we offer a 30-day return policy. Items must be in original condition with tags attached. Please visit our Returns page for more details."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to most countries. International shipping times and costs vary by location. Please check during checkout for available options."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in the Orders section of your account."
  },
  {
    question: "What if I receive a damaged item?",
    answer: "If you receive a damaged or defective item, please contact our support team immediately. We'll arrange a replacement or full refund at no cost to you."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use industry-standard encryption to protect your personal and payment information. We never share your data with third parties."
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <WebNavbar />
      <div className="h-[166px]"></div>

      <main className="w-full bg-white">
        <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <span className="font-semibold">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${
                          openIndex === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openIndex === index && (
                      <div className="px-6 pb-4">
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Still have questions? We're here to help!
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="mailto:appzetomvstore@gmail.com" className="text-primary hover:underline">
                    Email Us
                  </a>
                  <span className="text-muted-foreground">|</span>
                  <a href="tel:1234567890" className="text-primary hover:underline">
                    Call Us
                  </a>
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

