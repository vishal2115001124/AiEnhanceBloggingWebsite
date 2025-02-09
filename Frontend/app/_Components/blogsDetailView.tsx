"use client";
import { useParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import StyleDate from "@/app/_Components/styleDate";
import { getBlogByIdWithReviews } from "@/app/_lib/action";
import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import MakeComment from "./comment";
import CommentSection from "./commentSection";
import Loading from "@/app/_Components/loading";

export default function DetailView() {
    const { postblob }: { postblob: string } = useParams();
    const [blogData, setBlogData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const article = await getBlogByIdWithReviews(postblob);
                setBlogData(article); // Store the actual article object
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [postblob]);

    // Show loading state if blogData is still null
    if (loading || !blogData) {
        return <Loading />;
    }

    return (
        <>
            <div className="pb-12">
                <h1 className="text-[30px] font-extrabold uppercase text-center swalling">
                    {blogData.title}
                </h1>
                <div className="flex justify-between px-2 mb-3">
                    <div className="flex gap-x-2 cursor-pointer hover:underline">
                        <span className="w-6 h-6 rounded-full bg-red-400 overflow-hidden relative">
                            <Image
                                src={blogData?.author?.profile_img}
                                alt="avatar"
                                fill
                                className="h-full object-cover"
                            />
                        </span>
                        <span className="font-normal capitalize">
                            {blogData?.author?.fullname}
                        </span>
                    </div>
                    <div className="flex gap-x-2 items-center">
                        <FaRegClock />
                        <span>
                            <StyleDate date={blogData?.createdAt} />
                        </span>
                    </div>
                </div>
                <div className="w-full min-h-[200px] max-h-[400px] overflow-hidden flex justify-center">
                    <img src={blogData.thumbnail} alt="Article Image" className="h-full object-cover" />
                </div>
                <p className="text-[18px] text-gray-700 px-6">{blogData.desc}</p>
                {blogData.content.map((sub: any, index: number) => (
                    <div key={index}>
                        {sub.con_type === "heading" && (
                            <h1 className="capitalize relative font-bold left-4 text-[28px]">{sub.data}</h1>
                        )}
                        {sub.con_type === "para" && (
                            <p className="text-[18px] text-gray-700 py-2 px-4">{sub.data}</p>
                        )}
                        {sub.con_type === "image" && <img className="w-3/4" src={sub.data} />}
                    </div>
                ))}
            </div>
            <Suspense fallback={<Loading/>}>
                <MakeComment postid={postblob} />
                <CommentSection reviews={blogData.reviews} />
            </Suspense>
        </>
    );
}
