'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const getCartData = useSelector((state) => state.cart.cart)

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
    .then((success) => {
      setCategories(success.data);
    })
    .catch((error) => {

    });

  },[]);


  return (
    <header className="bg-white">
      <nav aria-label="Global" className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="w-auto h-8" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="w-6 h-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
              Categories
              <ChevronDownIcon aria-hidden="true" className="flex-none w-5 h-5 text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {categories.map((item) => (
                  <div
                    key={item.slug}
                    className="relative flex items-center p-1 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <Link href={`/products/${item.slug}`} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link href="/about-us" className="text-sm font-semibold leading-6 text-gray-900">
            About Us
          </Link>
          <Link href="/contact-us" className="text-sm font-semibold leading-6 text-gray-900">
            Contact Us
          </Link>
        </PopoverGroup>
        
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            
            <Link href={'/cart'} className="p-2 text-gray-600 transition-colors duration-300 rounded lg:px-4 md:mx-2 hover:bg-gray-200 hover:text-gray-700">Cart ({ getCartData.length })  </Link>
            <Link href={'/login'} className="p-2 text-center text-indigo-600 transition-colors duration-300 border border-transparent rounded lg:px-4 md:mx-2 hover:bg-indigo-100 hover:text-indigo-700">Login</Link>
            <Link href={'/signup'} className="p-2 mt-1 text-center text-indigo-600 transition-colors duration-300 border border-indigo-600 border-solid rounded lg:px-4 md:mx-2 hover:bg-indigo-600 hover:text-white md:mt-0 md:ml-1">Signup</Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="w-auto h-8"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="w-6 h-6" />
            </button>
          </div>
          <div className="flow-root mt-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6 space-y-2">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Categories
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  {categories.map((item) => (
                      <DisclosureButton
                        key={item.slug}
                        as="a"
                        href={item.href}
                        className="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                </Disclosure>
                <Link
                  href="about-us"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  About Us
                </Link>
                <Link
                  href="contact-us"
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
                >
                  Contact Us
                </Link>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>

                

              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
