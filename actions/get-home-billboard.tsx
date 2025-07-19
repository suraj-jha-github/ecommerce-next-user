import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

const getHomeBillboard = async (): Promise<Billboard | null> => {
    try {
        const res = await fetch(`${URL}/home`);
        if (!res.ok) {
            console.error('Home billboard API error:', res.status, res.statusText);
            return null;
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Home billboard API returned non-JSON response');
            return null;
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching home billboard:', error);
        return null;
    }
}

export default getHomeBillboard; 