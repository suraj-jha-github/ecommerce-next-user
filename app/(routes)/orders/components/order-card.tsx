"use client";

import { Order } from "@/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Package, CheckCircle, Clock, XCircle } from "lucide-react";
import OrderTracking from "./order-tracking";

interface OrderCardProps {
    data: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ data }) => {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <Clock className="w-4 h-4" />;
            case 'CONFIRMED':
                return <CheckCircle className="w-4 h-4" />;
            case 'PROCESSING':
                return <Package className="w-4 h-4" />;
            case 'SHIPPED':
                return <Truck className="w-4 h-4" />;
            case 'DELIVERED':
                return <CheckCircle className="w-4 h-4" />;
            case 'CANCELLED':
                return <XCircle className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'CONFIRMED':
                return 'bg-blue-100 text-blue-800';
            case 'PROCESSING':
                return 'bg-purple-100 text-purple-800';
            case 'SHIPPED':
                return 'bg-orange-100 text-orange-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const totalPrice = data.orderItems.reduce((total, item) => total + Number(item.product.price), 0);

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg">Order #{data.id.slice(-8)}</CardTitle>
                        <p className="text-sm text-gray-500">
                            Placed on {format(new Date(data.createdAt), "MMMM do, yyyy")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        {getStatusIcon(data.status)}
                        <Badge className={getStatusColor(data.status)}>
                            {data.status}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                    <h4 className="font-semibold">Items:</h4>
                    {data.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                    {item.product.images?.[0]?.url ? (
                                        <img 
                                            src={item.product.images[0].url} 
                                            alt={item.product.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-xs">No Image</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.product.color.name} • {item.product.size.name}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold">${Number(item.product.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div>
                        <h4 className="font-semibold mb-2">Shipping Details:</h4>
                        {data.customerName && (
                            <p className="text-sm text-gray-600">Name: {data.customerName}</p>
                        )}
                        <p className="text-sm text-gray-600">Phone: {data.phone}</p>
                        <p className="text-sm text-gray-600">Address: {data.address}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Order Summary:</h4>
                        <div className="flex justify-between">
                            <span>Total:</span>
                            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Payment Status:</span>
                            <Badge variant={data.isPaid ? "default" : "secondary"}>
                                {data.isPaid ? "Paid" : "Pending"}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span>Payment Method:</span>
                            <Badge variant={data.paymentMethod === 'COD' ? "secondary" : "default"}>
                                {data.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit Card'}
                            </Badge>
                        </div>
                        {data.trackingNumber && (
                            <div className="flex justify-between">
                                <span>Tracking:</span>
                                <span className="font-mono text-sm">{data.trackingNumber}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Tracking */}
                <OrderTracking status={data.status} />
            </CardContent>
        </Card>
    );
};

export default OrderCard; 