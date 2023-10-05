import { Disclosure } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {Bars3Icon, ShoppingCartIcon, XMarkIcon} from '@heroicons/react/24/outline'

export default function Navbar() {
    return (
        <Disclosure as="nav" className="bg-white shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                        <div className="flex h-16 justify-between">
                            <div className="flex px-2 lg:px-0">
                                <div className="flex items-center">
                                    <a href="/">
                                        <img
                                            className="h-16 w-auto"
                                            src="/1.png"
                                            alt="Your Company"
                                        />
                                    </a>
                                </div>
                                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                                    <a
                                        href="/"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"
                                    >
                                        Accueil
                                    </a>
                                    <a
                                        href="/t-shirts"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"
                                    >
                                        T-Shirts
                                    </a>
                                    <a
                                        href="/pulls"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"
                                    >
                                        Pulls
                                    </a>
                                    <a
                                        href="/pantalons"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"
                                    >
                                        Pantalons
                                    </a>
                                    <a
                                        href="/shorts"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"
                                    >
                                        Shorts
                                    </a>
                                    <a
                                        href="/vestes"
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium hover:border-gray-300 hover:text-gray-700"
                                    >
                                        Vestes
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
                                <form action="/search" className="w-full max-w-lg lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full rounded-lg border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
                                            placeholder="Search"
                                            type="search"
                                            defaultValue={window.location.search.split('=')[1]}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="hidden lg:ml-4 lg:flex lg:items-center">
                                <a
                                    href="/panier"
                                    className="relative flex flex-shrink-0 rounded-full bg-white p-1 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View basket</span>
                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                    <span className="ml-2">Panier</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="space-y-1 pb-3 pt-2">
                            <Disclosure.Button
                                as="a"
                                href="/"
                                className="block border-l-4 border-red-500 bg-red-50 py-2 pl-3 pr-4 text-base font-medium text-red-700"
                            >
                                Accueil
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/t-shirts"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                T-Shirts
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/pulls"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Pulls
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/pantalons"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Pantalons
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/shorts"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Shorts
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/vestes"
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                Vestes
                            </Disclosure.Button>
                            <Disclosure.Button
                                as="a"
                                href="/panier"
                                className="relative flex border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800"
                            >
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                <span className="ml-2">Panier</span>
                            </Disclosure.Button>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}