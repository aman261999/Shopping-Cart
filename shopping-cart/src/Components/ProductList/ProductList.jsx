import ProductListItem from './ProductListItem';
import { useSelector } from "react-redux";

const ProductList = () => {
    const storeData = useSelector((state) => state.products.products.storeData);
    return (
        <div>
            <div className="bg-black p-2 w-[55%] mx-auto rounded-md mt-4">
                <h3 className="text-red-300 text-center text-lg font-inter font-bold tracking-normal leading-none">
                    Different Products and their Categories.
                </h3>
            </div>
            {storeData && storeData.length > 0 ? (
                <div className='flex flex-wrap justify-center gap-12 py-6'>
                    {storeData.slice(9, 11).
                        concat(storeData.slice(18, 21), storeData.slice(0, 2), storeData.slice(34, 38)).
                        map((product) => {
                            return (
                                <div key={product.id} data-testid={`product-${product.id}`}>
                                    <ProductListItem
                                        id={product.id}
                                        name={product.name}
                                        text={product.text}
                                        img={product.img}
                                        price={product.price}
                                        colors={product.color}
                                    />
                                </div>
                            )
                        })}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>

    )
}

export default ProductList