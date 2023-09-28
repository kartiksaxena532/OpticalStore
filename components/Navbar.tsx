import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 py-7 text-white'>
   <div className='flex-between max-w-screen-2xl w-full mx-auto px-6 xs:px-8 sm:px-16 '>
<Link href="/">
  <Image src='/jsm-logo.svg' 
  width={55}
  height={40}
  alt='Deepak Optical Logo'/>
</Link>

<Image src='/hamburger-menu.svg' 
className='block sm:hidden'
width={30}
height={30}
alt='hamburger'/>
<ul className='flex-center gap-x-3 max-md:hidden md:gap-x-10'>
<li className='body-text text-gradient_blue-purple !font-bold'>
<Link href="https://maps.app.goo.gl/nMwT3XG6ZZGwi5iv6" target='blank'>
Visit Us!
</Link>

</li>

<li className='body-text !font-normal'>
<Link href="https://www.google.com/search?client=opera&q=deepak+optical+aligarh&sourceid=opera&ie=UTF-8&oe=UTF-8#" target='blank'>
Leave A Review
</Link>

</li>


</ul>
</div>
   </nav>
  )
}

export default Navbar