import ProductCard from '@/app/components/productCard/page';

const Product = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard />
        </div>
    )
}

export default Product
