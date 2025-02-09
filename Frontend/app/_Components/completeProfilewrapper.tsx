"use client";
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CompleteProfileWrapper({children}:{children:ReactNode}){
    const { data: session, status } = useSession();
    const router=useRouter();
    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            const user=session.user?.username??"";
            if (!session.user.username) {
                console.log("Redirecting to profile completion page...");
                router.push(`/user/add_details/${session.user._id}`);
            }
        }
    }, [session, status, router]);
    return <>
        {children}
    </>
}