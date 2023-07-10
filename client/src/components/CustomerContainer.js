import React from 'react'
import { useSelector } from 'react-redux'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'

const CustomerContainer = (props) =>{

    const editId = useSelector((state)=>{
        return state.product.editId
    })

    const customStyle = {
        filter:"blur(5px)"
    }

    return (
        <div className="row" style={editId ? customStyle : {}}>
            <div className="col-md-4 border-end border-5">
                <CustomerForm/>
            </div>
            <div className="col-md-8">
                <CustomerList/>
            </div>
        </div>
    )
}

export default CustomerContainer