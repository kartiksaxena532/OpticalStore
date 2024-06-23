
import React from 'react'
import SearchForm from '@/components/SearchForm'
import Filters from '@/components/Filters'
import ResourceCard from '@/components/ResourceCard'
import { getResources, getResourcesPlaylist } from '@/sanity/actions'
import Header from '@/components/Header';
import { ContainerScroll } from "@/components/conatiner-scroll";
import Image from "next/image";
import Typewriter from '@/components/Joinus'
import banner from "@/public/banner.jpeg";

function Page(){
  return (
    <main className='flex-center paddings mx-auto w-full max-screen-2xl flex-col'>
      <Typewriter/>
    </main>
  )
}

export default Page;