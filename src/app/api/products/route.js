import { con } from "@/lib/db";
import { Product } from "@/lib/model/products";

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    let data=[]
    try{
        await mongoose.connect(con)
        data =await Product.find();
    }catch(err){
        data={Success:false}
    }

    return NextResponse.json({result:data,success:true})
}

export async function POST(request){
    await mongoose.connect(con)
    const payload=await request.json();
    let product=new Product(payload)
    const result=await product.save();
    return NextResponse.json({result,success:true})

    // try{
    // const payload=await request.body.json();
    // console.log("body",payload);
    // await mongoose.connect(con);
    // //     let user=new Product({
    // //         name:"satish",
    // //         price:200,
    // //         company:"sk",
    // //         color:"blue-while"
    // //   })
    //     let product=new Product(payload);
    //  await product.save();
    //     console.log("Data inserted successfully");

    // }catch(error){
    //     console.error("Error inserting data:", error);
    //     return NextResponse.json({ success: false, error: err.message });
    // }
    // finally {
    //     // Close the MongoDB connection
    //     await mongoose.connection.close();
    // }
    // return NextResponse.json({ success: true });
}