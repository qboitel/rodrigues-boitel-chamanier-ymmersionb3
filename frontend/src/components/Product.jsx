/* eslint-disable react/prop-types */
export default function Product({product}) {
    return (
        <div key={product.id} className="group relative border border-gray-200 rounded-xl h-fit">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-xl bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                    src={"http://localhost:6969/asset" + product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="flex justify-between p-4">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href={"/produits/" + product.id} className="line-clamp-1">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </h3>
                    {product.reduction ?
                        <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                            <span className="line-through">{product.price}€</span>
                            {' '}
                            <span className="text-red-600 font-bold ml-2">{product.price * (1 - (product.reduction/100))}€</span>
                        </p>
                    : <p className="mt-1 text-sm text-gray-900 line-clamp-1">{product.price}€</p>}
                </div>
            </div>
        </div>
    )
}