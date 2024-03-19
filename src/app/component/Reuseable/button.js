import React from 'react'

const Button = (props) => {
    const {onClick,styles,text,disable,type}=props;
  return (
    <button
    type={type} 
    className={styles} 
    onClick={onClick}
    disabled={disable}
    >
        {text}
    </button>
  )
}

export default Button;
