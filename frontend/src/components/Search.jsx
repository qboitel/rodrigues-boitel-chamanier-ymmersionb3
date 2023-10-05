import {useEffect, useState} from "react";
import Product from "./Product.jsx";
import axios from "axios";

export default function Search() {
    const [search, setSearch] = useState([]);

    // get url params
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get('search');

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:6969/api/products/search?q=' + searchValue)
                .then(response => {
                    setSearch(response.data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        fetchData();
    }, [searchValue]);

    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 py-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <h1 className="text-5xl font-bold mt-4 mb-8">Résultats de recherche pour "{searchValue}"</h1>
            <div className="grid grid-cols-3 gap-10">
                {search.length > 0 ? search.map((search) => (<Product product={search} key={search.id} />)) : <p className="text-2xl">Aucun résultat</p>}
            </div>
        </div>
    )
}