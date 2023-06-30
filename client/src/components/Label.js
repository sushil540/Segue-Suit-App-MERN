import React from 'react'

const Label = (props) =>{
    const { text } = props
    return <label htmlFor="floatingInput">{text}</label>
}

export default Label