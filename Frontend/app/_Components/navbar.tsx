import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { auth } from "../_lib/auth";
import SignOutBtn from "./signOutButton";

export default async function HomeNavbar(){
  const Session=await auth();
  const user=Session?.user;

    const pathname="/home"; ;//usePathname();

    return(
        <nav className="p-3 h-25 w-full">
        <div className="">
            <ol className="flex gap-x-2">
              <li><FaFacebookF className="swalling"/></li>
              <li><FaXTwitter className="swalling"/></li>
              <li><FaInstagram className="swalling"/></li>
              <li><FaLinkedinIn className="swalling"/></li>
            </ol>
            <Logo/>
            <div className="absolute right-4 top-8 flex items-center">
              <form action="" className="flex relative p-3 search--tab--navbar">
                <input type="text" placeholder="Search..." className="absolute transition bg-gray-200" />
                <button type="submit" className="text-[25px]"><IoSearchOutline className="swalling"/></button>
              </form>
              {user?<>
              <Link href={`/user/${user.email}`} className="flex justify-center items-center ">
                  <img src={user.image??""} alt={user.name+" profile"} className="w-6 h-6 rounded-full mr-1"></img>
                  <span className="hover:underline">{user.name}</span>
              </Link>
              <SignOutBtn/>
              </>
              :
              <Link href={"/signin"} className="uppercase bg-black text-white rounded-lg px-3 py-1 text-[15px] swalling">SignUp</Link>}
            </div>
        </div>
        <div className="w-full">
          <ol className="flex justify-center gap-x-10 --sub-heading text-gray-600">
          {user && <li className="relative -top-2"><Link href="/post/addpost" className="px-4 py-2 flex items-center justify-center  rounded-md border border-gray-300 hover:shadow-md border-black text-black font-bold"><HiOutlinePaintBrush/>Post</Link></li>}
          {user && <li className={`nav-sub-heading uppercase hover:scale-125 ${""}`}><Link href="/">For You</Link></li>}
          {user && <li className={`nav-sub-heading uppercase ${""}`}><Link href="/">Trending</Link></li>}
          {user && <li className={`nav-sub-heading uppercase ${""}`}><Link href="/">Following</Link></li>}

          {!user && <li className={`nav-sub-heading font-bold underline`}><Link href="/">HOME</Link></li>}
          {!user && <li className="">
            <div className="flex items-center  nav-sub-heading   drop-down">
                <span>Explore</span><IoIosArrowDown className="font-light icon-drop-down"/>
            </div>
            <ol className="drop-down-options options1 flex flex-col mt-2 absolute z-[10] bg-white px-3 capitalize rounded-b-md h-0 overflow-hidden">
                {<li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post">Post</Link></li>}
                <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md">Stories</li>
                <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md">About</li>
                <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md">Random</li>
            </ol>
            </li>
            }
            <li className="">
                <div className="flex items-center  nav-sub-heading   drop-down">
                    <span>CATEGORIES</span>
                    <IoIosArrowDown className="font-light icon-drop-down"/>
                </div>
                <ol className="drop-down-options options2 flex flex-col absolute z-[10] bg-white px-3 capitalize rounded-b-md h-0 overflow-hidden">
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=science">Science</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=cyber">Cyber</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=health">Health</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=god">God</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=culture">Culture</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=lifestyle">Lifestyle</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=kids">Kids</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=awareness">Awareness</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=politics">Politics</Link></li>
                  <li className="hover:bg-gray-300 hover:font-bold swalling p-2 cursor-pointer rounded-md"><Link href="/post?category=other">Other</Link></li>
                </ol>
            </li>
            <li className={`nav-sub-heading`}><Link href={"#footer"}>CONTACT </Link></li>
            <li className={`nav-sub-heading `}><Link href="/about">ABOUT</Link></li>
          </ol>
        </div>
      </nav>
    )
}

export function Logo(){
  return   <div className="flex text-[25px] m-2 justify-center items-center relative -top-2">
  <h1 className="--main--logo  -rotate-6">
     <HiOutlinePaintBrush/><span>AI Enchance blogging</span>    
  </h1>
</div>
}