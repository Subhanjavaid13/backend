import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema= new Schema({
      userName:{
            type:String,
            required :true,
            lowecase:true,
            unique:true,
            trim:true,
            index:true,
      },
      email:{
            type:String,
            required :true,
            lowecase:true,
            unique:true,
            trim:true,
      },
      fullName:{
            type :String,
            required:true,
            lowerCase:true,   
            trim :true,
            index :true,

      },
      avatar:{
            type :String , //Cloudinary url
            required :true,
      },
      coverImage :{
            type :String,
      },
      watchHistory : [
            {
                  type:Schema.Types.ObjectId,
                  ref :"Video"
            }
      ],
      password :{
            type :String,
            required :[true,"Password is required"]
      },
      refreshToken :{
            type :String
      }

},{
      timestamps:true
}
)

userSchema.pre("save",  async function(next){
      if(!this.modified("password")) return next();

      this.password = bcrypt.hash(this.password, 10);
      next();

})

userSchema.methods.isPasswordCorrect = async function(password){
      return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
      {
            _id :this.id,
            _email :this.email,
            _userName : this.userName,
            fullName : this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
            expireIn: this.env.ACCESS_TOKEN_EXPIRY,
      }
   )
}
userSchema.methods.generateRefreshToken = function(){
      return jwt.sign(
      {
            _id :this.id,
      },
      process.env.ACCESS_REFRESH_SECRET,
      {
            expireIn: this.env.REFRESH_TOKEN_EXPIRY,
      }
   )
}

export const User = mongoose.model("User", userSchema);