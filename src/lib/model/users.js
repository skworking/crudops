import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:String,
    age:Number,
    salary:Number,
    hobby:{
        name: String,
        slug: String,
        image: String,
    }
});
export const User=mongoose.models.users || mongoose.model("users",UserSchema);