import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (userId: string): Promise<Order[]> => {
    try {
        const res = await fetch(`${URL}?userId=${userId}`);
        
        if (!res.ok) {
            console.error('Orders API error:', res.status, res.statusText);
            return [];
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Orders API returned non-JSON response');
            return [];
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

export default getOrders; 