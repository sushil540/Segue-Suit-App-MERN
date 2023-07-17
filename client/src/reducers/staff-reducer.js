import { SET_STAFF, REMOVE_STAFF } from "../actions/staffActions"

const initialStaffReducer = {
    data:[]
}

export const staffReducer = (state = initialStaffReducer, action) =>{
    switch(action.type){
        case SET_STAFF: {
            return {...state, data:action.payload}
        }
        case REMOVE_STAFF : {
            return {...state, data:state.data.filter((ele)=>ele._id !== action.payload._id)}
        }
        default:{
            return {...state}
        }
    }
}