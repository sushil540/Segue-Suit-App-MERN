import { ADD_ORDERS, SET_ORDERS } from "../actions/orderActions"

const initialOrderState = {
    data:[]
}

export const orderReducer = (state = initialOrderState, action) =>{
    switch(action.type){
        case ADD_ORDERS : {
            return {...state, data:[action.payload, ...state.data]}
        }
        case SET_ORDERS : {
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}