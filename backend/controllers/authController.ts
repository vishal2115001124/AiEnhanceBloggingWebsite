import { Request,Response,NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import User from "../model/userModel";

function decodeFunction(token:string){
    return verify(token,process.env.SECRET?process.env.SECRET:"") as JwtPayload;
}
export async function isLoggedIn(req:Request,res:Response,next:NextFunction){
    if(res.locals && res.locals.user){
        next();
    }
    else{
        return res.status(404).json({status:"failed",error:"Unauthorized"});
    }
}

export async function protect(req:Request,res:Response,next:NextFunction){
    try{
        if(req.cookies && req.cookies.jwt){
            const payload =decodeFunction(req.cookies.jwt);
            const _id=payload._id;
            res.locals.user=await User.findById(_id);
        }
    }
    catch(err:any){
        res.status(500).json({status:"failed",error:err.message});
    }
    finally{
        next();
    }
}