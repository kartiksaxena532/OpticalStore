import React from 'react'
import SearchForm from '@/components/SearchForm'
import Filters from '@/components/Filters'
import ResourceCard from '@/components/ResourceCard'
import { getResources, getResourcesPlaylist } from '@/sanity/actions'
import Header from '@/components/Header';
import { ContainerScroll } from "@/components/conatiner-scroll";
import Image from "next/image";
import banner from "@/public/banner.jpeg";
export const revalidate = 900;

interface Props {
  searchParams: { [key: string]: string | undefined }
}

const Page = async ({ searchParams }: Props) => {
  const resources = await getResources({
    query: searchParams?.query || '',
    category: searchParams?.category || '',
    page: '1'
  })
  const resourcesPlaylist = await getResourcesPlaylist();
  
  console.log(resourcesPlaylist);

  return (
    <main className='flex-center paddings mx-auto w-full max-screen-2xl flex-col'>
<div className=" -mt-16 flex flex-col overflow-hidden">
    <ContainerScroll
      titleComponent={
        <>
          <h1 className="text-4xl md:text-7xl font-semibold text-white animate-bounce">
          The Widest Range Of <br />
            <span className="text-7xl md:text-9xl font-bold mt-1 leading-none">
            Eyewears😎 
            </span>
          </h1>
        </>
      }
    >
      <Image
        src={banner}
        alt="hero"
        height={720}
        width={1400}
        className="mx-auto rounded-2xl object-cover h-full object-left-top"
        draggable={false}
      />
    </ContainerScroll>
  </div>
<SearchForm/>

<Filters/>

{(searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-5">
          <Header
            query={searchParams?.query || ''}
            category={searchParams?.category || ''}
          />

          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? (
              resources && resources.map((resource: any) => (
                <ResourceCard 
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  downloadNumber={resource.views}
                  downloadLink={resource.downloadLink}
                />
              ))
            ): (
              <p className="body-regular text-white-400">
                No resources found
              </p>
            )}
          </div>
        </section>
      )}

      {resourcesPlaylist.map((item: any) => (
        <section key={item._id} className="flex-center mt-6 w-full flex-col sm:mt-20">
          <h1 className="heading3 self-start text-white-800">{item.title}</h1>
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {item.resources &&item.resources.map((resource: any) => (
                <ResourceCard 
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  image={resource.image}
                  downloadNumber={resource.views}
                  downloadLink={resource.downloadLink}
                />
              ))}
          </div>
        </section>
      ))}
    </main>
  )
}

export default Page