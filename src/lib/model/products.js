import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema({
    name:String,
    price:Number,
    company:String,
    color:String
});
export const Product=mongoose.models.products || mongoose.model("products",ProductSchema);