import BackgroundStyleFixed from "../../_Components/backgroundStyle";
import Footer from "../../_Components/footer";
import HomeNavbar from "../../_Components/navbar";
import Loading from "@/app/_Components/loading";
import PostEditor from "@/app/_Components/postAdder";
import { Suspense } from "react";
export default function Page(){
    return(
        <main className="flex flex-col items-center ">
         <BackgroundStyleFixed/>
         <HomeNavbar/>
         <section className="w-[1000px] rounded-lg shadow-2xl mt-4">
                <Suspense fallback={<Loading/>}>
                    <PostEditor/>
                </Suspense>
         </section>
         <Footer/>
        </main>
    )
}