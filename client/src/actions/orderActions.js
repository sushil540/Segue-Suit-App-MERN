import { toast } from "react-hot-toast"
import axios from "../config/axios"
export const SET_ORDERS = "SET_ORDERS"
export const ADD_ORDERS = "ADD_ORDERS"
export const GET_ORDERSDATE = "GET_ORDERSDATE"
export const REMOVE_ORDER = "REMOVE_ORDER"
export const SET_ORDER_EDIT_ID = "SET_ORDER_EDIT_ID"
export const EDIT_ORDER = "EDIT_ORDER"

export const addOrders =(order) =>{
    return {
        type:ADD_ORDERS,
        payload:order
    }
}

export const setOrdersDate=(orders)=>{
   return {
    type: GET_ORDERSDATE,
    payload: orders
   }
}

export const startAddOrder = (formData) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.post('/api/orders',formData,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(addOrders(response.data))
                toast.success('Order Added Successfully')
            }catch(e){
                alert(e)
            }
        })()
    }
}

const setOrders = (orders)=>{
    return {
        type:SET_ORDERS,
        payload:orders
    }
}

export const startGetOrders = () =>{
    return (dispatch) =>{
        (async ()=>{
           try{
               const response = await axios.get('/api/orders',{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setOrders(response.data))
            }catch(e){   
                alert(e)
            } 
        })()
    }
}

export const startGetOrderDates = () =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                 const response = await axios.get('/api/ordersDate',{headers:{"Authorization":localStorage.getItem('token')}})
                 dispatch(setOrdersDate(response.data))
            }catch(e){
                  alert(e)
            }
        })()
    }
}

export const startSearchOrders = (search) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.get(`/api/orders/search?search=${search}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(setOrders(response.data))
            }catch(e){
                alert(e)
            }
        })()
    }
}

const removeOrder = (id) =>{
    return {
        type:REMOVE_ORDER,
        payload:id
    }
}

export const startRemoveOrder = (id) =>{
    return (dispatch) =>{
        (async ()=>{
           try{
                const response = await axios.delete(`/api/orders/${id}`,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(removeOrder(response.data._id))
                toast.success("Order Removed Successfully")
            }catch(e){
                alert(e)
           } 
        })()
    }
}

export const setOrderEditId = (id) =>{
    return {
        type:SET_ORDER_EDIT_ID,
        payload:id
    }
}

const editOrder = (order) =>{
    return {
        type:EDIT_ORDER,
        payload:order
    }
}

export const startEditOrder = (order) =>{
    return (dispatch, getState) =>{
        (async ()=>{
            try{
                const orderId = getState().order.id
                const response = await axios.put(`/api/orders/${orderId}`,order,{headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(editOrder(response.data))
                toast.success('Order Edited Successfully.',{
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
            }catch(e){
                alert(e)
            }
        })()
    }
}

export const startUpdateStatus = (actionText, statusText) =>{
    return (dispatch) =>{
        (async ()=>{
            try{
                const response = await axios.put("/api/orders/status/")
            }catch(e){
                console.log(e)
            }
        })()
    }
}