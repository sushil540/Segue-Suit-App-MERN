import axios from "../config/axios"

export const SET_SERVICES = "SET_SERVICES"

const setServices = (services) =>{
    return {
        type:SET_SERVICES,
        payload:services
    }
}

export const startGetServices = () =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.get('/api/services',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setServices(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}