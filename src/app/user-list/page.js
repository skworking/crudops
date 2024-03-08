"use client"
import React, { useEffect, useState } from 'react'
import AddUser from '../add/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
const DisplayUser = () => {
  const [users, setUsers] = useState([]);
  const [show,setShow]=useState(false);
  const [data,setData]=useState()
  const [search,setSearch]=useState('')
  const router = useRouter()
  console.log(users);
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

  const handleDelete=async(id)=>{
    console.log("select id-",id);
    let response = await fetch("http://localhost:3000/api/users/"+id,{
      method:"DELETE"
    });
    response=await response.json();
    if(response.success){
      alert("Record Deleted Success-full")
      // router.push('/user-list',{scroll:false})
      fetchData()
    }
  }

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
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[])

  const handleSearch=(e)=>{
    e.preventDefault();
    const search=e.target.value;
    setSearch(search)
  }
  const searching=async()=>{
    let result=await fetch(`http://localhost:3000/api/users/?name=${search}`)
    const data = await result.json();
    console.log("search-data",data);
  }
  const searchCall=()=>{
    console.log(search);
   if(search.length >0){
    searching()
   }
  }

  return (
    <div className='overflow-x-auto  items-center'>
     {loading ? <div className='w-full  text-center m-auto'>Loading Data</div>
     :
     <>
      <div className='flex w-full justify-between  p-2'>
      <h2 className='w-1/6 bg-red-200'>User List</h2>
      <div className='flex   items-center border-2 border-emerald-100 p-2 '>
          <input type='text' placeholder='Search User List ' name='search' onChange={(e)=>handleSearch(e)} className='outline-none' />
          <CiSearch className='flex text-center' onClick={searchCall}/>
      </div>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg ">
        <thead className="bg-gray-200 text-gray-700 flex-1">
          <tr className=''>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">slug</th>
            <th className="py-2 px-4">description</th>
            <th className="py-2 px-4">image</th>
            <th className="py-2 px-4">Gallery</th>
            {/* <th className="py-2 px-4 bg-slate-200"> Hobby
             <span className='flex justify-around bg-gray-400'>
              <span className="py-2 px-4">Hobby Name</span>
              <span className="py-2 px-4">Hobby Slug</span>
              <span className="py-2 px-4">Hobby Image</span>
            </span>
            </th> */}
            <th className="py-2 px-4 ">Operation</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center ">
          {users.length>0 ? users.map(user => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 ">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.slug}</td>
              <td className="py-2 px-4">{user.description}</td>
              <td className="py-2 px-4 flex justify-around">
{/*                 
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.hobby.name}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{user.hobby.slug}</span> */}
                <Image src={user?.image?.original || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'} alt={user?.name} className="inline-block " width='50' height={20} />
                
              </td>
              <td className="py-2 px-4 ">
                {/* {JSON.stringify(user.gallery.original)}

                {user.gallery.thumbnail} */}
                {user?.gallery.length >= 0 &&
                  user?.gallery.map((list)=>{ return(
                    <div key={list?._id}>

                    <Image src={list.original} alt={user?.name} className="inline-block " width='50' height={20} />
                    </div>
                    )
                  })
                }
              </td>
              <td className={`py-2 px-4 sm:flex-1  ${styles.wrap} `}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={()=>handleEdit(user)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded " onClick={()=>{handleDelete(user._id)}}>Delete</button>
              </td>
            </tr>
            
          )):
          "Data not Found"
          }
        </tbody>
      </table>
     </>
    }
          {show && 
          <div className='absolute top-0 h-screen w-full p-20 bg-gray-400 opacity-80 text-center'>
            <IoCloseCircleOutline className=' float-right  hover:bg-white bg-gray-400 w-[30px] h-[30px] text-center  p-1 rounded-full cursor-pointer' onClick={()=>{setShow(!show)}} />
              
            <AddUser data={data} oncancel={handleCancel} onUpdate={handleUpdate}/>
           
          </div>
          }
    </div>
  )
}

export default DisplayUser;
