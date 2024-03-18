import React from 'react'

const customImput = ({type,name,change,value,placeholder}) => {
  return (
    <div>
      
        <input
          type={type}
          name={name}
          value={value}
          onChange={change}
          placeholder={placeholder}
        />
    
    </div>
  )
}

export default customImput;
