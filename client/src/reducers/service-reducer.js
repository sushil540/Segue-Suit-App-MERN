import { SET_SERVICES } from "../actions/serviceAction"

const initialServiceState = {
    data:[]
}

export const ServiceREducer = (state = initialServiceState, action) =>{
    switch(action.type){
        case SET_SERVICES : {
            return {...state, data:action.payload}
        }
        default:{
            return {...state}
        }
    }
}

