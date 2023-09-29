"use client"
import React, { useState } from 'react'
const links =['All','Branded','Spectacles','Sunglasses','Contact Lens']
const Filters = () => {
  const[active,setActive]=useState('');
  const handleFilter =(Link:string)=>{
    setActive(Link);
  }
  return (
    <ul className='text-white-800 body-text no-scrollbar
    flex w-full max-w-full gap-2 overflow-auto py-12  sm:max-w-2xl'>
{links.map((Link)=>(

<button key={Link}
onClick={()=>handleFilter(Link)}
className={`${active === Link ? "gradient_blue-purple" :" " }  whitespace-nowrap rounded-lg px-5 py-2.5 capitalize`}
>

{Link}
</button>


))}

    </ul>
  )
}

export default Filters