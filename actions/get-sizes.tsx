import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`

const getSizes = async (): Promise<Size[]> => {
    try {
        const res = await fetch(URL);
        
        if (!res.ok) {
            console.error('Sizes API error:', res.status, res.statusText);
            return [];
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Sizes API returned non-JSON response');
            return [];
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching sizes:', error);
        return [];
    }
}

export default getSizes;