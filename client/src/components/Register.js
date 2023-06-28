import React from 'react'
import Label from './Label'

const Register = (props) =>{

    const handleSubmit =(e)=>{
        e.preventDefault()
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Label text="Username"/>
            </form>
        </div>
    )
}

export default Register