import axios from "../config/axios"

export const startRegisterUser = (formData)=>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/users/register',formData)
                console.log('response',response.data)
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
            if(!response.data?.errors){
                localStorage.setItem('token',response.data.token)
               
            }
            }catch(e){
              alert(e)
            }
        })()
    }
}