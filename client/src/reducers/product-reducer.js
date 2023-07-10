import { SET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT,  SET_PRODUCT_EDITID } from '../actions/productActions'

const initialProductstate = {
    data:[],
    erros:'',
    editId:''
}

export const productReducer = (state = initialProductstate, action) =>{
    switch(action.type){
        case SET_PRODUCTS : {
            return {...state, data:action.payload}
        }   
        case ADD_PRODUCT : {
            return {...state, data:[action.payload, ...state.data]}
        }
        case REMOVE_PRODUCT : {
            return {...state, data:state.data.filter((ele)=>ele._id !== action.payload._id)}
        }
        case UPDATE_PRODUCT : {
            return {...state, data:state.data.map((ele)=>{
                if(ele._id === action.payload._id){
                    return {...ele, ...action.payload}
                }else{
                    return {...ele}
                }
            })}
        }
        case SET_PRODUCT_EDITID : {
            return {...state, editId:action.payload}
        }

        default:{
            return {...state}
        }
    }
}