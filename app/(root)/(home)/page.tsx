
import React from 'react'
import Home  from "@/components/Home"
import Stats from "@/components/Stats"
import Brands from "@/components/Brands"
import Product from "@/components/Product"
import Newsletter from "@/components/Newsletter"

function Page(){
  return (
    <main className='justify-center items-center flex flex-col paddings w-full max-screen-2xl '>
      <Home/>
      <Brands/>
      <Stats/>
  <Product/>
  <Newsletter/>
    </main>
  )
}

export default Page;