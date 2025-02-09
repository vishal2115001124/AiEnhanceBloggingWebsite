
import BackgroundStyleFixed from "../_Components/backgroundStyle";
import Footer from "../_Components/footer";
import HomeNavbar from "../_Components/navbar";
import PostSection from "../_Components/postSection";


export default function Page(){
    return(
        <main className="flex flex-col items-center">
            <BackgroundStyleFixed/>
            <HomeNavbar/>
                <PostSection/>
            <Footer/>
        </main>
    )
}