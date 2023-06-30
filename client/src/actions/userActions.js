import axios from "../config/axios"
export const SET_ERRORS = 'LOGIN_ERRORS'

export const setErrors=(user)=>{
    return{
         type:SET_ERRORS,
         payload:user
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

export const startLoginUser = (formData) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/users/login',formData)
                console.log(response)
                if(!response.data?.error){
                    localStorage.setItem('token',response.data.token)
                }else{
                    dispatch(setErrors(response.data.error))
                }
            }catch(e){
              alert(e)
            }
        })()
    }
}