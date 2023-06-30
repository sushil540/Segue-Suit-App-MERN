import { SET_ERRORS } from "../actions/userActions"

const initialUserState = {
    data:[],
    error:''
    
}

export const userReducer = (state = initialUserState, action)=>{
    switch(action.type){

        case SET_ERRORS :{
            return {...state,error:action.payload}
        }
        default:{
            return state
        }
    }
}

