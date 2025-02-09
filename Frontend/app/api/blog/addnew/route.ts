import { NextRequest } from "next/server";
import { createNewBlog } from "../blogController";
import connection from "@/app/db/dbConnect";


export async function POST(NextRequest:NextRequest){
    connection();
    return createNewBlog(NextRequest);
}