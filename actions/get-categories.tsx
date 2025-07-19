import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetch(URL);
        
        if (!res.ok) {
            console.error('Categories API error:', res.status, res.statusText);
            return [];
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Categories API returned non-JSON response');
            return [];
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export default getCategories;