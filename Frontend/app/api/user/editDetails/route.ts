import { NextRequest, NextResponse } from "next/server"
import { updateUserDetails } from "../userControllers";
import CatchAsync from "../../utils/AsyncCatch";
import connection from "@/app/db/dbConnect";
export async function POST(req:NextRequest){
    connection();
    return CatchAsync(updateUserDetails(req));
};

export async function GET(){
    return NextResponse.json({message:"editDetailsRouteWorkign"});
};