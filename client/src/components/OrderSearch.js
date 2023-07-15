import React from 'react'
import SearchComponent from './SearchComponent'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../actions/userActions'
import { startGetOrders, startSearchOrders } from '../actions/orderActions'

const OrderSearch = (props) =>{

    const dispatch = useDispatch()

    const search = useSelector((state)=>{
        return state.user.search
    })

    const handleSearch = (data) =>{
        dispatch(setSearch(data))
        if(data){
            dispatch(startSearchOrders(data))   
        }else{
            dispatch(startGetOrders())
        }
    }


    return (
        <div>
            <SearchComponent 
                search={search}
                text="Search By Title"
                handleSearch={handleSearch}
            />
        </div>
    )
}

export default OrderSearch