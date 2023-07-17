import { ADD_ORDERS, GET_ORDERSDATE, SET_ORDERS, REMOVE_ORDER, SET_ORDER_EDIT_ID, EDIT_ORDER } from "../actions/orderActions"

const initialOrderState = {
    data:[],
    monthData:[],
    editId:'',
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
            return {...state, monthData:action.payload}
        }
        case REMOVE_ORDER : {
            return {...state, data:state.data.filter((ele)=>ele._id !== action.payload)}
        }
        case SET_ORDER_EDIT_ID : {
            return {...state, editId:action.payload}
        }
        case EDIT_ORDER : {
            return {...state, data:state.data.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        default:{
            return {...state}
        }
    }
}