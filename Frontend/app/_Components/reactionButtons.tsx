import { useEffect, useState } from "react";
import { getReview, updateReviewsShare, updateUpvoteDownvote } from "../_lib/action";
import { toast } from "react-toastify";
import { FaHeart,FaHeartBroken } from "react-icons/fa";
export default function ReactionButtons({ blogId, user,classes }: { blogId: string; user: any ;classes?:string}) {
  const [vote, setVote] = useState<boolean | null>(null);

  // Fetch initial vote state
  useEffect(() => {
    const fetchVoteStatus = async () => {
      try {
        const {review} = await getReview(blogId);
        if (review!) {
          if (review.upvote) setVote(true);
          else if (review.downvote) setVote(false);
          else setVote(null);
        }
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    fetchVoteStatus();
  }, [blogId]);

  const handleUpvote = async () => {
    if (vote === true) return;
    setVote(true);
    await updateUpvoteDownvote(blogId, true);
  };

  const handleDownvote = async () => {
    if (vote === false) return;
    setVote(false);
    await updateUpvoteDownvote(blogId, false);
  };

  const handleShare = async() => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/post/${blogId}`);
    const {status,message}=await updateReviewsShare(blogId);
    status?toast.success(message):toast.error(message);

  };

  return (
    <div className={`relative max-w-full top-2 mb-6 flex justify-around overflow-hidden border border-gray-300 ${classes}`} >
      {/* Upvote Button */}
      <button
        onClick={handleUpvote}
        className={`flex text-sm items-center justify-around border-r border-gray-300 pr-2 py-2 w-1/3 h-full duration-200 
        ${vote === true ? "bg-pink-400 text-white" : "hover:bg-gray-300"}`}
      >
        <FaHeart/>
        <h4>UP</h4>
      </button>

      {/* Downvote Button */}
      <button
        onClick={handleDownvote}
        className={`flex text-sm items-center justify-around border-r border-gray-300 pr-2 py-2 w-1/3 h-full duration-200 
        ${vote === false ? "bg-red-400 text-white" : "hover:bg-gray-300"}`}
      >
        <FaHeartBroken/>
        <h4>DOWN</h4>
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className={`flex text-sm items-center justify-around border-r border-gray-300 pr-2 py-2 w-1/3 h-full duration-200 `}
      >
        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12C4 13.3807 5.11929 14.5 6.5 14.5C7.88071 14.5 9 13.3807 9 12C9 10.6193 7.88071 9.5 6.5 9.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 6.5L9 10" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 17.5L9 14" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M16.5 21C17.8807 21 19 19.8807 19 18.5C19 17.1193 17.8807 16 16.5 16C15.1193 16 14 17.1193 14 18.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M18.665 6.74993C17.9746 7.94566 16.4457 8.35535 15.2499 7.66499C14.0542 6.97464 13.6445 5.44566 14.3349 4.24993C15.0252 3.0542 16.5542 2.64451 17.7499 3.33487" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <h4>Share</h4>
      </button>
    </div>
  );
}
