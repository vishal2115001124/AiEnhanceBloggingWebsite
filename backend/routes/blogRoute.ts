import {Router} from "express";
import CatchAsync from "../../Frontend/app/api/utils/AsyncCatch";
import { isLoggedIn, protect } from "../controllers/authController";
import { createNewBlog, deleteExistedBlog, editExistedBlog, getAllblogs, getBlogByID } from "../controllers/blogController";

const route=Router();

route.get("/?:category?",CatchAsync(getAllblogs));
route.get("/byid/:id?",CatchAsync(getBlogByID));
// route.use(protect);
// route.use(isLoggedIn);
route.post("/addnew",CatchAsync(createNewBlog));
route.patch("/:blogid/editblog",CatchAsync(editExistedBlog));
route.delete("/:blogid/deleteblog",CatchAsync(deleteExistedBlog));
// route.post("/",CatchAsync(async(req:Request,res:Response)=>{}))

export default route;