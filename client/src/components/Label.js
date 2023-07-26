import React from 'react'

const Label = (props) =>{
    const { htmlFor, text } = props
    return <label htmlFor={htmlFor} >{text}</label>
}

export default Label