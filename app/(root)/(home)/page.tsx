
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
import Bento from "@/components/Bento"
import Spline from '@splinetool/react-spline/next';

function Page(){
  return (
    <main className='flex-center paddings mx-auto w-full max-screen-2xl flex-col'>
      <Typewriter/>
      <div className='rounded-md mb-10 hiddedn md:visible'>
      <Spline scene="https://prod.spline.design/KFonZGtsoUXP-qx7/scene.splinecode" />
      </div>
      <Bento/>
    </main>
    
  )
}

export default Page;