import {Request,Response,NextFunction } from "express";
import blogSchema from "../model/blogModel";
import User from "../model/userModel";

export const getBlogByID=async (req:Request,res:Response)=>{
    const {id}=req.params;
    const blogs=await blogSchema.findById(id).populate("author");
    return res.status(200).json({status:"ok",result:{blogs}});
}
export const getAllblogs=async (req:Request,res:Response)=>{
    const query=req.query;
    const blogs=await blogSchema.find(query).populate("author");
    return res.status(200).json({status:"ok",result:{blogs}});
};

export const createNewBlog=async(req:Request,res:Response)=>{
    const {data}=req.body;
    // console.log(data);
    let {author}=req.body;
    let user=await User.findOne({email:author.email});
    if(user){
        author=user;
    }
    else{
         author=await User.create(author);
         await author.save();
    }
    const {title,thumbnail,content,category,desc}=data;
    const blog=new blogSchema({title,thumbnail,desc,content,category,author});
    // console.log(blog);
    await blog.save();
    return res.status(201).json({status:"ok",result:{blog}});
};

export const editExistedBlog=async(req:Request,res:Response)=>{
    const blog=await blogSchema.findById(req.params.blogid);
    const {category,content,thumbnail,title}=req.body;
    if(!blog){
        return res.status(404).json({status:"failed",error:"Not Found"});
    }
    if(res.locals.user==null || blog.author!=res.locals.user.id){
        return res.status(404).json({status:"failed",error:"Unauthorized"});
    }
    blog.category=category;
    blog.content=content;
    blog.thumbnail=thumbnail;
    blog.title=title;
    await blog.save();
    return res.status(201).json({status:"ok",result:{blog}});
};

export const deleteExistedBlog=async(req:Request,res:Response)=>{
    const blog=await blogSchema.findById(req.params.blogid);
    if(!blog){
        return res.status(404).json({status:"failed",error:"Not Found"});
    }
    if(res.locals.user==null || blog.author!=res.locals.user.id){
        return res.status(404).json({status:"failed",error:"Unauthorized"});
    }
    await blogSchema.deleteOne({_id:blog._id});
    return res.status(201).json({status:"ok",result:{blog}});
};  
