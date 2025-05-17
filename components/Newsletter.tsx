import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
    return (
<section className="py-5 px-4 sm:px-6 lg:px-8 gradient-bg text-white">
    <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Stay Updated</h2>
        <p className="text-xl mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and eye care tips.
        </p>
        <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-l-full sm:rounded-r-none rounded-r-full mb-2 sm:mb-0 w-full focus:outline-none text-gray-800" 
            />
            <button className="bg-white text-indigo-600 hover:bg-blue-200 px-6 py-3 rounded-r-full sm:rounded-l-none rounded-l-full font-semibold transition duration-300">
                Subscribe
            </button>
        </div>
    </div>
</section>
           
    )
}