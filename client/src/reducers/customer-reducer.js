import { SET_CUSTOMER, SET_ERRORS, EDIT_CUSTMERS, SET_CUSTOMER_EDITID, ADD_CUSTOMER , REMOVE_CUSTOMER, SET_MAKE_CUSTOMER} from "../actions/customerActions"

const initialCustomerState = {
    data:[],
    errors:'',
    editId:'',
    makeCustomer:''
}

export const customerReducer = (state = initialCustomerState, action) =>{
    switch(action.type){
        case SET_CUSTOMER : {
            return {...state, data: action.payload}
        }
        case ADD_CUSTOMER : {
            return {...state, data:[action.payload, ...state.data]}
        }
        case SET_ERRORS : {
            return {...state, errors:action.payload}
        }
        case SET_CUSTOMER_EDITID : {
            return {...state, editId:action.payload}
        }
        case EDIT_CUSTMERS : {
            return {...state, data:state.data.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        case REMOVE_CUSTOMER : {
            return {...state, data:state.data.filter((ele)=>ele._id !== action.payload._id)}
        }   
        case SET_MAKE_CUSTOMER : {
            return {...state, makeCustomer:action.payload}
        }
        default:{
            return {...state}
        }
    }
}