import {useEffect, useState} from "react";
import axios from "axios";
import Product from "./Product.jsx";

const AllSize = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
const AllColor = ["rouge", "vert", "bleu", "noir", "blanc", "jaune", "rose"]
const AllSort = ["Prix croissant", "Prix décroissant"]

export default function TShirts() {
    // get tshirt data from api
    const [tshirts, setTshirts] = useState([]);
    const [filteredProduits, setFilteredProduits] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:6969/api/products/categorie/t-shirts')
                .then(response => {
                    setTshirts((response.data).sort((a, b) => a.price - b.price));
                    setFilteredProduits((response.data).sort((a, b) => a.price - b.price));
                })
                .catch(error => {
                    console.log(error)
                });
        }
        fetchData();
    }, []);

    const handleChange = () => {
        const size = document.querySelectorAll('input[name="size"]:checked');
        let sizes = [];
        size.forEach((size) => {
            sizes.push(size.id);
        });
        setSizes(sizes);

        const color = document.querySelectorAll('input[name="color"]:checked');
        let colors = [];
        color.forEach((color) => {
            colors.push(color.id);
        });
        setColors(colors);
    }

    // filter for each tshirt by color name
    useEffect(() => {
        // set tshirts to filter
        function filter() {
            let filteredProduits = [];
            if (colors.length === 0 && sizes.length === 0) return setFilteredProduits(tshirts);
            if (colors.length > 0) {
                filteredProduits = tshirts.filter((produit) => {
                    return colors.some((color) => {
                        return produit.colors.some((produitColor) => {
                            return produitColor.name === color;
                        });
                    });
                })
            }
            setFilteredProduits(filteredProduits);
            if (sizes.length > 0 && filteredProduits.length > 0) {
                filteredProduits = filteredProduits.filter((produit) => {
                    return sizes.some((size) => {
                        return produit.size.some((produitSize) => {
                            return produitSize === size;
                        });
                    });
                })
            } else if (sizes.length > 0 && filteredProduits.length === 0) {
                filteredProduits = tshirts.filter((produit) => {
                    return sizes.some((size) => {
                        return produit.size.some((produitSize) => {
                            return produitSize === size;
                        });
                    });
                })
            }
            setFilteredProduits(filteredProduits);

            const sort = document.getElementById('price').value;
            if (sort === "Prix croissant") {
                setFilteredProduits(filteredProduits.sort((a, b) => a.price - b.price));
            } else if (sort === "Prix décroissant") {
                setFilteredProduits(filteredProduits.sort((a, b) => b.price - a.price));
            }
        }
        filter();
    }, [colors, sizes]);

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-4">
            <h1 className="text-5xl font-bold mt-4 mb-8">T-Shirts</h1>
            <div className="grid grid-cols-4 gap-10">
                <div className="col-span-1">
                    {/* Filters */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h3 className="sr-only">Categories</h3>
                        {/* color filters */}
                        <form onChange={handleChange} className="space-y-4">
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-900">Couleur</h4>
                                <div className="flex flex-col space-y-2">
                                    {AllColor.map((color) => (
                                        <div key={color} className="flex items-center">
                                            <input id={color} name="color" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                            <label htmlFor={color} className="ml-3 text-sm text-gray-600 capitalize">{color}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* size filters */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-900">Taille</h4>
                                <div className="flex flex-col space-y-2">
                                    {AllSize.map((size) => (
                                        <div key={size} className="flex items-center">
                                            <input id={size} name="size" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                            <label htmlFor={size} className="ml-3 text-sm text-gray-600 uppercase">{size}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="sort" className="block text-sm font-medium leading-6 text-gray-900">
                                    Trier par
                                </label>
                                <select
                                    id="sort"
                                    name="sort"
                                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={AllSort[0]}
                                >
                                    {AllSort.map((sort) => (
                                        <option key={sort} value={sort}>{sort}</option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-10 col-span-3">
                    {filteredProduits.map((produit) => (<Product product={produit} key={produit.id} />))}
                </div>
            </div>
        </div>
    )
}