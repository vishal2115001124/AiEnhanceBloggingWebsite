import { NextRequest } from "next/server";
import { getAllblogs } from "./blogController";
import connection from "@/app/db/dbConnect";




export async function GET(req:NextRequest,Context:any){
    connection();
    return await getAllblogs(req,Context);
}