import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav className='flex-center fixed top-0 z-50 w-full border-b-2 border-black-200 py-7 backdrop-blur-sm text-white bg'>
   <div className='flex-between max-w-screen-2xl w-full mx-auto px-6 xs:px-8 sm:px-16  '>
    
<Link href="/">
<div className='flex-center'>
  <Image src='/deeepak.jpg' 
  width={55}
  height={40}
  alt='Deepak Optical Logo'/>
  <p  className='px-2 font-semibold text-gradient_blue-yellow text-2xl '> Deepak Opticals</p>
  </div>
</Link>



<ul className='flex-center gap-x-3  md:gap-x-10'>
<li className='body-text text-gradient_blue-yellow1 !font-bold '>
<Link href="https://drive.google.com/uc?export=download&id=1VbJmRL8y0ooBEbG_kRnE7u2zbP4_5nHn" target='blank'>
  Buisness Card📩
</Link>
</li>

<li className='body-text !font-normal max-md:hidden'>
<Link href="https://www.google.com/search?client=opera&q=deepak+optical+aligarh&sourceid=opera&ie=UTF-8&oe=UTF-8#" target='blank'>
Visit Us!
</Link>

</li>


</ul>
</div>
   </nav>
  )
}

export default Navbar
