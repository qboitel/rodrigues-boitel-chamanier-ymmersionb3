export default function Panier() {
    // retrieve products from localstorage
    let panier = (JSON.parse(localStorage.getItem("panier"))) || [];

    console.log(panier)

    function removeFromPanier() {
        localStorage.removeItem("panier");
        window.location.reload();
    }

    function totalPanier() {
        let total = 0;
        panier.forEach((item) => {
            total += item.product.price * item.quantity;
        });
        return total;
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Panier</h1>

                <form className="mt-12">
                    <section aria-labelledby="cart-heading">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {panier.length > 0 ? panier.map((item) => (
                                <li key={item.product.id} className="flex py-6">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={"http://localhost:6969/asset/"+item.product.images[0]}
                                            alt={item.product.name}
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                        <div>
                                            <div className="flex justify-between">
                                                <h4 className="text-sm">
                                                    <a href={"/produits/"+item.product.id} className="font-medium text-gray-700 hover:text-gray-800">
                                                        {item.product.name}
                                                    </a>
                                                </h4>
                                                <p className="ml-4 text-sm font-medium text-gray-900">{item.product.price}€</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{item.selectedColor}</p>
                                            <p className="mt-1 text-sm text-gray-500">{item.selectedSize}</p>
                                            <p className="mt-1 text-sm text-gray-500">Quantité : {item.quantity}</p>
                                        </div>

                                        <div className="mt-4 flex flex-1 items-end justify-between">
                                            <div className="ml-4">
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )) : <p className="text-center py-8">Votre panier est vide</p>}
                        </ul>
                    </section>

                    {/* Order summary */}
                    <section aria-labelledby="summary-heading" className="mt-10">
                        <h2 id="summary-heading" className="sr-only">
                            Order summary
                        </h2>

                        <div>
                            <dl className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-base font-medium text-gray-900">Total</dt>
                                    <dd className="ml-4 text-base font-medium text-gray-900">{totalPanier()}€</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-10">
                            <button
                                type="submit"
                                className="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                                Payer
                            </button>
                        </div>

                        <div className="mt-6 text-center text-sm">
                            <button type="submit" onClick={removeFromPanier} className="text-sm font-medium text-red-600 hover:text-red-500">
                                <span>Supprimer le panier</span>
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}