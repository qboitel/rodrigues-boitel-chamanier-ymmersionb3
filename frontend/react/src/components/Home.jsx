import {useEffect, useState} from "react";
import axios from "axios";
import Product from "./Product.jsx";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:6969/api/products')
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        fetchData();
    }, []);
    // display tshirt data
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-4">
            <h1 className="text-5xl font-bold mt-4 mb-8">Produits</h1>
            <div className="grid grid-cols-3 gap-10">
                {products.map((product) => (<Product product={product} key={product.id} />))}
            </div>
        </div>
    )
}