import React, { useState } from 'react'
import Label from './Label'
import validator from 'validator'
import { useDispatch } from 'react-redux'

const Register = (props) =>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const handleValidation = () =>{

        if(validator.isEmpty(username)){
            errors.username = "Username is required"
        }

        if(validator.isEmpty(email)){
            errors.email = "Email is required"
        }else if(!validator.isEmail(email)){
            errors.email = "Invalid email format"
        }

        if(validator.isEmpty(password)){
            errors.password = "Password is required"
        }
        
        if(validator.isEmpty(mobile)){
            errors.mobile = "Mobile is required"
        }else if(validator.isMobilePhone(mobile)){
            errors.mobile = "Invalid mobile number"
        }

        setFormErrors(errors)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

        handleValidation()

        if(Object.keys(errors).length === 0){
            const formData = {
                username:username,
                email:email,
                password:password,
                mobile:mobile
            }
            console.log("formData",formData)
            // dispatch()
        }       
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
                {formErrors?.username && <span>{formErrors?.username}</span>}
                <Label text="Email"/><br/>
                <input 
                    type="text"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                /><br/>
                {formErrors?.email && <span>{formErrors?.email}</span>}
                <Label text="Password"/><br/>
                <input 
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                /><br/>  
                {formErrors?.password && <span>{formErrors?.password}</span>}
                <Label text="Mobile"/><br/>
                <input 
                    type="text"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                />
                {formErrors?.mobile && <span>{formErrors?.mobile}</span>}
                <br/> 
                <input
                    type="submit"
                    value="Register"
                />
            </form>
        </div>
    )
}

export default Register