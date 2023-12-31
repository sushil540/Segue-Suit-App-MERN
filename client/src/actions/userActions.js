import { toast } from "react-hot-toast"
import axios from "../config/axios"
export const SET_ERRORS = "LOGIN_ERRORS"
export const SET_USER = "SET_USER"
export const SET_SEARCH = "SET_SEARCH"
export const SET_MODAL = "SET_MODAL"

export const setModal = (modal) =>{
    return {
        type:SET_MODAL,
        payload:modal
    }
}

export const setErrors=(user)=>{
    return{
        type:SET_ERRORS,
        payload:user
    }
}

export const setLoggedInUser = (user)=>{
    return  {
        type:SET_USER,
        payload:user
    }
}

export const setSearch = (search) =>{
    return {
        type: SET_SEARCH,
        payload:search
    }
}
export const startGetLoggedInUser = () =>{
    return (dispatch)=>{
        (async ()=>{
            try{
                const response = await axios.get('/api/users/account',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setLoggedInUser(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}

export const startRegisterUser = (formData, props)=>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/users/register',formData)
                console.log('response',response.data)
                if(response.data.hasOwnProperty('errors')){
                    dispatch(setErrors(response.data.errors.email.message.split(". ")[0]))
                }else{
                    props.history.push('/')
                    toast.success("Registered Successfully")
                }
            }catch(e){
                alert(e)
            }
        })()
    }
}

export const startLoginUser = (formData,props) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/users/login',formData)
                console.log(response)
                if(!response.data?.error){
                    localStorage.setItem('token',response.data.token)   
                    console.log('token',response.data.token)
                    props.history.push('/dashboard')
                    dispatch(startGetLoggedInUser())
                    toast.success("Successfully LoggedIn")
                }else{
                    dispatch(setErrors(response.data.error))
                }
            }catch(e){
              alert(e)
            }
        })()
    }
}



