import mongoose from "mongoose";
const ImageSchema=new mongoose.Schema({
    thumbnail:String,
    original:String,
})
const GalleryItemSchema = new mongoose.Schema({
    thumbnail: String,
    original: String,
});
const UserSchema=new mongoose.Schema({
   
    name:String,
    slug:String,
    description:String,
    image: ImageSchema,
    gallery:[GalleryItemSchema]

});
export const User=mongoose.models.users || mongoose.model("users",UserSchema);