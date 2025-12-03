import { Link } from "react-router-dom";
import { Package, Eye } from "lucide-react";
import AppLayout from "../User-App-components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock orders data - in real app, this would come from an API
const mockOrders = [
  {
    id: "ORD-1234567890",
    date: "2024-01-15",
    status: "delivered",
    total: 27999,
    items: [
      {
        id: 2,
        name: "Oneplus Nord",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/bc93bfb0e5af20c5c0064b663f11bfc06485b75f?width=560",
        quantity: 1,
        price: 27000,
      },
    ],
  },
  {
    id: "ORD-1234567891",
    date: "2024-01-10",
    status: "processing",
    total: 56999,
    items: [
      {
        id: 1,
        name: "One plus 11 Pro 5G",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/0cac868028415b3b069d857582f3f713706a9c5a?width=560",
        quantity: 1,
        price: 56999,
      },
    ],
  },
];

export default function AppOrders() {
  const getStatusBadge = (status) => {
    const statusMap = {
      delivered: { variant: "default", label: "Delivered" },
      processing: { variant: "secondary", label: "Processing" },
      shipped: { variant: "outline", label: "Shipped" },
      cancelled: { variant: "destructive", label: "Cancelled" },
    };
    const statusInfo = statusMap[status] || statusMap.processing;
    return (
      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
    );
  };

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `₹${price.toLocaleString("en-IN")}`;
    }
    return `₹${price}`;
  };

  return (
    <AppLayout>
      <div className="min-h-screen w-full bg-gray-50">
        <main className="w-full bg-white">
          <section className="px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Orders</h1>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="delivered">Delivered</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="border-0 shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Package className="w-5 h-5 text-muted-foreground" />
                              <div>
                                <p className="font-semibold text-sm">Order #{order.id}</p>
                                <p className="text-xs text-muted-foreground">
                                  Placed on {new Date(order.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(order.status)}
                            <p className="text-base font-bold mt-2">
                              {formatPrice(order.total)}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-3">
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <Link
                                  to={`/product/${item.id}`}
                                  className="font-semibold hover:text-primary transition text-sm line-clamp-1"
                                >
                                  {item.name}
                                </Link>
                                <p className="text-xs text-muted-foreground">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="text-sm font-semibold">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/order/${order.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="processing" className="mt-6">
                <div className="space-y-4">
                  {mockOrders
                    .filter((order) => order.status === "processing")
                    .map((order) => (
                      <Card key={order.id} className="border-0 shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Package className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-semibold text-sm">Order #{order.id}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Placed on {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(order.status)}
                              <p className="text-base font-bold mt-2">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="delivered" className="mt-6">
                <div className="space-y-4">
                  {mockOrders
                    .filter((order) => order.status === "delivered")
                    .map((order) => (
                      <Card key={order.id} className="border-0 shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Package className="w-5 h-5 text-muted-foreground" />
                                <div>
                                  <p className="font-semibold text-sm">Order #{order.id}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Placed on {new Date(order.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(order.status)}
                              <p className="text-base font-bold mt-2">
                                {formatPrice(order.total)}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </main>
      </div>
    </AppLayout>
  );
}


