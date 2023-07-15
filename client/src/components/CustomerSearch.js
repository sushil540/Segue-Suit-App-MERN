import React from 'react'
import { setSearch } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { startCustomerSearch, startGetCustomers } from '../actions/customerActions'
import SearchComponent from './SearchComponent'

const CustomerSearch = (props) =>{

    const dispatch = useDispatch()

    const search = useSelector((state)=>{
        return state.user.search
    })

    const handleSearch = (data) =>{
        dispatch(setSearch(data))
        if(data){
            dispatch(startCustomerSearch(data))   
        }else{
            dispatch(startGetCustomers())
        }
    }

    return (
        <div>
            <SearchComponent 
                search={search}
                text="Search by name and mobile" 
                handleSearch={handleSearch}/>
        </div>
    )
}

export default CustomerSearch