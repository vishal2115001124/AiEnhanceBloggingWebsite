import DetailView from "@/app/_Components/blogsDetailView";
import Loading from "@/app/_Components/loading";
import { Suspense } from "react";
import BackgroundStyleFixed from "../../_Components/backgroundStyle";
import Footer from "../../_Components/footer";
import HomeNavbar from "../../_Components/navbar";

export default async function Page(){
    return(
        <main className="flex flex-col items-center ">
         <BackgroundStyleFixed/>
         <HomeNavbar/>
         <section className="w-[75%]  bg-white p-3 rounded-lg shadow-2xl mt-4 soft">
                <Suspense fallback={<Loading/>}>
                        <DetailView/>
                </Suspense>
         </section>
         <Footer/>
        </main>
    )
}