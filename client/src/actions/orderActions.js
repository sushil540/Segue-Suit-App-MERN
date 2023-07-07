import axios from "../config/axios"


export const startAddOrder = (formData) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/orders',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                console.log("orders",response.data)
            }catch(e){
                alert(e)
            }
        })()
    }
}