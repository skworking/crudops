import React from 'react'

const customImput = ({type,name,onChange,value,placeholder}) => {
  return (
    <div>
      
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
    
    </div>
  )
}

export default customImput;
