import {useEffect, useState} from "react";
import axios from "axios";
import Product from "./Product.jsx";

export default function Pantalons() {
    const [pantalons, setPantalons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:6969/api/products/categorie/pantalon')
                .then(response => {
                    setPantalons(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        fetchData();
    }, []);
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-4">
            <h1 className="text-5xl font-bold mt-4 mb-8">Pantalons</h1>
            <div className="grid grid-cols-3 gap-10">
                {pantalons.map((pantalon) => (<Product product={pantalon} key={pantalon.id} />))}
            </div>
        </div>
    )
}