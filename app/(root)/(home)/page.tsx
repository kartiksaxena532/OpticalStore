import React from 'react'
import SearchForm from '@/components/SearchForm'
import Filters from '@/components/Filters'
import ResourceCard from '@/components/ResourceCard'
import { getResources, getResourcesPlaylist } from '@/sanity/actions'
import Header from '@/components/Header';
import { SpeedInsights } from "@vercel/speed-insights/next"
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
      <div>
        
      </div>
<section className='m-16 w-full'>
  <div className='flex-center relative min-h-[375px] w-full flex-col rounded-xl bg-banner
  bg-center bg-cover text-center'>

<h1 className='sm:headings1 text-6xl font-bold mb-6 text-center text-white'>The Widest Range Of Spectacles😎 </h1>

  </div>
  <SpeedInsights/>
<SearchForm/>

<Filters/>


</section>

{(searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
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