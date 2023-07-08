import { SET_ENQUIRY } from "../actions/userActions"

const initialEnquiryState={
    data:[]
}

export const enquiryReducer = (state = initialEnquiryState,action)=>{
   switch(action.type){

    case SET_ENQUIRY : {
        return {...state,data:action.payload}
    }
    default :{
        return  {...state}
    }
   }
}