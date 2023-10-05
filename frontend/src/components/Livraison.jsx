import {useState} from "react";
import {RadioGroup} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Livraison() {
    const [addresses, setAddresses] = useState([]);
    const [selected, setSelected] = useState(null);

    async function checkAddress() {
        // get input value
        let address = document.getElementById("address").value;
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

    const handleChange = (value) => {
        setSelected(value)

        // get address
        let address = addresses.find(address => address.properties.id === value);
        // set address
        localStorage.setItem('address', JSON.stringify(address));
        // delete panier
        localStorage.removeItem('panier');
        // redirect to paiement
        window.location.href = "/panier";
    }
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
                                onChange={checkAddress}
                                className="mt-2 block w-full rounded-lg border-0 bg-white py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>
            { /* boucle sur les adresses */ }
            <div className="grid grid-cols-4 gap-6">
                <RadioGroup value={selected} onChange={handleChange}>
                    <RadioGroup.Label className="sr-only">Adresse</RadioGroup.Label>
                    <div className="space-y-4">
                        {addresses ? addresses.map((address) => (
                            <RadioGroup.Option
                                key={address.properties.id}
                                value={address.properties.id}
                                className={({ active }) =>
                                    classNames(
                                        active ? 'border-red-600 ring-2 ring-red-600' : 'border-gray-300',
                                        'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                                    )
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <span className="flex items-center">
                                            <span className="flex flex-col text-sm">
                                                <RadioGroup.Label as="span" className="font-medium text-gray-900">
                                                    {address.properties.label}
                                                </RadioGroup.Label>
                                            </span>
                                        </span>
                                        <span
                                            className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-red-600' : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-lg'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </RadioGroup.Option>
                        )) : null}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}