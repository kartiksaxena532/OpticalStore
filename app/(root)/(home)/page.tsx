import React from 'react'
import SearchForm from '@/components/SearchForm'
import Filters from '@/components/Filters'
const page = () => {
  return (
    <main className='flex-center paddings mx-auto w-full max-screen-2xl flex-col'>
<section className='m-16 w-full'>
  <div className='flex-center relative min-h-[375px] w-full flex-col rounded-xl bg-banner
  bg-center bg-cover text-center'>

<h1 className='sm:headings1 text-6xl font-bold mb-6 text-center text-white'>The Widest Range Of Spectacles😎 </h1>

  </div>
<SearchForm/>
<Filters/>
</section>
    </main>
  )
}

export default page