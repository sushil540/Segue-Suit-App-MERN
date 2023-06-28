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