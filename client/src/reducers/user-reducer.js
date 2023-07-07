import { SET_ERRORS, SET_USER, SET_SEARCH } from "../actions/userActions"

const initialUserState = {
    data:{},
    error:'',
    search:''
}

export const userReducer = (state = initialUserState, action)=>{
    switch(action.type){
        case SET_USER :{
            return {...state, data:action.payload}
        }
        case SET_ERRORS :{
            return {...state, error:action.payload}
        }
        case SET_SEARCH:{
            return {...state, search:action.payload}
        }
        default:{
            return state
        }
    }
}

