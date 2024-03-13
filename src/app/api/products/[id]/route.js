
import { NextResponse } from "next/server";
import { Product } from "@/lib/model/products";
import mongoose from "mongoose";
import { con } from "@/lib/db";



export async function PUT(request,{params}){

    const {id}=params;
    console.log(id);
    const { 
        name: name,
        price: price,
        company: company,
        color:color
    }=request.json();


    await mongoose.connect(con)

    const result=await Product.findByIdAndUpdate(id,{name,price,company,color});
    return NextResponse.json({result,success:true})
}

export async function GET(request,{params}){
    const {id}=params;
    await mongoose.connect(con)
    const record=await Product.findOne({_id:id});
    return NextResponse.json({result},{status:200})
}