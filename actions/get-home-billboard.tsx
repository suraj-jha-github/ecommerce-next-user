import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getHomeBillboard = async (): Promise<Billboard | null> => {
    try {
        const res = await fetch(`${URL}/home`);
        if (!res.ok) {
            return null;
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching home billboard:', error);
        return null;
    }
}

export default getHomeBillboard; 