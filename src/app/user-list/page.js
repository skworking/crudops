"use client"
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import AddUser from '../add/page';
import Image from 'next/image';

const DisplayUser = () => {
  const [users, setUsers] = useState([]);
  const [show,setShow]=useState(false);
  const [data,setData]=useState()

  const fetchData = async () => {
    try {
      const result = await fetch("http://localhost:3000/api/users");
      const data = await result.json();
      if (data.success) {
        setUsers(data.result);
      } else {
        console.error("Error fetching users:", data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const handleDelete=(id)=>{
    console.log("select id-",id);
  }

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    salary:"",
    hobby: {
      name: '',
      slug: '',
      image: ''
    }
  });

  const handleEdit=(data)=>{
    setData(data)
    setShow(!show)

  }

  // update and cancel op
  const handleCancel=()=>{
      setShow(!show)
  }
  const handleUpdate=async(data,id)=>{
    // console.log(data,id);
    // alert(id)
    let result=await fetch(`http://localhost:3000/api/users/${id}`,{
      method:"PUT",
      body:JSON.stringify(data)
    })
    result=await result.json();
    console.log();
    if(result.success){
      alert("Record Updated Succes-full");
      setShow(!show)
    }
    fetchData()
  }

  return (
    <div className='overflow-x-auto  items-center'>
     
      <table className="w-full bg-white shadow-md rounded-lg ">
        <thead className="bg-gray-200 text-gray-700 flex-1">
          <tr className=''>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Salary</th>
            <th className="py-2 px-4">Age</th>
            <th className="py-2 px-4 bg-slate-200"> Hobby
             <span className='flex justify-around bg-gray-400'>
              <span className="py-2 px-4">Hobby Name</span>
              <span className="py-2 px-4">Hobby Slug</span>
              <span className="py-2 px-4">Hobby Image</span>
            </span>
            </th>
            <th className="py-2 px-4 ">Operation</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {users.map(user => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.age}</td>
              <td className="py-2 px-4">{user.salary}</td>
              <td className="py-2 px-4 flex justify-around">
                
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.hobby.name}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.hobby.slug}</span>
                <Image src={user.hobby.image || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'} alt={user.hobby.name} className="inline-block " width='50' height={20} />
                
              </td>
              <td className="py-2 px-4 sm:flex-1 flex-nowrap  ">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={()=>handleEdit(user)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded " onClick={()=>{handleDelete(user._id)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          {show && 
          <div className='absolute top-0 h-screen w-full p-20 bg-gray-400 opacity-80 text-center'>
            <div className=' float-right  bg-white w-[30px] h-[30px] text-center  p-1 rounded-full' onClick={()=>{setShow(!show)}} > X</div>
            <AddUser data={data} oncancel={handleCancel} onUpdate={handleUpdate}/>
           
          </div>
          }
    </div>
  )
}

export default DisplayUser;
