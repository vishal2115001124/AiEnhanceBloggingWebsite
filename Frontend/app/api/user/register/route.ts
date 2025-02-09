import { NextRequest, NextResponse } from "next/server";
import { register } from "../userControllers";
import CatchAsync from "../../utils/AsyncCatch";
import connection from "@/app/db/dbConnect";
export async function POST(req:NextRequest){
    connection();
    return register(req);
}

export async function GET(){
    return NextResponse.json({message:"working api for get register"});
}