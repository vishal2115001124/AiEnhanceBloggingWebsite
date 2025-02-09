import Corousel3D from "./_Components/corousel3D";
import Footer from "./_Components/footer";
import ArticleTemplate from "./_Components/articleTemplate";
import SideStories from "./_Components/sideStories";
import HomeNavbar from "./_Components/navbar";
import BackgroundStyleFixed from "./_Components/backgroundStyle";
export default function Home() {
  return (

    <main className="flex flex-col items-center">
      <BackgroundStyleFixed/>
      <HomeNavbar/>
      <header className="w-full flex flex-col items-center">
          <div className="w-3/4 flex justify-center">
            <Corousel3D/>
          </div>
      </header>
      <section className="flex bg-white mt-12 w-[95%] rounded-md overflow-hidden">
          <div className="bg-yellow-400 w-[75%]">
              <h1 className="text-[35px] relative left-12 top-6" style={{fontFamily:"Bebas Neue"}}>Latest articles</h1>
              <div className="relative top-6 flex flex-col gap-y-4 mx-[5%] soft">
                    <ArticleTemplate />
              </div>
          </div>
          <SideStories/>
      </section>
      <Footer/>
    </main>
  );
}
