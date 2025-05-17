import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from "react-icons/fa";

  
  export default function Example() {
    return (
     
<section id="contact" className="pb-10 px-4 sm:px-6 lg:px-8 bg-none">
    <div className="max-w-7xl mx-auto">
        <div className="md:flex items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
                <h2 className="text-xl md:text-5xl font-bold text-white-800 mb-6">Visit Our Store</h2>
                <p className="text-xl text-gray-600 mb-8">
                    Experience our eyewear collection in person and get personalized recommendations from our experts.
                </p>

                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                            <FaMapMarkedAlt className="fas fa-map-marker-alt w-5 h-5 text-blue-600"/>
                        </div>
                        <div>
                            <p className="font-semibold text-white-800">Location</p>
                            <p className=" text-xl text-gray-600">Opp Gandhi Eye Hospital , Aligarh</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                            <FaPhoneAlt className="fas w-5 h-5 fa-phone-alt text-blue-600"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white-800">Phone</h4>
                            <p className="text-xl text-gray-600">+91 9412333181</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                            <FaEnvelope className="fas w-5 h-5 fa-envelope text-blue-600"/>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white-800">Email</h4>
                            <p className=" text-xl text-gray-600">deepakoptical6793@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2">
                <div className="bg-white rounded-xl shadow-xl p-8">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h3>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-xl text-gray-700 mb-2">Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-xl text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-xl text-gray-700 mb-2">Message</label>
                            <textarea 
                                id="message" 
                                rows={4} 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full text-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

    )
  }
  