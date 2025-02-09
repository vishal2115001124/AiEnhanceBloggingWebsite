import { NextRequest } from "next/server";
import { editExistedBlog } from "../../../blogController";
import connection from "@/app/db/dbConnect";


export async function PATCH(req:NextRequest,context:any){
    connection();
    return editExistedBlog(req,context);   
}        