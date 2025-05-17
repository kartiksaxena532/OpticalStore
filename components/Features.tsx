import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { FaCar, FaEye, FaMobileAlt, FaSun } from "react-icons/fa";

export default function Features() {
  return (
   
   <section id="lenses" className="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-black-100">
    <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white-800 mb-4">Advanced Lens Technology</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">Crystal clear vision with our premium lens options tailored to your needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
                <div className="grid grid-cols-2 gap-6">
                    {/* Lens 1 */}
                    <div className="product-card bg-white rounded-xl p-6 shadow-lg">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaEye className="fas fa-eye text-blue-600 text-2xl"/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Anti-Reflective</h3>
                        <p className="text-gray-600 text-center">Reduce glare and eye strain for clearer vision</p>
                    </div>

                    <div className="product-card bg-white rounded-xl p-6 shadow-lg">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaSun className="fas fa-sun text-indigo-600 text-2xl"/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Photochromic</h3>
                        <p className="text-gray-600 text-center">Automatically adjust to changing light conditions</p>
                    </div>

                    <div className="product-card bg-white rounded-xl p-6 shadow-lg">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaMobileAlt className="fas fa-mobile-alt text-green-600 text-2xl"/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Blue Light</h3>
                        <p className="text-gray-600 text-center">Protect your eyes from digital screen strain</p>
                    </div>

                    <div className="product-card bg-white rounded-xl p-6 shadow-lg">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <FaCar className="text-purple-600 text-2xl"/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Polarized</h3>
                        <p className="text-gray-600 text-center">Eliminate harsh glare for safer driving</p>
                    </div>
                </div>
            </div>
            
            <div className="order-1 md:order-2 relative">
                <img 
                    src="https://plus.unsplash.com/premium_photo-1677333502598-c7023d305395?blend=000000&blend-alpha=10&blend-mode=normal&blend-w=1&crop=faces%2Cedges&h=630&mark=https:%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60&ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEzMzM1ODkyfA&ixlib=rb-4.0.3" 
                    alt="Lens Technology" 
                    className="w-[680vw] h-[50vh] mx-auto rounded-lg shadow-xl animate-spring" 
                />
                <div className="absolute -bottom-20 left-8 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-bounce"></div>
                 <div className="absolute   -top-20 right-8 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-bounce"></div>
            </div>

        </div>
    </div>
</section>

  )
}
