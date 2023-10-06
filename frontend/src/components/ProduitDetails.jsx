import {useEffect, useState} from 'react'
import { RadioGroup, Tab } from '@headlessui/react'
import "./../index.css"
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProduitDetails() {
    // retrieve product from api
    const [product, setProduct] = useState({
        id: 0,
        name: "",
        price: 0,
        brand: "",
        description: "",
        images: [],
        colors: [],
        size: [],
    });

    // get product id from url
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);

    useEffect(() => {
        async function fetchData() {
            await fetch('http://localhost:6969/api/products/product/'+id)
                .then(response => response.json())
                .then(data => {
                    setProduct(data);
                })
                .catch(error => {
                    console.log(error)
                });
        }
        fetchData();
    }, [id]);

    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.size[0])

    // get panier from localstorage
    let panier = (JSON.parse(localStorage.getItem("panier"))) || [];

    // add product to panier with quantity and add only if item does not already exists in panier
    // for product color and size, we only take the selected one
    function addToPanier() {
        let found = false;
        if (selectedColor === undefined || selectedSize === undefined) {
            alert("Veuillez sélectionner une couleur et une taille");
            return;
        }
        for (let i = 0; i < panier.length; i++) {
            if (panier[i].product.id === product.id && panier[i].selectedColor === selectedColor && panier[i].selectedSize === selectedSize) {
                panier[i].quantity += 1;
                found = true;
                continue;
            }
        }
        if (!found) {
            panier.push({product: product, quantity: 1, selectedColor: selectedColor, selectedSize: selectedSize});
        }
        localStorage.setItem("panier", JSON.stringify(panier));
        alert("Produit ajouté au panier avec succès !");
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                {product.images.map((image) => (
                                    <Tab
                                        key={"imageGrande"+product.images.indexOf(image)}
                                        className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                    >
                                        {({ selected }) => (
                                            <>
                                                <span className="sr-only">{image}</span>
                                                <span className="absolute inset-0 overflow-hidden rounded-md">
                                                  <img src={"http://localhost:6969/asset" + image} alt="" className="h-full w-full object-cover object-center" />
                                                </span>
                                                <span
                                                    className={classNames(
                                                        selected ? 'ring-red-500' : 'ring-transparent',
                                                        'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </div>

                        <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                            {product.images.map((image) => (
                                <Tab.Panel key={"image"+product.images.indexOf(image)}>
                                    <img
                                        src={"http://localhost:6969/asset" + image}
                                        alt={image.alt}
                                        className="h-full w-full object-cover object-center sm:rounded-lg"
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            {product.reduction ?
                                <p className="mt-1 text-sm text-gray-500 line-clamp-1">
                                    <span className="text-3xl tracking-tight text-gray-500 line-through">{product.price}€</span>
                                    {' '}
                                    <span className="text-red-600 font-bold ml-2 text-3xl">{product.price * (1 - (product.reduction/100))}€</span>
                                </p>
                                : <p className="text-3xl tracking-tight text-gray-900">{product.price}€</p>}
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>

                            <div
                                className="space-y-6 text-base text-gray-700"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <form className="mt-6">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm text-gray-600">Couleur</h3>

                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                    <span className="flex items-center space-x-3">
                                    {product.colors.map((color) => (
                                        <RadioGroup.Option
                                            key={"color"+color.name}
                                            value={color}
                                            className={({ active, checked }) =>
                                                classNames(
                                                    color.bgClass,
                                                    active && checked ? 'ring ring-offset-1' : '',
                                                    !active && checked ? 'ring-2' : '',
                                                    ' relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                )
                                            }
                                        >
                                            <RadioGroup.Label as="span" className="sr-only">
                                                {color.name}
                                            </RadioGroup.Label>
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    color.bgClass,
                                                    'bg-white h-8 w-8 rounded-full border border-black border-opacity-10'
                                                )}
                                            />
                                        </RadioGroup.Option>
                                    ))}
                                  </span>
                                </RadioGroup>
                            </div>

                            {/* Size picker */}
                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-900">Taille</h2>
                                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        Voir le guide des tailles
                                    </a>
                                </div>

                                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                                    <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                        {product.size.map((size) => (
                                            <RadioGroup.Option
                                                key={size}
                                                value={size}
                                                className={({ active, checked }) =>
                                                    classNames(
                                                        active ? 'ring-2 ring-red-500 ring-offset-2' : '',
                                                        checked
                                                            ? 'border-transparent bg-red-600 text-white hover:bg-red-700'
                                                            : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                                                        'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none'
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label as="span">{size}</RadioGroup.Label>
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="mt-10 flex">
                                <button
                                    type="submit"
                                    onClick={addToPanier}
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}