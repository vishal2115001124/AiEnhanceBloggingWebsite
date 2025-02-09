import mongoose, { Document, Schema } from "mongoose";
interface ContentI {
  id:number;
  con_type: string;
  data: string;
}

interface BlogI extends Document {
  category:string
  author: unknown;
  createdAt: Date;
  title: string;
  thumbnail: string;
  content: ContentI[];
  lastUpdated: Date;
  desc:String
  reviews:unknown
  OtherFields:string
}

const contentSchema = new Schema<ContentI>({
  id:{type:Number},
  con_type: { type: String, required: true },
  data: { type: String, required: true },
});

const blogSchema = new Schema<BlogI>({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdAt: { type: Date, default: Date.now },
  thumbnail: { type: String, required: [true, "Thumbnail missing"] },
  title: { type: String, required: true },
  desc:{type:String},
  category:{
    type:String,
    enum:["science","cyber","health","god","culture","lifestyle","kids","awareness","politics","other"]
  }, 
  content: { type: [contentSchema], required: true },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }},{
   toJSON:{virtuals:true},
  toObject:{virtuals:true},
});
blogSchema.virtual("virtual").get(function(){
  return "virtual value";
})
blogSchema.virtual('reviews',{
    ref:"reviews",
    localField:"_id",
    foreignField:'post',
  });

blogSchema.pre(["findOneAndUpdate", "findOneAndDelete"], async function (next) {
  next();
});

blogSchema.pre("save", async function (next) {
  this.lastUpdated = new Date();
  next();
});

const BlogModel = mongoose.models.blogs||mongoose.model<BlogI>("blogs", blogSchema);
export default BlogModel;
