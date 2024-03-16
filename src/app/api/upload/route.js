import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import {join} from 'path'

export async function POST(request){
    const data=await request.formData();
    const file=data.get('file')
    if(!file){
        return NextResponse.json({Success:false})
    }
    const bytes=await file.arrayBuffer()
    const buffer=Buffer.from(bytes)
    const path=`./public/Images/${file.name}`

    await writeFile(path,buffer)
    console.log(`open ${path} to see the uploaded file`);
    return NextResponse.json({success:true})
}

export async function PUT(request) {
    const data = await request.formData();
    const file = data.get('file');
    const fileName = data.get('fileName'); // Assuming you provide the fileName as part of the PUT request
    console.log("data",file,fileName);
    if (!file ) {
        return NextResponse.json({ success: false, message: 'File or fileName is missing' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join('./public/Images', file.name);

    try {
        await writeFile(path, buffer);
        console.log(`File ${path} has been successfully updated.`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating file:', error);
        return NextResponse.json({ success: false, message: 'Error updating file' });
    }
}