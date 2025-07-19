import { Product } from "@/types";
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
}

const getProducts = async (query: Query): Promise<Product[]> => {
    try {
        const url = qs.stringifyUrl({
            url: URL,
            query: {
                colorId: query.colorId,
                sizeId: query.sizeId,
                categoryId: query.categoryId,
                isFeatured: query.isFeatured,
            },
        });

        const res = await fetch(url);
        
        if (!res.ok) {
            console.error('Products API error:', res.status, res.statusText);
            return [];
        }
        
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('Products API returned non-JSON response');
            return [];
        }
        
        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default getProducts;