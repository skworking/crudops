import { con } from "@/lib/db";
import { User } from "@/lib/model/users";

import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    
    let data=[]
    try{
        await mongoose.connect(con)
        data =await User.find();
    }catch(err){
        data={Success:false}
    }

    return NextResponse.json({result:data,success:true})
}


export async function POST(){
    await mongoose.connect(con)
     try{
        let user=new User({
            name: "John Doe",
            age: 30,
            salary: 50000,
            hobby: {
                name: "Reading",
                slug: "reading",
                image: "book.jpg"
            }
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