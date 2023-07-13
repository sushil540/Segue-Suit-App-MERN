import axios from "../config/axios"
import { toast } from 'react-hot-toast'

export const SET_ENQUIRY = "SET_ENQUIRY"
export const GET_ENQUIRY = "GET_ENQUIRY"
export const REMOVE_ENQUIRY = "REMOVE_ENQUIRY"
export const SET_ENQUIRY_EDITID = "SET_ENQUIRY_EDITID"
export const UPDATE_ENQUIRY="UPDATE-ENQUIRY"

export const setEnquiry = (user) =>{
    return{
        type : SET_ENQUIRY,
        payload : user
    }
}

export const getEnquiry =(enquiry) =>{
    return {
        type : GET_ENQUIRY,
        payload : enquiry
    }
}

export const removeEnquiry = (enquiry) =>{
    return {
        type:REMOVE_ENQUIRY,
        payload:enquiry
    }
}

export const setEnquiryEditId = (id) =>{
    return {
        type:SET_ENQUIRY_EDITID,
        payload:id
    }
}


export const updateEnquiries = (enquiry) =>{
    return {
        type:UPDATE_ENQUIRY,
        payload:enquiry
    }
}
export const startAddEnquiry=(formData)=>{
    return(dispatch)=>{
        (async()=>{
          try{
              const response = await axios.post('/api/enquiries',formData,{headers:{"Authorization":localStorage.getItem('token')}})
              dispatch(setEnquiry(response.data))
          }catch(e){
            alert(e)
          }
        })()
    }
}

export const startGetEnquiries=()=>{
    return (dispatch)=>{
        (async()=>{ 
            try{
                const response = await axios.get('/api/enquiries',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(getEnquiry(response.data))
            } catch(e){
               alert(e)
            }
        })()
    }
}

export const startRemoveEnquiry = (id) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.delete(`/api/enquiries/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(removeEnquiry(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}

export const startSearchEnquiry = (searchText) =>{
    return (dispatch) =>{
        (async()=>{
            try{
                const response = await axios.get(`/api/enquiries/search?search=${searchText}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(getEnquiry(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}

export const setEnquiriesEdit= (enquiry) =>{
    return (dispatch, getState) =>{
        (async () =>{
            try{    
                const editId = getState().enquiry.editId
                const response = await axios.put(`/api/enquiries/${editId}`,enquiry,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(updateEnquiries(response.data))
                toast.success("Successfully Edited")
            }catch(e){
                alert(e)
            }
        })()    
    }
}