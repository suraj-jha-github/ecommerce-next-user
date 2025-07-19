import { Order } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`;

const getOrders = async (userId: string): Promise<Order[]> => {
    const res = await fetch(`${URL}?userId=${userId}`);
    return res.json();
};

export default getOrders; 