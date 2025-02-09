import { NextRequest as req, NextRequest } from "next/server";
import { getAllUsers, login } from "../userControllers";
import CatchAsync from "../../utils/AsyncCatch";
import connection from "@/app/db/dbConnect";
export async function POST(req:NextRequest){
    connection();
    return CatchAsync(login(req));
}

export async function GET(req:NextRequest){
    connection();
    return getAllUsers(req);
}
