"use client";

import { useEffect, useState } from "react";

function stylishcreator(createdAt:any=new Date()):string{
    const date=new Date(createdAt);
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    return formattedDate};
export default function StyleDate({date}:{date:string}){
    const [styleDate,setDate]=useState(date);
    useEffect(()=>{
        setDate(stylishcreator(date));
        // console.log(styleDate);
    },[styleDate]);
    return <>
    {styleDate}
    </>
}