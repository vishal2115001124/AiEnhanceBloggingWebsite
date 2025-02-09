import { useSession } from "next-auth/react";
import { useOptimistic } from "react";
import { startTransition } from "react"; // 🔹 Import this
import { FaEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import { toast } from "react-toastify";
import { deleteReviewById } from "../_lib/action";
import Rating from "./rating";

interface reviewStructure {
  comment: string;
  user: {
    _id: string;
    given_name: string;
    profile_img: string;
    family_name: string;
    fullname: string;
    id: string;
  };
  rating: number;
  modifiedAt: string;
  id: string;
}

// 🔹 Optimistic Reducer Function
function commentReducer(state: reviewStructure[], action: { type: string; id?: string }) {
  switch (action.type) {
    case "DELETE_COMMENT":
      return state.filter((comment) => comment.id !== action.id);
    default:
      return state;
  }
}

export default function CommentSection({ reviews }: { reviews: reviewStructure[] }) {
  const [optimisticItems, dispatch] = useOptimistic(reviews, commentReducer);

  async function deleteItem(id: string) {
    console.log("Deleting:", id);

    // ✅ Wrap in `startTransition`
    startTransition(() => {
      dispatch({ type: "DELETE_COMMENT", id });
    });

    try {
      const { status, message } = await deleteReviewById(id);
      if (status) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error: any) {
      console.error("Delete failed:", error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="px-4">
        <h1 className="text-2xl py-5 font-semibold">Comments</h1>
        <div className="flex flex-col gap-y-2">
          {optimisticItems.length !== 0 ? (
            optimisticItems.map((review) => {
              // Ensure comment is not empty or null
              return (
                review.comment && review.comment.trim() !== "" && (
                  <Comment
                    key={review.id}
                    comment={review.comment}
                    fullname={review.user.fullname}
                    modifiedAt={review.modifiedAt}
                    rating={review.rating}
                    userId={review.user._id}
                    profile_img={review.user.profile_img}
                    id={review.id}
                    onDelete={deleteItem}
                  />
                )
              );
            })
          ) : (
            <span className="w-full text-center">No comments</span>
          )}
        </div>
      </div>
    </>
  );
}

function Comment({
  comment,
  fullname,
  userId,
  modifiedAt,
  id,
  onDelete,
  profile_img,
  rating,
}: {
  comment: string;
  fullname: string;
  userId: string;
  modifiedAt: string;
  id: string;
  onDelete: (id: string) => void;
  profile_img: string;
  rating: number;
}) {
  const { data: Session } = useSession();
  return (
    <div className="mx-auto w-full border shadow-sm px-6 py-4 rounded-lg">
      <div className="flex items-center mb-6">
        <img src={profile_img} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <div className="text-lg font-medium text-gray-800 capitalize">{fullname}</div>
          <div className="text-gray-500">{modifiedAt}</div>
        </div>
        {Session?.user._id === userId && (
          <div className="flex ml-auto gap-x-2 text-white rounded flex items-center justify-around">
            <button className="bg-blue-500 p-2 rounded-md">
              <FaEdit />
            </button>
            <button className="bg-red-500 p-2 rounded-md" onClick={() => onDelete(id)}>
              <HiTrash />
            </button>
          </div>
        )}
      </div>

      <p className="text-lg leading-relaxed mb-6">{comment}</p>
      <div className="flex justify-between items-center">
        <div>
          <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
            <i className="far fa-thumbs-up"></i> Like
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-comment-alt"></i> Reply
          </a>
        </div>
        <div>
          <Rating rating={rating} setRate={null} allowed={false} />
        </div>
        <div className="flex items-center">
          <a href="#" className="text-gray-500 hover:text-gray-700 mr-4">
            <i className="far fa-flag"></i> Report
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <i className="far fa-share-square"></i> Share
          </a>
        </div>
      </div>
    </div>
  );
}
