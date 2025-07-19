import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`

const getColors = async (): Promise<Color[]> => {
    try {
        const res = await fetch(URL);
        
        if (!res.ok) {
            console.error('Colors API error:', res.status, res.statusText);
            return [];
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Colors API returned non-JSON response');
            return [];
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching colors:', error);
        return [];
    }
}

export default getColors;