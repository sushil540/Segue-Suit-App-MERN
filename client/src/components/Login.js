import React,{useState,useEffect} from 'react'
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

    
    const msg=useSelector((state)=>{
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
         dispatch(startLoginUser(formData))
        }   
    }

    const handleShift = () =>{      
        props.history.push('/register')

        setTimeout(()=>{
            dispatch(setErrors(''))
        },4000)
    }
    
   
    return (
        <div>
            <div>
               {msg && <span>{msg}</span>} 
            </div>
        <div>
           <h1>Please Login to access DashBoard!!!</h1>
           
           <form onSubmit={handleSubmit}>
                 <Label text="Email"/> <br/>
                 <input type="email" value={email} placeholder="enter your email" onChange={(e)=>setEmail(e.target.value)}/>
                 {formErrors?.email && <span>{formErrors?.email}</span>}
                 <br/>

                 <Label text="Password"/> <br/>
                 <input type = "password" value = {password} placeholder = "enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                 {formErrors?.password && <span>{formErrors?.password}</span>}
                 <br/>
                 <br/>
                 <button>Submit</button>
                 <br/>
                 <br/>
                 {msg && <div>
                     <span>Sign Up</span>
                     <button onClick={handleShift}>Register</button>
                     </div>}
           </form>
        </div>
        </div>
    )
}

export default Login