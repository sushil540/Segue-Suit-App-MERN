import axios from "../config/axios"
export const SET_CUSTOMER = "SET_CUSTOMER"
export const ADD_CUSTOMER = "ADD_CUSTOMER"
export const SET_ERRORS = "SET_ERRORS"

const setCustomer = (customer) =>{
    return {
        type:SET_CUSTOMER,
        payload:customer
    }
} 

const addCustomer = (customer) =>{
    return {
        type:ADD_CUSTOMER,
        payload:customer
    }
}

export const setErrors = (errors) =>{
    return {
        type:SET_ERRORS,
        payload:errors
    }
}

export const startAddCustomer = (formData) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/customers',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                if(response.data.hasOwnProperty('errors')){
                    dispatch(setErrors(response.data.errors.mobile.message.split('. ')[0]))
                }else{
                    dispatch(addCustomer(response.data))
                }
            }catch(e){
                alert(e)
            }
        })()    
    }
}

export const startGetCustomers = () =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.get('/api/customers',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setCustomer(response.data))
            }catch(e){  
                alert(e)
            }
        })()
    }
}