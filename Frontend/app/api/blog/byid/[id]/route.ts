import { NextRequest } from "next/server"
import {  getBlogByID } from "../../blogController"
import connection from "@/app/db/dbConnect";



export async function GET(req:NextRequest,context:any){
    connection();
    return getBlogByID(req,context);
}