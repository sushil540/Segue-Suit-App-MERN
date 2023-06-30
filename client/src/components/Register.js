import React, { useState } from 'react'
import Label from './Label'
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { startRegisterUser } from '../actions/userActions'

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
        }else if(!validator.isNumeric(mobile)){
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
            dispatch(startRegisterUser(formData))
        }  
        props.history.push('/login')     
    }

    return (
        <div className="card p-4 w-50 m-auto">  
            <h2 className="text-center"> Register </h2>
            <form onSubmit={handleSubmit}>
                <Label text="Username"/> <br/>
                <input 
                    className="form-control"
                    placeholder="Enter your name"
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                {formErrors?.username && <span>{formErrors?.username}</span>}
                <br/>
                    <Label text="Email"/><br/>
                    <input 
                        className="form-control"
                        placeholder="Enter your email"
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                {formErrors?.email && <span>{formErrors?.email}</span>}
                <br/>
                <Label text="Password"/><br/>
                <input 
                    className="form-control"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                {formErrors?.password && <span>{formErrors?.password}</span>}
                <br/>  
                <Label text="Mobile"/><br/>
                <input 
                    className="form-control"
                    placeholder="Enter your mobile"
                    type="text"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                />
                {formErrors?.mobile && <span>{formErrors?.mobile}</span>}
                <br/> 
                <input
                    className="btn btn-primary"
                    type="submit"
                    value="Register"
                />
            </form>
        </div>
    )
}

export default Register