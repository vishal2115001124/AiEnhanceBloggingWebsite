import { NextRequest } from "next/server"
import {  getBlogsByIdWithReviews } from "../../../blogController"
import connection from "@/app/db/dbConnect";



export async function GET(req:NextRequest,context:any){
    connection();
    return getBlogsByIdWithReviews(req,context);
}