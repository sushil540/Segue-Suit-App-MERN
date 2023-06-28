import React, { useState } from 'react'
import Label from './Label'

const Register = (props) =>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleValidation = () =>{
        if(username.length){
            errors.username = "Username is required"
        }
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

        handleValidation()

        const formData = {
            username:username,
            email:email,
            password:password,
            mobile:mobile
        }
        console.log("formData",formData)
    }

    return (
        <div> 
            <form onSubmit={handleSubmit}>
                <Label text="Username"/> <br/>
                <input 
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                /><br/>
                <Label text="Email"/><br/>
                <input 
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                /><br/>
                <Label text="Password"/><br/>
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                /><br/>  
                <Label text="Mobile"/><br/>
                <input 
                    type="text"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                /><br/> 
                <input
                    type="submit"
                    value="Register"
                />
            </form>
        </div>
    )
}

export default Register