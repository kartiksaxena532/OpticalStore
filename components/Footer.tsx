import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear(); // Dynamic year

  return (
<footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-2xl text-blue-400 font-bold mb-4">
                    Deepak<span className="text-yellow-400"> Opticals</span>
                </h3>
                <p className="text-gray-400">
                    Premium eyewear for every vision need. Quality frames and lenses for all lifestyles.
                </p>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">Shop</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Frames</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Lenses</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Sunglasses</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Accessories</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">Company</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Careers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-lg mb-4">Connect</h4>
                <div className="flex space-x-4 mb-4">
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300">
                        <FaFacebookF className="fab fa-facebook-f"/>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300">
                        <FaTwitter className="fab fa-twitter"/>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300">
                        <FaInstagram className="fab fa-instagram"/>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition duration-300">
                        <FaPinterestP className="fab fa-pinterest-p"/>
                    </a>
                </div>
                <p className="text-gray-400">deepakopticals@gmail.com</p>
            </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {year} Deepak Opticals. All rights reserved.</p>
            <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">Shipping Policy</a>
            </div>
        </div>
    </div>
</footer>

  )
}

export default Footer
