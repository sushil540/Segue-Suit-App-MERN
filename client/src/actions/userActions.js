import axios from "../config/axios"

export const LOGIN_ERRORS = 'LOGIN_ERRORS'

export const startRegisterUser = (formData)=>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/users/register',formData)
                console.log('response',response.data)
                if(response.data.hasOwnProperty('errors')){
                        // response.data.errors.message
                    // dispatch()
                }
            }catch(e){
                alert(e)
            }
        })()
    }
}



export const setErrors=(user)=>{
    console.log('user',user)
    return{
         type:LOGIN_ERRORS,
         payload:user
    }
}
export const startLoginUser = (formData) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/users/login',formData)
                console.log(response)
                if(!response.data?.error){
                    localStorage.setItem('token',response.data.token)
                }else{
                    console.log('check',response.data.error)
                    dispatch(setErrors(response.data.error))
                }
            }catch(e){
              alert(e)
            }
        })()
    }
}