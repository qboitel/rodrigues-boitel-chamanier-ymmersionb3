import {useEffect, useState} from "react";
import axios from "axios";
import TShirt from "./TShirt.jsx";

export default function TShirts() {
    // get tshirt data from api
    const [tshirts, setTshirts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('http://localhost:6969/api/products')
                .then(response => {
                    // keep only those with category tshirt
                    setTshirts(response.data.filter(tshirt => tshirt.category === "t-shirts"))
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
            <h1 className="text-5xl font-bold mb-6">T-Shirts</h1>
            <div className="grid grid-cols-3 gap-4">
                {tshirts.map((tshirt) => (<TShirt tShirt={tshirt} key={tshirt.id} />))}
            </div>
        </div>
    )
}