import React,{useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Label from './Label'
import validator from 'validator'
import { setErrors, startLoginUser } from '../actions/userActions'
import { Eye, EyeOff } from 'lucide-react'

const Login = (props) =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState({})
    const [isProtected, setIsProtected] = useState(false)
    const errors = {}

    const dispatch = useDispatch()

    useEffect(()=>{
        return () =>{
            dispatch(setErrors(''))
        }
    },[dispatch])

    
    const msg = useSelector((state)=>{
        return state.user.error
     })
    
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

    const handleSubmit = (e) =>{
        e.preventDefault()

        handleValidation()

        if(Object.keys(errors).length === 0){
            const formData={
                email,
                password
            }
         dispatch(startLoginUser(formData,props))
        }   
    }

    const handleIsProtected = () =>{
        setIsProtected(!isProtected)
    }

    const handleShift = () =>{      
        props.history.push('/register')
        
        setTimeout(()=>{
            dispatch(setErrors(''))
        },4000)
    }
    
    return (    
        <div className="container">
            {msg && <div className="w-50 m-auto my-3 alert alert-danger">
               <span>{msg}</span> 
            </div>}
        <div className="card shadow-lg p-4 w-50 my-4 m-auto">
           <h1 className="text-center">Please Login to access DashBoard!!!</h1>
           
           <form onSubmit={handleSubmit} className="d-flex flex-column ps-5 my-4">
                 <Label text="Email"/> 
                 <input 
                    className="form-control w-75"  
                    type="text" value={email} 
                    placeholder="Enter your email" 
                    onChange={(e)=>setEmail(e.target.value)}/>
                 {formErrors?.email && <span className="text-danger">{formErrors?.email}</span>}
                 <br/>

                 <Label text="Password"/>
                 <span className="d-flex align-items-center gap-2">
                    <input 
                        className="form-control w-75" 
                        type = {isProtected ? "text" : "password"}  
                        value = {password}
                        placeholder = "Enter your password" 
                        onChange={(e)=>setPassword(e.target.value)}/> 
                    {isProtected  ? <Eye size={20} color={"#444"} onClick={handleIsProtected} /> : <EyeOff size={20} color={"#999"} onClick={handleIsProtected} />}
                </span>
                 {formErrors?.password && <span className="text-danger">{formErrors?.password}</span>}
                 <br/>
                 <input
                        className="btn btn-primary col-2"
                        type="submit"
                        value="Login"
                    />
                 <br/>
                 <br/>
                <div className='d-flex justify-content-end align-items-center gap-2'>
                     <span className='fw-bold'>Create an account?</span>
                     <input
                        className="btn btn-primary"
                        type="submit"
                        value="Sign-Up"
                        onClick={handleShift}
                    />
                     </div>
           </form>
        </div>
        </div>
    )
}

export default Login