import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import Label from './Label'

const Login = (props) =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const errors = {}

    const handleValidation = () =>{

        if(validator.isEmpty(email)){
            errors.email = "Email is required"
        }else if(!validator.isEmail(email)){
            errors.email = "Invalid email Format"
        }

        if(validator.isEmpty(password)){
            errors.password = "Password is required"
        }

        setFormErrors(errors)
    }

    const dispatch = useDispatch()

    const handleSubmit = (e) =>{
        e.preventDefault()

        handleValidation()

        if(Object.keys(errors).length === 0){
            const formData={
                email,
                password
            }
         dispatch(startAddLoginDetails(formData))
        }   
    }

    return (
        <div>
           <h1>Please Login to access DashBoard!!!</h1>
           
           <form onSubmit={handleSubmit}>
                 <Label text="email"/>
                 <input type="email" value={email} placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                 {formErrors?.email && <span>{formErrors.email}</span>}

                 <Label text="password"/>
                 <input type = "password" value = {password} placeholder = "enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                 {formErrors?.password && <span>{formErrors.password}</span>}
                 <button>Submit</button>
           </form>
        </div>
    )
}

export default Login