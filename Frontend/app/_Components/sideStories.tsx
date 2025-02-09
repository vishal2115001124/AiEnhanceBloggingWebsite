import Image from "next/image";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import RecommendedArticle from "./recommededArticle";
import Link from "next/link";
export default function SideStories(){
    return(
        <div className="flex flex-col w-[30%] p-3">
        <h1 className="flex items-center text-[30px]  --main--logo" ><HiOutlinePaintBrush/>AI Enchance blogging</h1>
        <div>
          <p className="min-w-[200px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus impedit, dicta aspernatur suscipit doloribus maiores tempore totam veritatis minima commodi!</p>
          <form action="" className="w-11/12 flex justify-center items-center border-2 border-gray-200 rounded-lg m-3 overflow-hidden">
            <input type="text" placeholder="Search articles" className="p-2 w-[90%] focus:outline-0"/>
            <button type="submit" className="swalling w-[10%]"><IoSearchOutline className="text-[20px]"/></button>
          </form>
          <div className="border-b-[1px] bg-gray-200"></div>
          <section className="flex flex-col items-center">
            <span className="text-[30px]" style={{fontFamily:"Bebas Neue , sans-serif"}}>Top trending 🔥</span>
            <div className="flex flex-wrap gap-x-2 justify-center ">
              <Link href="/post?category=science" className="px-2 py-1 bg-gray-200 rounded-md m-1 hover:bg-gray-300">Science</Link>
              <Link href="/post?category=health" className="px-2  py-1 bg-gray-200 rounded-md m-1  hover:bg-gray-300">Health</Link>
              <Link href="/post?category=politics" className="px-2  py-1 bg-gray-200 rounded-md m-1  hover:bg-gray-300">Politics</Link>
              <Link href="/post?category=awareness" className="px-2 py-1 bg-gray-200 rounded-md m-1  hover:bg-gray-300">General Awareness</Link>
              <Link href="/post?category=sports" className="px-2 py-1 bg-gray-200 rounded-md m-1 hover:bg-gray-300">Sports</Link>
            </div>
          </section>
          <section className="flex flex-col items-center mt-2">
            <span className="text-[30px]" style={{fontFamily:"Bebas Neue"}}>Recommended articles</span>
            <div className="flex flex-col items-center gap-y-4">
                <RecommendedArticle/>
                <RecommendedArticle/>
                <RecommendedArticle/>
            </div>
          </section>
        </div>
    </div>
    )
}