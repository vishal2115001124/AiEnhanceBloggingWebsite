import { MdArrowBackIosNew,MdArrowForwardIos } from "react-icons/md";
export default function Pagination(){
    return(
        <div className="hidden sm:flex sm:flex-1 text-white sm:items-center sm:justify-between">
        <div>
        <p className="text-sm text-white font-bold">
          Showing
          <span className="font-medium mx-1">1</span>
          to
          <span className="font-medium mx-1">10</span>
          of
          <span className="font-medium mx-1">97</span>
          results
        </p>
      </div>
        <div>
        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0">
            <MdArrowBackIosNew/>
          </a>
         <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">1</a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0">2</a>
          <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white focus:outline-offset-0">...</span>
          <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0">9</a>
          <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0">10</a>
          <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-white hover:bg-black focus:z-20 focus:outline-offset-0">
            <MdArrowForwardIos/>
          </a>
        </nav>
      </div>
      </div>
    )
}