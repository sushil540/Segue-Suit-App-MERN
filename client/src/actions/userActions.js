import axios from "../config/axios"
export const SET_ERRORS = "LOGIN_ERRORS"
export const SET_USER = "SET_USER"
export const SET_SEARCH = "SET_SEARCH"
export const SET_ENQUIRY = "SET_ENQUIRY"

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
                    props.history.push('/login')
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
                }else{
                    dispatch(setErrors(response.data.error))
                }
            }catch(e){
              alert(e)
            }
        })()
    }
}

export const setSearch = (search) =>{
    return {
        type: SET_SEARCH,
        payload:search

export const setEnquiry = (user) =>{
    return{
        type : SET_ENQUIRY,
        payload : user
    }
}


export const startAddEnquiry=(formData)=>{
    return(dispatch)=>{
        (async()=>{
          try{
              const response = await axios.post('/api/enquiries',formData,{headers:{"Authorization":localStorage.getItem('token')}})
              console.log('response',response.data)
              dispatch(setEnquiry(response.data))
          }catch(e){
            alert(e)
          }
        })()
    }
}