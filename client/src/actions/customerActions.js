import { toast } from "react-hot-toast"
import axios from "../config/axios"
export const SET_CUSTOMER = "SET_CUSTOMER"
export const ADD_CUSTOMER = "ADD_CUSTOMER"
export const SET_ERRORS = "SET_ERRORS"
export const EDIT_CUSTMERS = "EDIT_CUSTMERS"
export const SET_ID = "SET_ID"
// export const SET_CUSTOMER_EDITID = "SET_CUSTOMER_EDITID"
export const REMOVE_CUSTOMER = "REMOVE_CUSTOMER"
// export const SET_MAKE_CUSTOMER = "SET_MAKE_CUSTOMER"

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
                    toast.success('Customer Added Successfully')
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
                const response = await axios.get('/api/customers', {headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setCustomer(response.data))
            }catch(e){  
                alert(e)
            }
        })()
    }
}

//setCustomerEditId
export const setId = (id) =>{
    return {
        //SET_CUSTOMER_EDITID
        type:SET_ID,
        payload:id
    }
} 
export const editCustomers = (customer) =>{
    return {
        type:EDIT_CUSTMERS,
        payload:customer
    }
}
export const startEditCustomer = (formData) =>{
    return (dispatch, getState) =>{
        (async ()=>{
            try{
                const id = getState().customer.editId
                const response = await axios.put(`/api/customers/${id}`, formData, {headers:{"Authorization":localStorage.getItem('token')}})
                if(!response.data.hasOwnProperty('errors')){
                    dispatch(editCustomers(response.data))
                    toast.success('Customer Edited Successfully.',{
                        style: {
                          border: '1px solid #1D5B79',
                          padding: '16px',
                          color: '#4D455D',
                        },
                        iconTheme: {
                          primary: '#1D5B79',
                          secondary: '#FFFAEE',
                        },
                      })
                }else{
                    toast.error(response.data.errors.mobile.message)
                }
            }catch(e){
                alert(e)
            }
        })()
    }
}

const removeCustomer = (id) =>{
    return {
        type:REMOVE_CUSTOMER,
        payload:id
    }
}

export const startRemoveCustomer = (id) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.delete(`/api/customers/${id}`, {headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(removeCustomer(response.data))
                toast.success('Customer Removed Successfully.',{
                    style: {
                      border: '1px solid #713200',
                      padding: '16px',
                      color: '#713200',
                    },
                    iconTheme: {
                      primary: '#EF6262',
                      secondary: '#FFFAEE',
                    },
                  })
            }catch(e){
                console.log(e)
            }   
        })()
    }
}

export const startCustomerSearch = (search) =>{
    return (dispatch) =>{
        (async () =>{
            try{
                const response = await axios.get(`/api/customers/search?search=${search}`, {headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setCustomer(response.data))
            }catch(e){
                console.log(e)
            }
        })()
    }
}

// export const setMakeCustomer = (id) =>{
//     return {
//         type:SET_MAKE_CUSTOMER,
//         payload:id
//     }
// }

// export const setCustomerId = (id) =>{
//     return {
//         type:SET_CUSTOMER_ID,
//         payload:id
//     }
// }