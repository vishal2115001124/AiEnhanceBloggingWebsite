import {SignUp } from '@clerk/nextjs'
import BackgroundStyleFixed from '@/app/_Components/backgroundStyle';
import HomeNavbar from '@/app/_Components/navbar';
import Footer from '@/app/_Components/footer';
import { Suspense } from 'react';
import Loading from '@/app/_Components/loading';
export default function Page() {
  return (
    <main className="flex flex-col items-center ">
    <BackgroundStyleFixed/>
    <HomeNavbar/>
    <section className=" p-3 rounded-lg shadow-2xl mt-4">
           <Suspense fallback={<Loading/>}>
                 <SignUp />
           </Suspense>
    </section>
    <Footer/>
   </main>
  )
}