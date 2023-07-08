import { SET_CUSTOMER, SET_ERRORS } from "../actions/customerActions"

const initialCustomerState = {
    data:[],
    errors:''
}

export const customerReducer = (state = initialCustomerState, action) =>{
    switch(action.type){
        case SET_CUSTOMER : {
            return {...state, data: action.payload}
        }
        case SET_ERRORS : {
            return {...state, errors:action.payload}
        }
        default:{
            return {...state}
        }
    }
}