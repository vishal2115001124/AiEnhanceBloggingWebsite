import { NextRequest, NextResponse as res } from "next/server";

export default function CatchAsync(fun:any){
      return async (req:NextRequest,next:res)=>await fun(req,res,next).catch((err:any)=>{
            console.log(err);
            res.json({status:"failed",error:err.message})});
}