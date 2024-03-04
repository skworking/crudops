import React from 'react'

const DisplayUser = async() => {
    let result=await fetch("http://localhost:3000/api/users");
    result=await result.json();
    console.log(result);
  return (
    <div>
      
    </div>
  )
}

export default DisplayUser;
