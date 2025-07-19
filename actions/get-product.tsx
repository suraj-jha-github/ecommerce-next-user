import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`

const getProduct = async (id: string): Promise<Product | null> => {
    try {
        const res = await fetch(`${URL}/${id}`);
        
        if (!res.ok) {
            console.error('Product API error:', res.status, res.statusText);
            return null;
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Product API returned non-JSON response');
            return null;
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default getProduct;