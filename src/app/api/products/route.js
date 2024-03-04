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

export async function POST(){
    await mongoose.connect(con)
     try{
        let user=new Product({
            name:"satish",
            price:200,
            company:"sk",
            color:"blue-while"
      })
      user.save().then(() => {
        console.log("Data inserted successfully");
    }).catch((error) => {
        console.error("Error inserting data:", error);
    });
    }catch(err){
        console.log(err);
    }
}