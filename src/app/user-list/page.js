"use client"
import React, { useEffect, useState } from 'react'

const DisplayUser = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
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

    fetchData();
  }, []);
  const getHeaders = () => {
    if (users.length > 0) {
      return Object.keys(users[0]);
    }
    return [];
  };

  const handleDelete=(id)=>{
    console.log("select id-",id);
  }

  return (
    <div className='overflow-x-auto  items-center'>
      {/* {JSON.stringify(users)} */}
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
                <img src={user.hobby.image || 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'} alt={user.hobby.name} className="inline-block w-8 h-8" />
                
              </td>
              <td className="py-2 px-4 sm:flex-1 flex-nowrap  ">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded " onClick={()=>{handleDelete(user._id)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default DisplayUser;
