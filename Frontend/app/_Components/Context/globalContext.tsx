"use client";
import React, { createContext, useContext, useState } from "react";


type Theme="light"|"dark";
interface globalContextInteface{
  pathname:any|null;
  setpathname:Function;
  theme:Theme;
  setTheme:Function
  currentBlog:any|{};
  setCurrentBlog:Function;
}
const Context=createContext<globalContextInteface|null>(null);

export const GlobalContextProvider=({children}:{children:React.ReactNode})=>{
    const [pathname,setpathname]=useState(null);
    const [theme,setTheme]=useState<Theme>("light");
    const [currentBlog,setCurrentBlog]=useState({});
    // const [other,setOther]=useState(null);
    return <Context.Provider value={{pathname,currentBlog,setCurrentBlog,setpathname,theme,setTheme}}>
        {children}
    </Context.Provider>
}
export const useGlobalContext=()=>{
    const globalContextvalue=useContext(Context);
    if(!globalContextvalue)
        console.log("Accessing Context out of Scope");
    else
        return globalContextvalue;
}
