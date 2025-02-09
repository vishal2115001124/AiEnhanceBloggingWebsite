
import { Router,Request,Response, NextFunction } from "express";
import dotenv from "dotenv";
import CatchAsync from "../../Frontend/app/api/utils/AsyncCatch";
import { isLoggedIn, protect } from "../controllers/authController";
import { login, register, updateUserDetails } from "../controllers/userController";
dotenv.config();
const Route = Router();

Route.post("/register",CatchAsync(register));
Route.post("/login",CatchAsync(login));
Route.use(protect);
Route.post("/editDetails",isLoggedIn,CatchAsync(updateUserDetails));

export default Route;
