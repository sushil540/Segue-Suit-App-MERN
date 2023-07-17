import axios from "../config/axios"

export const SET_STAFF = "SET_STAFF"
export const REMOVE_STAFF = "REMOVE_STAFF"

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

export const removeStaff = (staff) =>{
    return {
        type:REMOVE_STAFF,
        payload:staff
    }
}

export const startRemoveStaff = (id) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.delete(`/api/users/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(removeStaff(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}