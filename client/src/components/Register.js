import React, { useState } from 'react'
import Label from './Label'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { startRegisterUser, setErrors } from '../actions/userActions'
const Register = (props) =>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const registerErrors = useSelector((state)=>{
        return state.user.error
    })

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
            dispatch(startRegisterUser(formData,props))
        }       
    }

    setTimeout(()=>{
        dispatch(setErrors(''))
    },4000)

    return (
        <div>
            {registerErrors && <div className="w-50 m-auto my-2 alert alert-danger">   
                {registerErrors}
            </div>}
            <div className="card shadow-lg p-4 w-50 my my-5 m-auto">  
                <h2 className="text-center"> Register </h2>
                <form onSubmit={handleSubmit}>
                    <Label text="Username"/><br/>
                    <input 
                        className="form-control"
                        placeholder="Enter your name*"
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    />
                    {formErrors?.username && <span className="text-danger">{formErrors?.username}</span>}
                    <br/>
                        <Label text="Email"/><br/>
                        <input 
                            className="form-control"
                            placeholder="Enter your email*"
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                    {formErrors?.email && <span className="text-danger">{formErrors?.email}</span>}
                    <br/>
                    <Label text="Password"/><br/>
                    <input 
                        className="form-control"
                        placeholder="Enter your password*"
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    {formErrors?.password && <span className="text-danger">{formErrors?.password}</span>}
                    <br/>  
                    <Label text="Mobile"/><br/>
                    <input 
                        className="form-control"
                        placeholder="Enter your mobile*"
                        type="text"
                        value={mobile}
                        onChange={(e)=>setMobile(e.target.value)}
                    />
                    {formErrors?.mobile && <span className="text-danger">{formErrors?.mobile}</span>}
                    <br/> 
                    <input
                        className="btn btn-primary"
                        type="submit"
                        value="Register"
                    />
                </form>
            </div>
        </div>
    )
}

export default Register