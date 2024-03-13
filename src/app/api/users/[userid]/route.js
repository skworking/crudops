import { NextResponse } from "next/server";
import { User } from "@/lib/model/users";
import mongoose from "mongoose";
import { con } from "@/lib/db";



export async function PUT(request,{params}){
    // console.log(content);
    // get id
    const userId=params.userid;
    console.log(userId);
    // id object create
    const filter={_id:userId}
    // get data json from user
    const payload=await request.json();
    // console.log(payload);
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

    const result=await User.findOne(record);
    return NextResponse.json({result,success:true})
}
