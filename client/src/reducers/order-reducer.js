import { ADD_ORDERS, GET_ORDERSDATE, SET_ORDERS } from "../actions/orderActions"

const initialOrderState = {
    data:[],
    monthData:[]
}

export const orderReducer = (state = initialOrderState, action) =>{
    switch(action.type){
        case ADD_ORDERS : {
            return {...state, data:[action.payload, ...state.data]}
        }
        case SET_ORDERS : {
            return {...state, data:action.payload}
        }
        case GET_ORDERSDATE : {
            return {...state,monthData:action.payload}
        }
        default:{
            return {...state}
        }
    }
}