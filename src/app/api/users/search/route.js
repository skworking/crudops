import { NextResponse } from "next/server";
import { User } from "@/lib/model/users";
import mongoose from "mongoose";
import { con } from "@/lib/db";

export async function GET(request){
    let records;
    try{
        const {searchParams}=new URL(request.url)
        const query = searchParams.get('name')||'';
       
        await mongoose.connect(con)
        if(query){

            records = await User.find({ name: { $regex: new RegExp(query, 'i') } });
        }
      
        return NextResponse.json({result:records || [],success:true})
       
    }catch(err){
        return NextResponse.json({ message: 'Internal server error', success: false });
    }
}