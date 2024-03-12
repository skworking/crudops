"use client"
import { NextResponse } from "next/server";
import { User } from "@/lib/model/users";
import mongoose from "mongoose";
import { con } from "@/lib/db";




export async function PUT(request,content){
    console.log(content);
    // get id
    const userId=content.params.userid;
    // id object create
    const filter={_id:userId}
    // get data json from user
    const payload=await request.json();
    console.log(payload);
    // check the connection
    await mongoose.connect(con)

    const result=await User.findOneAndUpdate(filter,payload);
    return NextResponse.json({result,success:true})

}
// search by id
export async function GET(content){
    
  
    console.log(content);
    // get id
    const userId=content.params.userid;
    console.log(userId);
    // id object create
    const record={_id:userId}
 
   
    // check the connection
    await mongoose.connect(con)

    const result=await User.findById(record);
    return NextResponse.json({result,success:true})
}

export async function DELETE(request,content){
    console.log(content.params.userid);
    // get id
    const userId=content.params.userid;
    // id object create
    const record={_id:userId}
    // check the connection
    await mongoose.connect(con)

    const result=await User.deleteOne(record);
    return NextResponse.json({result,success:true})
}