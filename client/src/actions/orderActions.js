import { toast } from "react-hot-toast"
import axios from "../config/axios"
export const SET_ORDERS = "SET_ORDERS"
export const ADD_ORDERS = "ADD_ORDERS"
export const GET_ORDERSDATE = "GET_ORDERSDATE"
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