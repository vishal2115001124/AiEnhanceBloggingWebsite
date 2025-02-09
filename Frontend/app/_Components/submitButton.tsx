"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

type SubmitButtonProps = {
    label: string;
    classes?: string;
    redirectPath?: string;
    successMsg?:string 
    children?: ReactNode; 
  };

export default function SubmitButton( {
    label,
    classes = "",
    redirectPath = "",
    successMsg="",
    children,
  }: SubmitButtonProps) {
    const {pending}=useFormStatus();
    const router=useRouter();
    if(pending && successMsg){
        toast.success(successMsg);
        if(redirectPath)
            router.push("/");
    }
    return <>
    <button 
    className={`${pending?"bg-gray-500":"bg-black"} p-2 trasition-all text-[14px] duration-300 text-white rounded-lg hover:scale-110 ${classes}`}
    disabled={pending} 
     >
        {pending?label:children}
    </button>
    </>
}