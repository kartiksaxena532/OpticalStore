import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='text-white '>
      <p className=''>
        Copyright © 2023 Deepak Opticals | All Rights Reserved 📱  
      </p> 
      <div className='flex gap-x-9'>
        <Link href="/"> Terms & Conditions      
        </Link>
        <Link href="/"> Privacy Policy      
        </Link>

      </div>
    </footer>
  )
}

export default Footer