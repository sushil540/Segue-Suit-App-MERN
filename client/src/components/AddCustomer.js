import React from 'react'
import CustomerForm from './CustomerForm'
import { useDispatch, useSelector } from 'react-redux'
import { startAddCustomer } from '../actions/customerActions'
import { startRemoveEnquiry } from '../actions/enquiryAction'

const AddCustomer = (props) =>{

    const makeCustomer = useSelector((state)=>{
        return state.customer.makeCustomer
    })

    const dispatch = useDispatch()

    const formSubmission = (formData) =>{
        dispatch(startAddCustomer(formData))      
        makeCustomer && dispatch(startRemoveEnquiry(makeCustomer))
    }
    
    return (
        <div>
            <h2 className="text-center">Add Customer</h2>
            <CustomerForm formSubmission={formSubmission}/>
        </div>
    )
}

export default AddCustomer