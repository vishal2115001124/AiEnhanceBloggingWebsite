"use server";
import axios from "axios";
import connection from "../db/dbConnect";
import User from "../db/userModel";
import { auth, signIn, signOut } from "./auth";
import sendMailToAdmin from "./mails/mailConfig";
import reviewModel from "../db/reviewModel";
import { revalidatePath } from "next/cache";


const baseURL=process.env.NEXT_PUBLIC_BACKEND_URL;

const axiosInstance=axios.create({
    baseURL:baseURL
});
export async function upload(formData:FormData){
    const data=await axiosInstance({
        method:"POST",
        url:"/cloudinary",
        data:{formData}
    });
    // // // console.log(data);
}
export async function signInAction(){
    await signIn('google',{redirectTo:`/`});    
}
export async function SignInActionGitHub(){
    await signIn("github",{redirectTo:"/"});
}
export async function signOutAction(){
    await signOut({redirectTo:"/"});
}

// Mailling
export async function sendMail(formData:FormData){
      try{
        const mailBody={
            fullname:formData.get("fullname")+"",
            phone:formData.get("phone")+"",
            email:formData.get("email")+"",
            subject:formData.get("subject")+"",
            to:formData.get("email")+"",
            message:`${formData.get("message")}`
        }
        sendMailToAdmin(mailBody,"enquiry");
        return {status:true,message:"Mail successfully sent!"};
    }
    catch(Error:any){
        return {status:false,message:Error.message};
    }
}


// Blogs
export async function getBlogs(category:string|null=""){
    try{
        // // // // console.log("called");
        const blogs=await axiosInstance({
            method:"GET",
            url:category==""?"/blog":`/blog?category=${category}`,
        });
        // // // // console.log(blogs);
        return blogs.data.result; 
    }
    catch(err){
        // console.error("server error");
        return "";
    }
}
export async function addnewBlog(formData:FormData){
    try{
        // // // console.log(formData);
        // const blogs=await axiosInstance({
        //     method:"POST",
        //     url:"/blog/addnew",
        //     // data:{data,author}
        // });
        // return blogs.data.status;
    }
    catch(err:any|Error){
        // // // console.log(err);
    }
}
export async function getBlogById(id:string|string[]){
    try{
        const blogs=await axiosInstance({
            method:"GET",
            url:`/blog/byid/${id}`,
        });
        // // // // console.log(blogs.data);
        return blogs.data.result.blogs;
    }
    catch(err:any|Error){
        // // // console.log(err);
    }
}
export async function getBlogByIdWithReviews(id:string|string[]){
    try{
        const blogs=await axiosInstance({
            method:"GET",
            url:`/blog/byid/${id}/withreviews`,
        });
        // // // console.log(blogs.data);
        return blogs.data.result.blogs;
    }
    catch(err:any|Error){
        // // console.log(err);
    }
}
// review Actions
export async function createReview(rating: number, formData: FormData) {
    try{
    const Session = await auth();
    const userId = Session?.user._id! as string;
    const postId = formData.get("postid") as string;
    if (!userId || !postId) {
        throw new Error("Invalid user or post ID");
    }

    const [comment] = [
        formData.get("comment"),
    ];

    // Store only ObjectId references
    const review = {
        post: postId, // Storing ObjectId instead of full object
        user: userId,
        comment,
        rating,
    };
    await connection();
    const newReview = new reviewModel(review);
    // // // console.log(newReview);
    await newReview.save(); // Ensure the review is saved
    
    return JSON.stringify({status:true,data:newReview});}
    catch(Err:any){
        return ({status:false,message:"Invalid Access"});
    }
}
export async function getReviewsbyBlogId(identifier:string){
    try{
        const reviews=await reviewModel.find({post:identifier});
        revalidatePath(`/post/${identifier}`);
        return reviews;
    }
    catch(err:any){
        return {status:false,message:"Something went wrong!"}
    }
}
export async function getReview(postId:string){
    const session=await auth();
    if(session?.user._id){
        const review=await reviewModel.findOne({user:session?.user._id});
        // // console.log(review);
        return {status:true,review};
    }
    return {review:null};
}
export async function updateUpvoteDownvote(postId: string, vote: boolean) {
  try {
    const session = await auth();
    if (!session?.user?._id) {
      return { status: false, message: "User not authenticated" };
    }

    let review = await reviewModel.findOne({ post: postId });

    if (review) {
      if (vote) {
        review.upvote = true;
        review.downvote = false; // Reset downvote if upvoted
      } else {
        review.downvote = true;
        review.upvote = false; // Reset upvote if downvoted
      }
    } else {
      review = new reviewModel({
        post: postId,
        user: session.user._id,
        upvote: vote ? true : false,
        downvote: !vote ? true : false,
      });
    }

    await review.save(); // ✅ Use await to ensure save completes
    return { status: true, data: review };
  } catch (err: any) {
    console.error("Error in updateUpvoteDownvote:", err.message);
    return { status: false, message: err.message };
  }
}

export async function updateReviewsShare(postId:string){
    try {
        await connection();
        const session = await auth();
        if (!session?.user?._id) {
          return { status: false, message: "User not authenticated" };
        }
    
        let review = await reviewModel.findOne({ post: postId });
        if (review) {
          review.isShared=true;
        } else {
          review = new reviewModel({
            post: postId,
            user: session.user._id,
            isShared:true
          });
        }
        // // // console.log(review);
        await review.save(); // ✅ Use await to ensure save completes
        return { status: true, message:"link copied"  };
      } catch (err: any) {
        console.error("Error in updateReviewShare:", err.message);
        return { status: false, message: err.message };
      }

};

export async function deleteReviewById(id:string){
    try{
        // // // console.log(id);
        await reviewModel.findByIdAndDelete(id);
        revalidatePath(`/post/${id}`);
        return {status:true,message:"Your Review Deleted!"}
    }
    catch(err:any){
        return {status:false,message:"Something went wrong!"}
    }
}



// User Actions

export async function CreateUser(userData:any){
    try{
        const {provider,given_name, family_name, email,picture:profile_img}=userData;
        await connection();
        const storingData={provider,profile_img,given_name, family_name,email};
        const newUser=new User(storingData);
        await newUser.save({ validateBeforeSave: false });
        return {status:true,data:newUser};
    }
    catch(Err:any){
        console.log(Err.message);
    }
}

export async function add_Details(bindedData:any,formData:FormData){
    try{
        const Session=(await auth());
        const userId=Session?.user._id;
        const {country,interests,profile_img,language}=bindedData;
        const [username,bio,gender]=[formData.get("username"),formData.get("bio"),formData.get("gender")];
        const additionalValue:any={};
        const addIfNotEmpty = (key: string, value: any) => {
            if (value !== null && value !== undefined && value !== "") {
              additionalValue[key] = value;
            }
          };
          addIfNotEmpty("country", country);
          addIfNotEmpty("interests", interests);
          addIfNotEmpty("profile_img", profile_img);
          addIfNotEmpty("language", language);
          addIfNotEmpty("username", username);
          addIfNotEmpty("bio", bio);
          addIfNotEmpty("gender", gender);
        //   // // // console.log(additionalValue);
          const newUser=await User.findByIdAndUpdate(userId,additionalValue,{new:true});
          // // // console.log(newUser);
          sendMailToAdmin({
            email:Session?.user.email!,
            fullname:Session?.user.name
        },"welcome");
          return {status:true,data:newUser};
    }
    catch(err:any){
        console.error(err.message);
    }
}

export async function findUser(identifier:string){
    try{
        if(!identifier){
            return {};
        }
        else{
            await connection()
            return await User.findOne({email:identifier});
        }
    }
    catch(err:any){
        // // // console.log(err.message);
        return {};
    }
}
export async function findUserById(identifier:string){
    try{
            await connection()
            return await User.findById(identifier);
        }
    catch(err:any){
        // // // console.log(err.message);
        return {status:false,message:err.message};
    }
}