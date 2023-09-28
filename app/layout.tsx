import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Kartik Test app',  
  description: 'Generated by create next app and shadcn UI',
}

export default function RootLayout({ children }: {
  children : React.ReactNode}){
  return (
  
      <html lang="en" >
        <head />
        <body className='min-h-screen bg-black-100 font-poppins text-stone-100'>
        
            {children}
        
        </body>
      </html>
  )
}

