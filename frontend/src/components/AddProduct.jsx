const AllSize = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

const AllColor = ["rouge", "vert", "bleu", "noir", "blanc", "jaune", "rose"]

export default function AddProduct() {
    return (
        <div className="container mx-auto py-4 px-2 sm:px-4 lg:px-8">
            <h1 className="text-3xl font-bold">Ajouter un produit</h1>
            <form action="http://localhost:6969/api/products/add" method="post" encType="multipart/form-data" id="form" className="mt-4 grid grid-cols-2 gap-6">
                <div className="grid grid-rows-2 space-y-2">
                    <div className="flex flex-col">
                        <label htmlFor="name">Nom du produit</label>
                        <input type="text" className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" name="name" id="name" placeholder="Nom du produit" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="name">Marque du produit</label>
                        <input type="text" className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" name="brand" id="brand" placeholder="Marque du produit" />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="description">Description du produit</label>
                    <textarea className="mt-2 block w-full h-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" name="description" id="description" rows="3"></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price">Prix du produit</label>
                    <input type="number" className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" name="price" id="price" placeholder="Prix du produit" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="reduction">Réduction du produit</label>
                    <input type="number" className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" name="reduction" id="reduction" placeholder="Réduction du produit" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name">Catégorie du produit</label>
                    <input type="text" className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" name="category" id="category" placeholder="Catégorie du produit" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="image">Image du produit</label>
                    <input type="file" className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6" id="pics" name="pics" multiple placeholder="Image du produit" />
                </div>
                <div className="form-group">
                    <label htmlFor="size">Taille du produit</label>
                    <div className="mt-2">
                        {AllSize.map((size) => {
                            return (
                                <div key={size} className="flex items-baseline">
                                    <input className="" type="checkbox" name="size[]" value={size} id={size} />
                                    <label className="ml-2" htmlFor={size}>
                                        {size}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Couleur du produit</label>
                    <div className="mt-2">
                        {AllColor.map((color) => {
                            return (
                                <div key={color} className="flex items-baseline">
                                    <input className="form-check-input" type="checkbox" name="color[]" value={color} id={color} />
                                    <label className="ml-2 capitalize" htmlFor={color}>
                                        {color}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button type="submit" className="w-full rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 col-span-2">Ajouter le produit</button>
            </form>
        </div>
    )
}