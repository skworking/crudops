"use client"
import React, { useState } from 'react'
import * as XLSX from 'xlsx';
import styles from '../page.module.css'
import Image from 'next/image';
import { FaFileAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
const ExelList = () => {
  const [Data, setData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let data = []
      if (file.name.endsWith('.csv')) {

        data = content.split('\n').map(row => row.split(','));
        data = data.filter(row => row.some(cell => cell !== ''));

        console.log(data);
        setData(data);
     
        
      } else if (file.name.endsWith('.xlsx')) {
        const workbook = XLSX.read(content, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        setData(data);
      } else {
        toast('unsupported file format. please upload  a csv and xlsx file.')
      }
    };
    reader.readAsBinaryString(file);
    // reader.readAsText(file);
  };
  console.log("data", Data);
  return (
    <div>
      <div className='flex-col p-2'>

        <h1 className='text-2xl text-center'>Read Excel file</h1>
        {/* <div className='text-center'>
          
          <input type='file' accept='.csv, .xlsx'  onChange={handleFileChange} />
          <FaFileAlt />
        </div> */}
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
      <div>
        {Data?.length > 0 && (
          <>
          <h1 className='bg-gray-400  p-2 text-base'>User List</h1>
          <table className="w-full bg-white shadow-md rounded-lg "  >
            <thead className="bg-gray-200 text-gray-700 flex-1">
              <tr className="py-2 px-4">
                {Data[0]?.map((cell, index) => (
                  <th key={index} className="py-2 px-4">{cell}</th>
                ))}
              <th className="py-2 px-4 ">Operation</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-center">
              {Data?.slice(1).map((row) => (
                <tr key={row.name} className="border-b border-gray-200 hover:bg-gray-100 ">
                  {row.length > 1 ?
                   row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-2 px-4">{cell}</td>
                  )):"NO RECORD FOUND"}
                  <td className={`py-2 px-4 sm:flex-1 ${styles.wrap} `}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" /* onClick={() => handleEdit(user)} */>Edit</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded " /* onClick={() => { handleDelete(user._id) }} */>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
        )}
      </div>
    </div>
  )
}

export default ExelList;
