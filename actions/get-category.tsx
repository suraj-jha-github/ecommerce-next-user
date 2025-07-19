import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getCategory = async (id: string): Promise<Category | null> => {
    try {
        const res = await fetch(`${URL}/${id}`);
        
        if (!res.ok) {
            console.error('Category API error:', res.status, res.statusText);
            return null;
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Category API returned non-JSON response');
            return null;
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching category:', error);
        return null;
    }
}

export default getCategory;