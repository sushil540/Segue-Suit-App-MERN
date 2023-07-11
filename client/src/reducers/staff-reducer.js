import { SET_STAFF } from "../actions/staffActions"

const initialStaffReducer = {
    data:[]
}

export const staffReducer = (state = initialStaffReducer, action) =>{
    switch(action.type){
        case SET_STAFF:{
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}