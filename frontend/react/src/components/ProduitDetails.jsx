import {useEffect, useState} from 'react'
import { RadioGroup, Tab } from '@headlessui/react'
import { HeartIcon } from '@heroicons/react/24/outline'
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

    console.log(product)

    const [selectedColor, setSelectedColor] = useState(product.colors[0])

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
                                                        selected ? 'ring-indigo-500' : 'ring-transparent',
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
                            <p className="text-3xl tracking-tight text-gray-900">{product.price}€</p>
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
                                <h3 className="text-sm text-gray-600">Color</h3>

                                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                    <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                    <span className="flex items-center space-x-3">
                                    {product.colors.map((color) => (
                                        <RadioGroup.Option
                                            key={"color"+color.name}
                                            value={color.name}
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

                            <div className="mt-10 flex">
                                <button
                                    type="submit"
                                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                >
                                    Add to bag
                                </button>

                                <button
                                    type="button"
                                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Add to favorites</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}