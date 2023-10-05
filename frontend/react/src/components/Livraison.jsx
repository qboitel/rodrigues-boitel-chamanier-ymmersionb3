import {useState} from "react";

export default function Livraison() {

    const [addresses, setAddresses] = useState([]);

    async function checkAddress() {
        // get input value
        let address = document.getElementById("address").value;
        console.log(address);
        let postalCode = document.getElementById("postal-code").value;

        if (address.length < 3) return;
        // send request to api
        await fetch("http://localhost:6969/api/address?q="+address+"&postcode="+postalCode, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                setAddresses(data.features);
            })
            .catch(error => console.log(error))
    }

    console.log(addresses);


    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8 space-y-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Livraison</h1>
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Adresse
                        </label>
                        <div className="mt-1">
                            <input
                                type="url"
                                name="address"
                                id="address"
                                min="3"
                                onChange={checkAddress}
                                className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Ville
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="city"
                                id="city"
                                className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Code postal
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
            { /* boucle sur les adresses */ }
            <div className="grid grid-cols-4 gap-6">
                {addresses.map((address) => {
                    return (
                        <div className="col-span-4" key={address.properties.id}>
                            <div className="flex items-center">
                                <input id={address.properties.id} name="address" type="radio" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                <label htmlFor={address.properties.id} className="ml-3 text-sm text-gray-600 capitalize">{address.properties.label}</label>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}