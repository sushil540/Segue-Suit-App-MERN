import React from 'react'
import { useSelector } from 'react-redux'
import CustomerList from './CustomerList'
import AddCustomer from './AddCustomer'
import CustomerSearch from './CustomerSearch'

const CustomerContainer = (props) =>{

    const editId = useSelector((state)=>{
        return state.customer.editId
    })

    const customStyle = {
        filter:"blur(5px)"
    }

    return (
        <div className="row" style={editId ? customStyle : {}}>
            <div className="col-md-4 border-end border-5">
                <CustomerSearch />
                <hr/>
                <AddCustomer/> 
            </div>
            <div className="col-md-8">
                <CustomerList/>
            </div>
        </div>
    )
}

export default CustomerContainer