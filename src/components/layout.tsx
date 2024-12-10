import "../app/globals.css";
import '@/styles/Layout.css'
import Navbar from './navbar'
import Footer from './footer'
import '@/styles/Layout.css'

import { ReactNode } from 'react';


export default function Layout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <>
      <div className="flex flex-nowrap flex-col min-h-screen">
        <Navbar />
          <main className="container flex-grow mx-auto px-4 pt-12 my-15 pb-24">
            {children}
          </main>
        <Footer />
      </div>
    </>
  )
}
