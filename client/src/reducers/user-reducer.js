import { SET_ERRORS, SET_USER } from "../actions/userActions"

const initialUserState = {
    data:{},
    error:''
}

export const userReducer = (state = initialUserState, action)=>{
    switch(action.type){
        case SET_USER :{
            return {...state, data:action.payload}
        }
        case SET_ERRORS :{
            return {...state, error:action.payload}
        }
        default:{
            return state
        }
    }
}

