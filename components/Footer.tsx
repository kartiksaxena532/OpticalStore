import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer className='text-white-800 flex-between body-text w-full gap-y-10 border-t-2 border-black-400 bg-black-100 px-20 py-12 max-md:flex-col '>
      <p className='text-center'>
        Copyright © 2023 Deepak Opticals😎
      </p> 
      <div className='flex gap-x-9'>
        <Link href="/terms"> Terms & Conditions      
        </Link>
        <Link href="/privacy"> Privacy Policy      
        </Link>
      </div>
    </footer>
  )
}

export default Footer