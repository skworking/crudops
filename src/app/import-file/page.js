"use client"
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import styles from '../page.module.css'

import { FaFileAlt } from "react-icons/fa";
import { IoCloseCircleOutline } from 'react-icons/io5';
import Editdetails from '../add/editdetails';
import Link from 'next/link';






const ImportFile = () => {

    const [dataset, setData] = useState(JSON.parse(window?.sessionStorage?.getItem('data')));
    const [filename, setFileName] = useState(sessionStorage?.getItem('filename'))
    const [show, setShow] = useState(false);
    let parsedData;


    const get = () => {
        const dataFromsessionStorage = sessionStorage.getItem('data');
        if (dataFromsessionStorage) {
            setData(JSON.parse(dataFromsessionStorage));
        }
    }
    const handleFileChange = (event) => {
        console.log("call again");
        // event.preventDefault();
        const file = event?.target?.files[0];
        // if (!file) return;
        if (file) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // jsonData.map((item)=>{
                //   console.log(JSON.parse(item.image));
                // })
                parsedData = jsonData?.map(item => {

                    item.image = JSON.parse(item?.image);

                    if (item.gallery) {
                        item.gallery = JSON.parse(item.gallery);
                    }
                    if (item.tag) {
                        item.tag = JSON.parse(item.tag)
                    }
                    if (item.variations) {
                        item.variations = JSON.parse(item.variations);
                    }
                    if (item.variation_options) {
                        item.variation_options = JSON.parse(item.variation_options);
                    }
                    // Repeat this process for other nested properties
                    return item;
                });
                setData(parsedData)
                setFileName(file.name)
                sessionStorage.setItem("data", JSON.stringify(parsedData))
                sessionStorage.setItem("filename", file.name)
            }
            reader.readAsArrayBuffer(file);
        } else {
            console.log("dd");
        }
    }




    const handleDelete = async (id) => {

        let response = await fetch("http://localhost:3000/api/users/" + id, {
            method: "DELETE"
        })
        response = await response.json();
        if (response.success === true) {
            const updatedDataset = dataset.filter(item => item._id !== id);
            sessionStorage.setItem('data', JSON.stringify(updatedDataset));
            setData(updatedDataset);
            alert("Record Deleted Success-fully")

        } else {
            alert("Failed to delete record");
        }
    }

    const handleEdit = (data) => {
        setData(data)
        setShow(!show)

    }
    const handleCancel = (e) => {
        setShow(!show)
        get()
    }

    const handleUpdate = async (data, id) => {
        let result = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        result = await result.json();


        if (result.success) {
            alert("Record Updated Succes-full");
            setShow(!show)

        }
        // fetchData()
    }
    console.log(dataset);
    return (
        <div className='flex-col p-2'>
            <Link href={'/user-list'}>Go to List</Link>
            <h1 className='text-2xl text-center'>Read Excel: {filename}</h1>
            <div className='w-full  flex bg-gray-200  p-5 mt-5' >
                <div className='flex justify-start'>

                    <h1 className='text-xl  '>Upload File</h1>
                    <FaFileAlt className='w-fit text-3xl cursor-pointer hover:fill-slate-400' onClick={() => document.getElementById('filePicker').click()} />
                </div>
                <input type='file' id="filePicker" accept='.csv, .xlsx' style={{ display: 'none' }} onChange={handleFileChange} />
                {/* {data?.length > 0 &&
        <button className='bg-gray-300 p-2 rounded hover:bg-gray-400'>Save</button>
        } */}
            </div>
            <table className="w-full bg-white shadow-md rounded-lg ">
                <thead className="bg-gray-200 text-gray-700 flex-1">
                    <tr className=''>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">slug</th>
                        <th className="py-2 px-4">description</th>
                        <th className="py-2 px-4">image</th>

                        <th className="py-2 px-4 ">Operation</th>
                    </tr>
                </thead>

                <tbody className="text-gray-600 text-center ">
                    {dataset?.length > 0 && dataset?.map(user => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 ">
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.slug}</td>
                            <td className="py-2 px-4">{user.description}</td>
                            <td className="py-2 px-4 flex justify-around">
                                {/*                 
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.hobby.name}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.hobby.slug}</span> */}

                                {/* <Image src={user?.image?.original || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'} alt={user?.name} className="inline-block " width='50' height={20} /> */}

                                <img src={user?.image?.original ? `http://localhost:3000/Images/` + user?.image?.original : ''} width={100} height={50} />
                            </td>
                            {/* <td className="py-2 px-4 ">
                        
                {user?.gallery.length >= 0 &&
                  user?.gallery.map((list)=>{ return(
                    <div key={list?._id}>

                    <Image src={list.original} alt={user?.name} className="inline-block " width='50' height={20} />
                    </div>
                    )
                  })
                }
              </td> */}
                            <td className={`py-2 px-4 sm:flex-1  ${styles.wrap} `}>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  mr-2" onClick={() => { handleDelete(user._id) }}>Delete</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(user)}>Edit</button>

                            </td>
                        </tr>

                    ))
                    }
                </tbody>
            </table>
            {show &&

                <div className='absolute top-0 h-auto w-full p-20 bg-gray-400 opacity-80 text-center'>
                    <IoCloseCircleOutline className=' float-right  hover:bg-white bg-gray-400 w-[30px] h-[30px] text-center  p-1 rounded-full cursor-pointer' onClick={handleCancel} />

                    <Editdetails data={dataset} oncancel={handleCancel} onUpdate={handleUpdate} />

                </div>
            }
        </div>

    )
}

export default ImportFile;
