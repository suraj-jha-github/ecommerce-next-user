import Container from "@/components/ui/container";
import OrderList from "./components/order-list";
import getOrders from "@/actions/get-orders";
import { Order } from "@/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const OrdersPage = async () => {
    // For demo purposes, we'll use a consistent user ID
    // In a real app, this would come from your authentication system
    const userId = "demo_user_123"; // This should come from your auth system
    
    let orders: Order[] = [];
    try {
        orders = await getOrders(userId);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }

    return (
        <Container>
            <div className="px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
                    <div className="lg:col-span-12">
                        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Track your orders and view order history
                        </p>
                        <OrderList orders={orders} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default OrdersPage; 