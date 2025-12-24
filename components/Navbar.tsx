"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='flex-center fixed top-0 z-50 w-full  py-4 backdrop-blur-sm text-white bg'>
      <div className='flex-between max-w-screen-3xl w-full mx-auto px-6 xs:px-8 sm:px-16'>
        
        <Link href="/">
          <div className='flex-center'>
            <Image src='/deeepak.jpg' 
              width={55}
              height={40}
              alt='Deepak Optical Logo'
            />
            <p className='px-2 font-semibold text-gradient_blue-yellow md:text-2xl text-sm'>Deepak Opticals</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className='gap-20 hidden md:flex'>
          <button className='body-text hover:underline underline-offset-4 cursor-pointer !font-normal'>
            <Link href="/">Home</Link>
          </button>
          <button className='body-text hover:underline underline-offset-4 cursor-pointer !font-normal'>
            <Link href="/buynow">Buy Now</Link>
          </button>
          <button className='body-text hover:underline underline-offset-4 cursor-pointer !font-normal'>
            <Link href="/services">Services</Link>
          </button>
          <button className='body-text hover:underline underline-offset-4 cursor-pointer !font-normal'>
            <Link href="/about">Contact Us</Link>
          </button>
        </div>

        {/* Business Card and Visit Us Links */}
        <ul className='flex-center text-sm gap-x-3 hidden md:flex'>
          <li className=' text-gradient_blue-yellow1 !font-bold  hidden md:block'>
            <Link href="https://drive.google.com/uc?export=download&id=1VbJmRL8y0ooBEbG_kRnE7u2zbP4_5nHn" target='_blank'> Business Card📩
            </Link>
          </li>
          <li className=' !font-normal hidden md:block'>
            <Link href="https://www.google.com/search?client=opera&q=deepak+optical+aligarh&sourceid=opera&ie=UTF-8&oe=UTF-8#" target='_blank'>
              Visit Us!
            </Link>
          </li>
        </ul>

        {/* Hamburger Icon for Small Screens */}
        <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
          <Bars3Icon className="w-6 h-6" />
        </button>
        {/* Mobile Menu */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 md:hidden text-white">
          <div className="fixed inset-0 bg-black-300 bg-opacity-50" />
          <Dialog.Panel className="fixed top-0 right-0 w-3/4 max-w-xs bg-zinc-800 h-full shadow-lg p-6">
            <button
              onClick={() => setIsOpen(false)}
              className="text-white absolute top-4 right-4"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col mt-12 space-y-6">
              <Link href="/" className="body-text hover:text-3xl" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/buynow" className="body-text hover:text-3xl" onClick={() => setIsOpen(false)}>
                Buy Now
              </Link>
              <Link href="/services" className="body-text hover:text-3xl" onClick={() => setIsOpen(false)}>
                Services
              </Link>
              <Link href="/about" className="body-text hover:text-3xl" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link href="https://drive.google.com/uc?export=download&id=1VbJmRL8y0ooBEbG_kRnE7u2zbP4_5nHn" target='_blank' className="body-text text-gradient_blue-yellow1 !font-bold hover:text-3xl" onClick={() => setIsOpen(false)}>
                Business Card📩
              </Link>
              <Link href="https://www.google.com/search?client=opera&q=deepak+optical+aligarh&sourceid=opera&ie=UTF-8&oe=UTF-8#" target='_blank' className="body-text hover:text-3xl" onClick={() => setIsOpen(false)}>
                Visit Us!
              </Link>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
    </nav>
  );
}

export default Navbar;
