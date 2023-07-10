import axios from "../config/axios"

export const SET_STAFF = "SET_STAFF"

const setStaff = (staff) =>{
    return {
        type:SET_STAFF,
        payload:staff
    }
} 

export const startGetStaff = () =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.get('/api/users',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setStaff(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}