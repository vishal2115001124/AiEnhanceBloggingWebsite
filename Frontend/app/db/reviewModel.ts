import { Schema,models,model, Document, Mongoose } from "mongoose";

interface ReviewStructure extends Document {
    post: Schema.Types.ObjectId;
    user: Schema.Types.ObjectId;
    comment: string;
    rating: number;
    upvote: boolean;
    downvote: boolean;
    isShare:boolean;
    share: number;
    createdAt: Date;
    modifiedAt: Date;
    like: number;
    dislike: number;
  }
const Model=new Schema({
    post:{
        type:Schema.ObjectId,
        ref:"blogs",
        required:[true,"review must belong to blog"],
    },
    user:{
        type:Schema.ObjectId,
        ref:"users",
        required:[true,"review must belong to user"],
    },
    comment:{
        type:String,
        minLength:1
    },
    rating:{
        type:Number
    },
    like:{type:Number,
        default:0,
    },
    dislike:{type:Number,
        default:0,
    },
    upvote:{type:Boolean,
        default:false,
    },
    downvote:{type:Boolean,
        default:false,
    },
    isShared:{
        type:Boolean,
        default:false,
    },
    share:{type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    modifiedAt:{
        type:Date,
        default:Date.now
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
  });
Model.pre("save", async function(next) {
    this.modifiedAt = new Date();

    if (!this.upvote) this.upvote = false;
    if (!this.downvote) this.downvote = false;

    if (this.upvote) {
        this.downvote = false;
    } else if (this.downvote) {
        this.upvote = false;
    }
    next();
});
const reviewModel=models.reviews || model<ReviewStructure>("reviews",Model);

export default reviewModel;