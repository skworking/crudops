"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import styles from '../page.module.css'
import Image from 'next/image';
import { FaFileAlt } from "react-icons/fa";
const ImportFile = () => {
    const [Data, setData] = useState([]);

    const handleFileChange = (event) => {
        const file = event?.target?.files[0];
        console.log(file);
        // if (!file) return;
        if(file){

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                console.log(jsonData);
                const parsedData = jsonData.map(item => {
                    // Check and parse each nested property if it exists
                    // if (item.gallery) {
                    //     item.gallery = JSON.parse(item.gallery);
                    // }
                    // if (item.image) {
                    //     item.image = JSON.parse(item.image);
                    // }
                    if(item.tag){
                        item.tag=JSON.parse(item.tag)
                    }
                    if(item.variations)
                    {
                        item.variations=JSON.parse(item.variations);
                    }
                    if(item.variation_options){
                        item.variation_options=JSON.parse(item.variation_options);
                    }
                    // Repeat this process for other nested properties
                    return item;
                });
                console.log(parsedData);
            }
            reader.readAsArrayBuffer(file);
        }
    }    
  return (
    <div>
    <div className='flex-col p-2'>

      <h1 className='text-2xl text-center'>Read Excel file</h1>
      <div className='w-full  flex bg-gray-200 justify-around p-5 mt-5' >
        <div className='flex'>

        <h1 className='text-xl '>Upload File</h1>
        <FaFileAlt className='w-fit text-3xl cursor-pointer hover:fill-slate-400' onClick={() => document.getElementById('filePicker').click()}/>
        </div>
        <input type='file' id="filePicker" accept='.csv, .xlsx' style={{ display: 'none' }} onChange={handleFileChange} />
        {Data.length > 0&&
        <button className='bg-gray-300 p-2 rounded hover:bg-gray-400'>Save</button>
        }
      </div>
      </div>
    </div>
  )
}

export default ImportFile;
