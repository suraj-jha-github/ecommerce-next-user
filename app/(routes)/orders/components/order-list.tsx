"use client";

import { Order } from "@/types";
import OrderCard from "./order-card";
import NoResults from "@/components/ui/no-results";

interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    return (
        <div className="space-y-6 mt-8">
            {orders?.length === 0 && (
                <NoResults />
            )}
            <div className="space-y-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} data={order} />
                ))}
            </div>
        </div>
    );
};

export default OrderList; 