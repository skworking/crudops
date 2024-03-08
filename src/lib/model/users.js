import mongoose from "mongoose";
const ImageSchema=new mongoose.Schema({
    thumbnail:String,
    original:String,
})
const GalleryItemSchema = new mongoose.Schema({
    thumbnail: String,
    original: String,
});
const TagSchema=new mongoose.Schema({
    name:String,
    slug:String,
});
const UserSchema=new mongoose.Schema({
   
    name:String,
    slug:String,
    description:String,
    image: ImageSchema,
    gallery:[GalleryItemSchema],
    quantity:Number,
    price:String,
    sale_price:String,
    brand:String,
    weight:String,
    tag:[TagSchema],
    product_type:String,
    max_price:Number,
    min_price:Number,

});
export const User=mongoose.models.users || mongoose.model("users",UserSchema);