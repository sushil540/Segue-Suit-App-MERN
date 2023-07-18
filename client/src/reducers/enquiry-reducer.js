import { SET_ENQUIRY, SET_ENQUIRY_EDITID, UPDATE_ENQUIRY } from "../actions/enquiryAction"
import { GET_ENQUIRY } from "../actions/enquiryAction"
import { REMOVE_ENQUIRY } from "../actions/enquiryAction"
const initialEnquiryState={
    data:[],
    editId:''
}

export const enquiryReducer = (state = initialEnquiryState,action)=>{
   switch(action.type){

    case SET_ENQUIRY : {
        return {...state,data:[...state.data,action.payload]}
    }
    case GET_ENQUIRY : {
        return {...state,data:action.payload}
    }

    case REMOVE_ENQUIRY :{
        return {...state,data:state.data.filter((ele)=> ele._id !== action.payload)}
    }

    case UPDATE_ENQUIRY : {
        return {...state, data:state.data.map((ele)=>{
            if(ele._id === action.payload._id){
                return {...ele, ...action.payload}
            }else{
                return {...ele}
            }
        })}
    }
    case SET_ENQUIRY_EDITID : {
        return {...state, editId:action.payload}
    }
    
    default :{
        return  {...state}
    }
   }
}