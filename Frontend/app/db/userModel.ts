import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define an interface representing a document in MongoDB
export interface IUser extends Document {
  username: string;
  given_name: string;
  family_name: string;
  profile_img:string;
  email: string;
  password: string;
  confirmpassword?: string;
  resetToken?: string;
  resettokenexpire?: Date;
  lastpassword: string[];
  comparePassword(candidatePassword: string): Promise<boolean>;
  setPasswordResetToken(token: string, expiryTime: Date): void; 
  isResetTokenValid(): boolean;
  provider:String;
  fullname:string;
  language:string;
  interests:string[];
  bio:string;
  gender:"male"|"female";
  country:string;
  address:string

}

// Define the User Schema
const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    // unique: true,
  },
  given_name: {
    type: String,
    // required: true,
  },
  profile_img:{
    type:String,
  },
  family_name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  language:{
    type:String
  },
  interests:[{
    type:String
  }],
  bio:{
    type:String
  },
  gender:{type:String,
    enum:["male","female"]
  },
  address:{
    type:String,

  },
  country:{
    type:String
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  confirmpassword: {
    type: String,
    select:false
  },
  resetToken: {
    type: String,
    select:false

  },
  resettokenexpire: {
    type: Date,
    select:false

  },
  lastpassword: {
    type: [String],
    select:false

  }, 
  provider:{
    type:String
  }
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

userSchema.virtual("fullname").get(function(){
  return this.given_name+" "+this.family_name;
})

userSchema.pre(["findOneAndUpdate","findOneAndDelete"],async function(next){
  next();
})
// Pre-save hook to hash the password
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    if(!this.password)
      return;
    const salt = await bcrypt.genSalt(10);
    this.confirmpassword = ''
    this.password = await bcrypt.hash(this.password, salt);
    this.lastpassword.push(this.password);
    next();
  } catch (error:any) {
    next(error);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.setPasswordResetToken = function (token: string, expiryTime: Date): void {
  this.resetToken = token;
  this.resettokenexpire = expiryTime;
};

// Method to check if the reset token is still valid
userSchema.methods.isResetTokenValid = function (): boolean {
  return this.resettokenexpire! > new Date();
};

// Create and export the User model
const User = mongoose.models.users || mongoose.model<IUser>('users', userSchema);

export default User;
