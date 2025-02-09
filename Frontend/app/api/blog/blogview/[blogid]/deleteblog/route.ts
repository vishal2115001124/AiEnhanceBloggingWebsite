import { NextRequest } from "next/server";
import { deleteExistedBlog } from "../../../blogController";
import connection from "@/app/db/dbConnect";

export async function DELETE(req:NextRequest,Context:any){
    connection();
    return deleteExistedBlog(req,Context);
}