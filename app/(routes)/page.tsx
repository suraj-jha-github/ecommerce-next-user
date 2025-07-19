import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getHomeBillboard from "@/actions/get-home-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import { Product } from "@/types";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HomePage = async () => {
    let billboard = null;
    let products: Product[] = [];
    
    try {
        billboard = await getHomeBillboard();
    } catch (error) {
        console.error('Error fetching billboard:', error);
    }
    
    try {
        products = await getProducts({ isFeatured: true });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    
    return (
        <Container>
            <div className="pb-10 space-y-10">
                {billboard && <Billboard data={billboard} />}
                <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
                    <ProductList title="Featured Products" items={products} />
                </div>
            </div>
        </Container>
    )
}

export default HomePage;