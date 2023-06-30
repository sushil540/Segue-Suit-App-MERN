import React,{useState, useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Label from './Label'
import validator from 'validator'
import { setErrors, startLoginUser } from '../actions/userActions'

const Login = (props) =>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [formErrors,setFormErrors] = useState({})
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

    const handleShift = () =>{      
        props.history.push('/register')
        
        setTimeout(()=>{
            dispatch(setErrors(''))
        },4000)
    }
    
   
    return (    
        <div className='container'>
            {msg && <div className="w-50 m-auto my-3 alert alert-danger" >
               <span>{msg}</span> 
            </div>}
        <div className="card shadow-lg p-4 w-50 my-4 m-auto">
           <h1 className="text-center">Please Login to access DashBoard!!!</h1>
           
           <form onSubmit={handleSubmit}>
                 <Label text="Email"/> <br/>
                 <input className="form-control" type="text" value={email} placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                 {formErrors?.email && <span className="text-danger">{formErrors?.email}</span>}
                 <br/>

                 <Label text="Password"/> <br/>
                 <input className="form-control" type = "password" value = {password} placeholder = "enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                 {formErrors?.password && <span className="text-danger">{formErrors?.password}</span>}
                 <br/>
                 <br/>
                 <input
                        className="btn btn-primary"
                        type="submit"
                        value="Login"
                    />
                 <br/>
                 <br/>
                 {msg && <div className='d-flex justify-content-end align-items-center gap-2'>
                     <span className='fw-bold'>Create an account?</span>
                     <input
                        className="btn btn-primary"
                        type="submit"
                        value="Sign-Up"
                        onClick={handleShift}
                    />
                     </div>}
           </form>
        </div>
        </div>
    )
}

export default Login