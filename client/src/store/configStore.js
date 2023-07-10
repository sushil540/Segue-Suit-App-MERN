import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { userReducer } from "../reducers/user-reducer"
import { productReducer } from "../reducers/product-reducer"
import { customerReducer } from "../reducers/customer-reducer"
import { staffReducer } from "../reducers/staff-reducer"

const configStore = () =>{
    const store = createStore(combineReducers({
        user:userReducer,
        customer:customerReducer,
        product:productReducer,
        staff:staffReducer
    }),applyMiddleware(thunk))
    return store
}

export default configStore