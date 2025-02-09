"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useState } from "react"
import { createReview } from "../_lib/action";
import Rating from "./rating";
import SubmitButton from "./submitButton";
import ReactionButtons from "./reactionButtons";

export default function MakeComment({postid}:{postid:string}){
    const {data:Session}=useSession();
    const [rating,setRate]=useState(0);
    const modifiedFunc=createReview.bind(null,rating);
    
    return(
            <div className="flex w-full flex-col justify-center items-center">
                <ReactionButtons blogId={postid} user={Session?.user!}/>
                <form action={modifiedFunc} className="h-[24em] px-4 w-full rounded-[12px] bg-white border">
                    <Rating rating={rating} setRate={setRate} allowed={true}/>
                    <p className="text-xl pt-2 font-semibold text-gray-900 cursor-pointer transition-all hover:text-black">
                        Add Comment
                    </p> 
                    <div className="flex justify-around items-center">
                            <div className="w-1/12 h-[90px] flex items-center justify-center">
                                <img src={Session?.user.image!} alt="userProfile" className="h-full w-full rounded-full object-cover"/>
                            </div>
                             <textarea name="comment" className="h-40 px-3 text-sm py-1 mt-5 outline-none border-gray-300 w-10/12 resize-none border rounded-lg placeholder:text-sm" placeholder="Add your comments here"></textarea>  
                    </div>
                    <input type="text" name="postid" value={postid} className="hidden" onChange={()=>{}}/>
                    
                    <div className="flex justify-between mt-2"> 
                        <p className="text-sm text-gray-900 ">Enter atleast 15 characters</p>
                        <SubmitButton label="commenting..." classes="h-12 w-[150px] bg-black text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-gray-600">Submit</SubmitButton>
                    </div>   
                </form>   
            </div>
    )
}

