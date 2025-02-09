import Mongoose from "mongoose";

async function connection(){
    const instance=await Mongoose.connect(process.env.REMOTE_CONN?process.env.REMOTE_CONN:"",{family:4}).catch(e=>console.log("db ERROR",e.message));
    console.log("DB connected");
}


export default connection;
