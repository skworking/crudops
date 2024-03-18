import React from 'react'

const Input = (props) => {
   const {stylediv,inputstyle,text,typeinput,onChange,val,textstyle}=props
  return (
    <div className={`${stylediv}`}>
        {text}:
        <input className={`${inputstyle}`}
        type={typeinput}
        name={text}
        onChange={onChange}
        value={val}
        ></input>
    </div>
  )
}

export default Input;
