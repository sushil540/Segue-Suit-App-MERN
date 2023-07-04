import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import { userReducer } from "../reducers/user-reducer"
import { productReducer } from "../reducers/product-reducer"

const configStore = () =>{
    const store = createStore(combineReducers({
        user:userReducer,
        product:productReducer
    }),applyMiddleware(thunk))
    return store
}

export default configStore