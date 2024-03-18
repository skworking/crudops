import React from 'react'

const Button = (props) => {
    const {onClick,styles,text}=props;
  return (
    <button className={styles} onClick={onClick}>
        {text}
    </button>
  )
}

export default Button;
